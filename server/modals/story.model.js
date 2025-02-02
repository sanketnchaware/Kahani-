const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const storySchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },

  {
    versionKey: false,
    timestamps: true, // Combine the options into a single object
  }
);

const Story = mongoose.model("story", storySchema);

module.exports = Story;
