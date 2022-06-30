const express               = require("express");
const router                = express.Router();
const localStrategy         = require("../strategies/local_user");
const Article               = require("../models/ArticleModule");


router.get("/", localStrategy.isLoggedIn, function(req, res) {

    console.log(req.user);

    Article.find({}, function(err, articles){
        if(err) {
            console.log(err);
        } else if(articles) {
            res.render("admin", {
                authDetails: req,
                articles: articles
            });
        }
    });


});



module.exports = router;
