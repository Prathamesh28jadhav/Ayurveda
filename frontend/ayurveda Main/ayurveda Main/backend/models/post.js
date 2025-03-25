const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    likes: { type: Number, default: 0 },
    comments: [
        {
            username: String,
            text: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
