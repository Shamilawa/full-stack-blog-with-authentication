const express               = require("express");
const router                = express.Router();
const passport              = require("passport");
const localStrategy         = require("../strategies/local_user");

router.get("/", localStrategy.isLoggedOut, function(req, res) {
    
    const error = req.query.error;

    if(error) {
        res.render("login", {
            loginFormMsg: "User Name or Password Incorrect",
            authDetails: req
        });
    } else {
        res.render("login", {
            loginFormMsg: "Already have an account",
            authDetails: req
        });
    }
});

router.post("/", passport.authenticate("local", {
    successRedirect : "/admin",
    failureRedirect : "/login?error=true"
}));


module.exports = router;
