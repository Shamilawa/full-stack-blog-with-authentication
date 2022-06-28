const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    articleTitle: String,
    postCategory : String,
    postContent : String,
    link: String,
    description: String,
    featuredImg: String,
    author: String,
    publishedDate: String
});

module.exports = new mongoose.model("Article", ArticleSchema);