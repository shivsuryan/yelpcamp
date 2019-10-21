var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Camp01",
        imageUrl: "https://images.unsplash.com/photo-1439524970634-649c37a69e5c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1450&h=825&fit=crop&s=bfda9916c885869b43b70738693428d9",
        description: 'Spicy jalapeno bacon ipsum dolor amet alcatra fatback salami, beef ribs strip steak capicola tail. Beef ribs ham beef, ham hock alcatra tri-tip corned beef salami frankfurter meatball swine. Alcatra bresaola hamburger ribeye shank, meatball ham flank jerky. Chicken t-bone beef, picanha leberkas prosciutto hamburger. Hamburger ham frankfurter, fatback pastrami beef ribs spare ribs boudin capicola short loin shoulder brisket pig.'
    },
    {
        name: "Camp02",
        imageUrl: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450",
        description: 'Salami alcatra strip steak, spare ribs ribeye meatball ham kielbasa cupim corned beef. Cow kevin flank shank andouille brisket tail strip steak doner. Buffalo swine tail pastrami. Turducken pork chop flank filet mignon porchetta meatball chicken, jowl landjaeger. Porchetta chuck alcatra ground round. Kevin alcatra ham, burgdoggen ribeye boudin strip steak short loin shankle. Jowl salami picanha biltong pancetta alcatra pork strip steak beef porchetta chicken tail fatback corned beef tenderloin.'
    },
    {
        name: "Camp03",
        imageUrl: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450",
        description: 'Leberkas kielbasa buffalo, shankle ham hock beef ground round pancetta cupim spare ribs ball tip jowl. Pork prosciutto rump, spare ribs meatball tenderloin hamburger short loin pastrami venison sausage short ribs flank ground round. Brisket ham picanha buffalo frankfurter shoulder turducken kielbasa pastrami sausage flank. Ham meatloaf chuck, beef kevin andouille cow brisket tongue capicola bresaola burgdoggen. Alcatra corned beef prosciutto short ribs capicola cupim pork, sirloin picanha.'
    }
];

function seedDB() {
    Campground.deleteMany({}, function () {
        console.log('All the old data removed.')
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Campground created.');
                    Comment.create({
                        text: 'This place is awsome!!!',
                        author: 'Admin'
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                        }
                    })
                }
            })
        })
    });
}

module.exports = seedDB;