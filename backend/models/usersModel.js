const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    name: {
      type: String,
      default: "Sandra Bullock",
    },
    email: {
      type: String,
      required: [true, "dbValidation: Email is required"],
    },
    password: {
      type: String,
      required: [true, "dbValidation: Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    roles: [
      {
        type: String,
        ref: "roles",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("users", usersSchema);
