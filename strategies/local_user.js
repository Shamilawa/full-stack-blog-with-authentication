const User = require("../models/UserModel");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Serialize and Desirialize the user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// Passport local strategy
passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (username, password, done) {

        // checking whether user is available in the DB
        User.findOne({ username: username }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, { message: "Incorrent Username" });

            // If user found, then check the Password
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) return done(err);
                if (res === false) return done(null, false, { message: "Incorrect Password" });

                console.log(done);
                return done(null, user);
            });
        });
    }));



// function to check whether the user is logged in or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect("/course");
}

module.exports = { isLoggedIn, isLoggedOut };
