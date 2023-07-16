// Cannot GET /api/v1/drinks

const drinksRoutes = require("express").Router();
const drinksController = require("../controllers/Drinks");
const rolesMiddleware = require("../middlewares/rolesMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
// Добавити
// Отримати все
// Отримати один
// Обновити
// Видалити

drinksRoutes.post(
  "/drinks",
  (req, res, next) => {
    console.log("JOI.validation");
    next();
  },
  authMiddleware,
  drinksController.add
);
drinksRoutes.get(
  "/drinks",
  authMiddleware,
  rolesMiddleware(["MODERATOR", "ADMIN"]),
  drinksController.getAll
);
// "USER", "ADMIN", "MODERATOR", "SUPPORT", "CUSTOMER"

drinksRoutes.get("/drinks/:id", drinksController.getOne);
drinksRoutes.patch("/drinks/:id", drinksController.updateOne);
drinksRoutes.delete("/drinks/:id", drinksController.remove);

module.exports = drinksRoutes;
