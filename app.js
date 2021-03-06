var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seed");

//Requiring Routes
var indexRoutes = require("./routes/index"),
    commentsRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

mongoose.connect('mongodb://localhost:27017/yelp_camp_7', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"Tony Stark is Iron Man",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

//Order Matters
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);


app.listen(3000, function(){
    console.log("server started at http://localhost:3000");
});