const express               = require("express");
const router                = express.Router();
const localStrategy         = require("../strategies/local_user");


router.get("/", localStrategy.isLoggedIn, function(req, res) {
    res.render("admin", {
        authDetails: req
    });
});



module.exports = router;
