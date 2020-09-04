var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds_db){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:campgrounds_db});
        }
    })
});

//CREATE - add new campgrounds
router.post("/",middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    }
    var newCamp = {name : name ,price:price, image: image, description:description, author: author};
    Campground.create(newCamp, function(err, newlyCamp){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW - display form to add new campgrounds
router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shpw
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        //console.log(foundCampground);
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{Camp:foundCampground});
        }
    })
});

//EDIT
router.get("/:id/edit",middleware.checkCampOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground});
    });
});

//UPDATE
router.put("/:id",middleware.checkCampOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground ,function(err, updatedCampground){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Campground updated Successfully.");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DELETE
router.delete("/:id",middleware.checkCampOwnership, function(req,res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground removed Successfully.");
            res.redirect("/campgrounds");
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;