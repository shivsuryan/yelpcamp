var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require('./models/comment');
var seedDB = require('./seed');
var port = 3000;

mongoose.connect('mongodb://localhost/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true });

seedDB();

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
    var _id = req.params.id;
    Campground.findById({ _id }).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log('Something Happened!!!');
            console.log(err);
        } else {
            res.render("show", { campground: foundCampground });
        }
    })
});

app.get("/campgrounds/:id/comments/new", function (req, res) {
    var id = req.params.id;
    res.render('newComment',{id:id});
});

app.post("/campgrounds/:id/comments/new", function (req, res) {
    var _id = req.params.id;
    var comment = req.body.comment;
    var username = req.body.username;
    console.log('id: '+_id);
    console.log('comment: '+comment);
    console.log('username: '+username);
    Campground.findById({ _id }).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create({
                text: req.body.comment,
                author: req.body.username
            }, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    foundCampground.comments.push(comment);
                    comment.save();
                    foundCampground.save();
                    console.log('Comment added to database');
                    res.redirect('/campgrounds/' + _id);
                }
            })
        }
    })
});

    app.get("*", function (req, res) {
        res.render("pageNotFound");
    });

    app.listen(port, () => {
        console.log("Server started. Listening on port " + port);
    })