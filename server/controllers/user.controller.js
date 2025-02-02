const express = require("express");

const router = express.Router();

const User = require("../modals/user.model");

// generate Custom Id
async function generateCustomId() {
  const latestUser = await User.findOne().sort({ id: -1 });
  const latestId = latestUser ? latestUser.id : 0;
  return latestId + 1 || 1;
}

//  listing
router.get("/", async (req, res) => {
  try {
    const usersList = await User.find().lean().exec();

    return res.status(200).send({
      data: usersList,
      message: "Users Listing fetched",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Create
router.post("/", async (req, res) => {
  const userId = await generateCustomId();

  console.log(userId, "userId");
  try {
    // 1. method1 using data.save()
    // const data = new User({
    //   ...req.body,
    //   id: userId,
    // });
    // const savedUser = await data.save();

    //2.  method2
    const savedUser = await User.create({
      ...req.body,
      id: userId,
    });

    return res.status(200).send({
      data: savedUser,
      message: "User created successfully !",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Get By Id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }).lean().exec();
    if (user) {
      return res.status(200).send({
        data: user,
      });
    } else {
      return res.status(404).send({ message: "User Not Found !" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Uppdate
router.put("/:id", async (req, res) => {
  try {
    const existingUser = await User.findOne({ id: req.params.id })
      .lean()
      .exec();

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }
    // Prevent email update if it is the same as before
    if (req.body.email && req.body.email !== existingUser.email) {
      const emailExists = await User.findOne({ email: req.body.email })
        .lean()
        .exec();
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedUser) {
      return res
        .status(200)
        .send({ data: updatedUser, message: "User Updated Successfully" });
    } else {
      return res.status(404).json({ message: "User Not Found ! " });
    }
  } catch (error) {
    return res.status(500).send({ messeage: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const existingUser = await User.findOneAndDelete({ id: req.params.id })
      .lean()
      .exec();

    if (existingUser) {
      return res.status(200).send({ mesasge: "User deleted successfully !" });
    } else {
      return res.status(404).send({ messeage: "User not found !" });
    }
  } catch (error) {
    return res.status(500).send({ messeage: error.message });
  }
});

module.exports = router;
