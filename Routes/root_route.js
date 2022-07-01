const express               = require("express");
const router                = express.Router();
const ejs                   = require("ejs");
const User                  = require("../models/UserModel");
const bcrypt                = require("bcrypt");
const Article               = require("../models/ArticleModule");


router.get("", function (req, res) {

    // Getting all the from DB
    Article.find({}, function(err, articles){
        if(err) {
            console.log(err);
        } else {
            res.render("home", {
                registerMsg: "Sign up as Author & Start Publish Your Article",
                fullName: "",
                email: "",
                authDetails: req,
                articles: articles
            });
        }
    });

    

});

router.post("", function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
        } else if (user) {
            res.render("home", {
                registerMsg: "This Email Address is Already in Use",
                fullName: req.body.fullname,
                email: req.body.email,
                authDetails: req
            });
        } else {
            bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
                if (err) {
                    console.log(err);
                } else {
                    const newUser = new User({
                        fullName: req.body.fullname,
                        email: req.body.email,
                        password: hashedPassword,
                    });

                    newUser.save(function (err, savedUser) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (savedUser) {
                                // Getting all the from DB and send successfully registered
                                Article.find({}, function(err, articles){
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        res.render("home", {
                                            registerMsg: "Successfully Registered",
                                            fullName: "",
                                            email: "",
                                            authDetails: req,
                                            articles: articles
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
