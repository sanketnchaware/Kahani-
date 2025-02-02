const User = require("../modals/user.model");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    return res
      .status(200)
      .send({ token: "hbhjb6546515", message: "Logged in successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
