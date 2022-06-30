const express   = require("express");
const ejs       = require("ejs");
const path      = require("path");
const mongoose  = require("mongoose");
const session   = require("express-session");
const passport  = require("passport");
const bodyParser = require("body-parser");
var methodOverride = require('method-override');

// creating express app
const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(session({secret: "mysecret", resave: false, saveUninitialized: true}));
app.use(methodOverride('_method'));


// Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect("mongodb://localhost:27017/fullStackBlogDB");


// Getting Routes
const rootRoute = require("./Routes/root_route");
const loginRoute = require("./Routes/login_route");
const authorRoute = require("./Routes/author_route_auth");
const singlePostRoute = require("./Routes/single_post_route");
const newArticleRoute = require("./Routes/new_article_route");
const updateArticleRoute = require("./Routes/update_article_route");
const contactRoute = require("./Routes/contact_route");

// Routes setup
app.use("/", rootRoute);
app.use("/login", loginRoute);
app.use("/admin", authorRoute);
app.use("/new-article", newArticleRoute);
app.use("/update", updateArticleRoute);
app.use("/article", singlePostRoute);
app.use("/contact", contactRoute);


// Routes ----
app.get("/about", function(req, res){res.render("about", {authDetails: req})});

app.get("/article", function(req, res){res.render("new_article", {authDetails: req})});


// User Logout Function
app.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});



// Port Configuration
app.listen(3000, function(){
    console.log("Server Started at Port 3000");
});