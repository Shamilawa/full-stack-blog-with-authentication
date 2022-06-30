const express = require("express");
const router = express.Router();
const Article = require("../models/ArticleModule");
const LocalStrategy = require("../strategies/local_user");
const multer    = require("multer");
const { route } = require("./author_route_auth");

// Setting up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/featuredimg')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage })

router.get("/", LocalStrategy.isLoggedIn, function(req, res){
    res.render("new_article", {
        authDetails : req,
        formRoute: "/new-article",
        title: "",
        category: "",
        content:"",
        link: "",
        description: "",
        featuredImg: ""
    });
});

router.post("/", upload.single("featuredimg"), function(req, res){

    // Getting cureent date and formating it
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate = year + "/" + month + "/" + day;

    // Getting Image Url
    const imgUrl = "featuredimg/" + req.file.filename;

    // formating the link (adding hypens)
    let link = req.body.link;
    let lowerCaseLink = link.trim().replace(/\s+/g, '-').toLowerCase();

    const newArticle = new Article ({
        articleTitle: req.body.articleTitle,
        postCategory : req.body.category,
        postContent : req.body.postcontent,
        link: lowerCaseLink,
        description: req.body.description,
        featuredImg: imgUrl,
        author: req.user.fullName,
        publishedDate: newDate
    });

    newArticle.save(function(err,savedArticle){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/admin");
        }
    });

    
});

// Delete Article
router.delete('/delete/:articleId', async (req, res) => {
    try {
        const id = req.params.articleId;
        const data = await Article.findByIdAndDelete(id)
        res.redirect("/admin");
    }
    catch (error) {
        console.log(error);
    }
});






module.exports = router;