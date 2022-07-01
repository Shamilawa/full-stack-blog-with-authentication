const express = require("express");
const router = express.Router();
const Article = require("../models/ArticleModule");
const LocalStrategy = require("../strategies/local_user");
const multer    = require("multer");
const { route } = require("./author_route_auth");


// Fill the form with edit article
router.get("/:articleId", function(req, res){   

    Article.findById(req.params.articleId, function(err, foundArticle){
        if(err) {
            console.log(err);
        } else if(foundArticle) {

            res.render("update_article", {
                authDetails : req,
                id: foundArticle.id,
                title: foundArticle.articleTitle,
                category: foundArticle.postCategory,
                content:foundArticle.postContent,
                link: foundArticle.link,
                description: foundArticle.description
            });
        }
    });
    

});

// Post Request to update the article
router.patch("/:articleId", async function(req, res){
    
    // formating the link (adding hypens)
    let link = req.body.link;
    let lowerCaseLink = link.trim().replace(/\s+/g, '-').toLowerCase();

    try {
        const id = req.params.articleId;
        // const updatedData = req.body;
        const options = { new: true };

        const result = await Article.findByIdAndUpdate(
            id, 
            {
                articleTitle: req.body.articleTitle,
                postCategory : req.body.category,
                postContent : req.body.postcontent,
                link: lowerCaseLink,    
                description: req.body.description
            },
            options
        )
        
        res.redirect("/admin");
    }

    catch (error) {
        console.log(error);
    }
    

});


module.exports = router;