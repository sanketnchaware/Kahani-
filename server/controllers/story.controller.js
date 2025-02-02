const express = require("express");
const Story = require("../modals/story.model.js");
const router = express.Router();

// Function to generate custom ID
async function generateCustomId() {
  const latestStory = await Story.findOne().sort({ id: -1 });
  const latestId = latestStory ? latestStory.id : 0;
  return latestId + 1;
}

// GET: List all stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().lean().exec();
    return res.status(200).send({ stories: stories, message: "Stories List" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while fetching stories" });
  }
});

// POST: Create a new story
router.post("/", async (req, res) => {
  try {
    const { title, tags, description } = req.body;

    // Validate input
    if (!title || !description || !tags) {
      return res.status(400).send({
        message: "All fields (title, description, tags) are required",
      });
    }

    // Generate a custom ID for the new story
    const customid = await generateCustomId();

    // Create a new story document
    const newStory = new Story({
      title: title,
      description: description,
      tags: tags,
      id: customid,
    });

    // Save the story to the database
    const savedStory = await newStory.save();

    return res.status(201).send({
      data: savedStory,
      message: "Story created successfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while creating the story" });
  }
});

// GET: Get a story by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Story.findOne({ id: req.params.id }).lean().exec();
    if (!item) {
      return res.status(404).send({ message: "Story not found" });
    }
    return res
      .status(200)
      .send({ story: item, message: "Story found successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while fetching the story" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(`Received DELETE request for story ID: ${req.params.id}`); // Log request for debugging
    const item = await Story.findOneAndDelete({ id: req.params.id })
      .lean()
      .exec();
    if (!item) {
      return res.status(404).send({ message: "Story not found" });
    }
    return res
      .status(200)
      .send({ story: item, message: "Story deleted successfully" });
  } catch (err) {
    console.error(err); // Log error for debugging
    return res.status(500).send({ message: err.message });
  }
});

// PATCH: Update a story by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    // Check if required fields are present
    if (!title || !description || !tags) {
      return res.status(400).send({
        message: "All fields (title, description, tags) are required",
      });
    }

    const item = await Story.findOneAndUpdate(
      { id: req.params.id },
      { title, description, tags },
      { new: true }
    );
    if (!item) {
      return res.status(404).send({ message: "Story not found" });
    }
    return res
      .status(200)
      .send({ story: item, message: "Story updated successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while updating the story" });
  }
});

module.exports = router;
