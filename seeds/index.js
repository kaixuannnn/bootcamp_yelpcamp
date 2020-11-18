const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fb00cd11c7e1308c5c41315',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Eu sint laborum enim cillum aliqua nostrud ad.Deserunt incididunt velit commodo laboris Lorem fugiat mollit exercitation ad ex. Ullamco do laborum est in pariatur eiusmod sint enim Lorem occaecat. Nostrud quis qui occaecat dolore cupidatat non id esse anim reprehenderit consectetur id in officia. Culpa enim incididunt dolore esse sunt sit ea enim ex cupidatat eiusmod labore voluptate. Non elit ex sit et officia. Officia esse id mollit exercitation.",
            price: price,
            geometry: { 
                type: 'Point', 
                coordinates: [cities[random1000].longitude,
                             cities[random1000].latitude] },
            images: [{
                url: 'https://res.cloudinary.com/dwp6gqc4v/image/upload/v1605515056/YelpCamp/yufnjquitvpgsxv9pj8s.jpg',
                filename: 'YelpCamp/yufnjquitvpgsxv9pj8s'
            },
            {
                url: 'https://res.cloudinary.com/dwp6gqc4v/image/upload/v1605515058/YelpCamp/vwpnsz4i1doytjoqjzib.jpg',
                filename: 'YelpCamp/vwpnsz4i1doytjoqjzib'
            }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})