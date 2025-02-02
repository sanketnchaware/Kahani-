const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number },

    // payload:
    firstname: {
      type: String,
      required: true,
    },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
