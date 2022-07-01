const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");

router.get("/", function (req, res) {
    res.render("contact", { authDetails: req })
});


router.post("/", function (req, res) {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "shamilahasarangadev@gmail.com",
            pass: 'tljrsjayzybcpsbk'
        }
    });

    const mailOption = {
        from: req.body.email,
        to: "shamilahasarangadev@gmail.com",
        subject: "Message From " + req.body.fullname + " Email - " + req.body.email,
        text: req.body.message
    }

    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Mail Sent Successful " + info.response);
            res.redirect("/contact");
        }
    });
});


module.exports = router;