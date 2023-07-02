const drinksModel = require("../models/drinksModel");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");

class Drinks {
  add = asyncHandler(async (req, res) => {
    const { title, price } = req.body;

    if (!title || !price) {
      res.status(401);
      throw new Error("error. provide all required fields");
    }
    const drink = await drinksModel.create({ ...req.body });
    res.status(201);
    res.json({
      code: 201,
      message: "ok",
      data: drink,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const result = await drinksModel.find({});
    res.status(200);
    res.json({
      code: 200,
      message: "ok",
      data: result,
      qty: result.length,
    });
  });

  getOne = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }
    const result = await drinksModel.findById(id);

    if (!result) {
      res.status(404);
      throw new Error("ID not found");
    }

    res.status(200);
    res.json({
      code: 200,
      message: "ok",
      data: result,
    });
  });

  updateOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const result = await drinksModel.findByIdAndUpdate(
      id,
      {
        title,
      },
      { new: true }
    );

    res.status(200);
    res.json({
      code: 200,
      message: "ok",
      data: result,
    });
  });

  remove = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await drinksModel.findByIdAndDelete(id);

    res.status(200);
    res.json({
      code: 200,
      message: "ok",
      data: result,
    });
  });
}

module.exports = new Drinks();
