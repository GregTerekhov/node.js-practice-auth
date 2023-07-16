const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Отримує токен
  // Розшифровує його
  // Передаємо Id далі
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");
    if (tokenType !== "Bearer" || !token) {
      res.status(401);
      throw new Error("Error, token is missed");
    }
    const decoded = jwt.verify(token, "pizza");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    res.json({
      code: 401,
      message: error.message,
    });
  }
};
