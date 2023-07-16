const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
require("colors");
const authMiddleware = require("./middlewares/authMiddleware");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const configPath = path.join(__dirname, "..", "config", ".env");
const UserModel = require("./models/usersModel");
const RoleModel = require("./models/rolesModel");
const dotenv = require("dotenv").config({
  path: configPath,
});
const connectDB = require("../config/connectDB");
const errorHandler = require("./middlewares/errorHandler");
const rolesModel = require("./models/rolesModel");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// registration - збереження користувача в БД
// authentication - перевірка даних, які ввів користувач з тими даними, які зберігаються у БД
// authorisation - перевірка прав доступа
// logout - вихід з системи зареєстрованого користувача

app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // отримуємо і валідуємо дані від користувача
    // шукаємо користувача в БД
    // якщо знайшли, виводимо помилку
    // якщо не знайшли, хешуємо пароль
    // зберігаємо до БД
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("error. provide all required fields");
    }
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      res.status(409);
      throw new Error("error. User already exists");
    }
    const roles = await RoleModel.findOne({ value: "USER" });
    const hashPassword = bcrypt.hashSync(password, 5);
    console.log(hashPassword);
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [roles.value],
    });

    res.status(201);
    res.json({
      code: 201,
      message: "ok",
      data: {
        email: user.email,
      },
    });
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // отримуємо і валідуємо дані від користувача
    // шукаємо користувача в БД
    // якщо не знайшли, або не розшифрували пароль, треба помилка Invalid login or password
    // якщо знайшли, розшифровуємо пароль
    // якщо все добре, генеруємо токен
    // зберігаємо токен у БД
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("error. provide all required fields");
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("error. Invalid login or password");
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      res.status(401);
      throw new Error("error. Invalid login or password");
    }
    const token = generateToken({
      id: user._id,
      roles: user.roles,
    });
    user.token = token;
    await user.save();

    res.status(200);
    res.json({
      code: 200,
      message: "ok",
      data: {
        email: user.email,
        token: user.token,
      },
    });
  })
);

app.get(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    user.token = null;
    await user.save();

    res.status(200);
    res.json({
      code: 200,
      message: "Logout success",
    });
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "pizza", {
    expiresIn: "8h",
  });
}

app.use("/api/v1", require("./routes/drinksRoutes"));

app.use(errorHandler);

connectDB();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold.italic);
});
