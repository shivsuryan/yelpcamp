var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

mongoose.connect('mongodb://localhost/yelpcamp');

var campgroundSchema = mongoose.Schema({
    name: String,
    imageUrl: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log("Error happened!!!!");
            console.log(err);
        }else{
            res.render("campgrounds", { campgrounds: campgrounds });
        }
    })
});

app.post("/campgrounds", (req, res) => {
    var campName = req.body.campname;
    var campUrl = req.body.campurl;
    campgrounds.push({ name: campName, image: campUrl });
    res.redirect('/campgrounds');
    //res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function (req, res) {
    res.render("newCampground");
});

app.get("*", function (req, res) {
    res.render("pageNotFound");
});

app.listen(port, () => {
    console.log("Server started. Listening on port " + port);
})