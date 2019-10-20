var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var port = 3000;

var campgrounds = [
    // {name:"Camp01",image:"https://images.unsplash.com/photo-1453787817889-57ec065fa4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
    // {name:"Camp02",image:"https://images.unsplash.com/photo-1534531409543-069f6204c5b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    // {name:"Camp03",image:"https://images.unsplash.com/photo-1416138182074-93cf510477b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
    {name:"Camp01",image:"https://images.unsplash.com/photo-1439524970634-649c37a69e5c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1450&h=825&fit=crop&s=bfda9916c885869b43b70738693428d9"},
    {name:"Camp02",image:"https://images.unsplash.com/photo-1444090542259-0af8fa96557e?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450"},
    {name:"Camp03",image:"https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450"}

];

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res) => {
    res.render("landing");
});

app.get("/campgrounds",(req,res) => {
    var newLocal = campgrounds;
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds",(req,res) => {
    var campName = req.body.campname;
    var campUrl = req.body.campurl;
    campgrounds.push({name:campName,image:campUrl});
    res.redirect('/campgrounds');
    //res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req,res){
    res.render("newCampground");
});

app.get("*", function(req,res){
    res.render("pageNotFound");
});

app.listen(port, () => {
    console.log("Server started. Listening on port "+port);
})