// Cannot GET /api/v1/drinks

const drinksRoutes = require("express").Router();
const drinksController = require("../controllers/Drinks");

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
  drinksController.add
);
drinksRoutes.get("/drinks", drinksController.getAll);
drinksRoutes.get("/drinks/:id", drinksController.getOne);
drinksRoutes.patch("/drinks/:id", drinksController.updateOne);
drinksRoutes.delete("/drinks/:id", drinksController.remove);

module.exports = drinksRoutes;
