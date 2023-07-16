const { Schema, model } = require("mongoose");

const drinksSchema = new Schema({
  title: {
    type: String,
    required: [true, "dbValidation: Title is required"],
  },
  price: {
    type: Number,
    required: [true, "dbValidation: Price is required"],
  },
  adult: {
    type: Boolean,
    default: false,
  },
  volume: {
    type: Number,
    default: 0.75,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("drinks", drinksSchema);
