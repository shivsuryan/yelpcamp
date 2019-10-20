var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelpcamp');

var campgroundSchema = mongoose.Schema({
    name:String,
    imageUrl:String
});

var Campground = mongoose.model("Campground",campgroundSchema);
console.log("#####################################");
console.log("Inserting the starter data.");
console.log("#####################################");

Campground.create({
    name: "Camp01",
    imageUrl: "https://images.unsplash.com/photo-1439524970634-649c37a69e5c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1450&h=825&fit=crop&s=bfda9916c885869b43b70738693428d9"
}, function(err,campground){
    if(err){
        console.log(err);
    }else{
        console.log('Campground created with ID:'+campground.id);
        console.log(campground);
    }
});

Campground.create({
    name: "Camp02",
    imageUrl: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450"
}, function(err,campground){
    if(err){
        console.log(err);
    }else{
        console.log('Campground created with ID:'+campground.id);
        console.log(campground);
    }
});

Campground.create({
    name: "Camp03",
    imageUrl: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450"
}, function(err,campground){
    if(err){
        console.log(err);
    }else{
        console.log('Campground created with ID:'+campground.id);
        console.log(campground);
    }
});

console.log("#####################################");
console.log("Done with inserting the starter data.");
console.log("#####################################");