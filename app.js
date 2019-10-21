var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

mongoose.connect('mongodb://localhost/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true });

var campgroundSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("Error happened!!!!");
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: campgrounds });
        }
    })
});

app.post("/campgrounds", (req, res) => {
    var nameReq = req.body.name;
    var imageUrlReq = req.body.imageUrl;
    var descriptionReq = req.body.description;
    Campground.create({
        name: nameReq,
        imageUrl: imageUrlReq,
        description: descriptionReq
    }, function (err, campground) {
        if (err) {
            console.log('Something Happened!!!');
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("newCampground");
});

app.get("/campgrounds/:id", function (req, res) {
    var idUrl = req.params.id;
    Campground.findById(idUrl, function (err, foundCampground) {
        if (err) {
            console.log('Something Happened!!!');
            console.log(err);
        } else {
            res.render("show", { campground: foundCampground });
        }
    })
});

app.get("*", function (req, res) {
    res.render("pageNotFound");
});

app.listen(port, () => {
    console.log("Server started. Listening on port " + port);
})