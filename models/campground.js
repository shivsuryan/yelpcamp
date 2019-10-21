var mongoose = require('mongoose');

var campgroundSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;