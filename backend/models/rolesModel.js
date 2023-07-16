const { Schema, model } = require("mongoose");

const rolesSchema = new Schema(
  {
    value: {
      type: String,
      default: "USER",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("roles", rolesSchema);
