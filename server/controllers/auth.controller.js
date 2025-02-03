const User = require("../modals/user.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // JWT Secret Key

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("password:", password, user.password);

    if (!user) {
      return res.status(404).send({ message: "User Not Found !" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("isMatch:", isMatch);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Email or Password !" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({ token, message: "Logged in successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
