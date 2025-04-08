const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: String,
    state: String,
    city: String,
    address: String,
    latitude: String,
    longitude: String,
    type: String
});

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;
