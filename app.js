var express = require('express');
var request = require('request');
var port = 3000;

var app = express();
app.set("view engine", "ejs");


app.get("/",(req,res) => {
    res.render("landing");
});

app.get("/campgrounds",(req,res) => {
    var campgrounds = [
        {name:"Camp01",image:"https://images.unsplash.com/photo-1453787817889-57ec065fa4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
        {name:"Camp02",image:"https://images.unsplash.com/photo-1534531409543-069f6204c5b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {name:"Camp03",image:"https://images.unsplash.com/photo-1416138182074-93cf510477b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
    ]
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("*", function(req,res){
    res.render("pageNotFound");
});

app.listen(port, () => {
    console.log("Server started. Listening on port "+port);
})