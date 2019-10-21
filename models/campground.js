var mongoose = require('mongoose');
var Comment = require('./comment');

var campgroundSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
    ]
})

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;