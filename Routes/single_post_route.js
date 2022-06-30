const express       = require("express");
const router        = express.Router();
const Article       = require("../models/ArticleModule");

router.get("/:articleLink", function(req, res){

    Article.findOne({link: req.params.articleLink}, function(err, foundArticle){
        if(err) {
            console.log(err);
        } else if(foundArticle){
            res.render("single_post",{
                featuredImg: foundArticle.featuredImg,
                postTitle:foundArticle.articleTitle,
                author: foundArticle.author,
                date: foundArticle.publishedDate,
                postContent: foundArticle.postContent,
                authDetails: req
            })
        }
    });
});



module.exports = router;