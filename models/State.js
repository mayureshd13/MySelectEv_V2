const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: String,
    cities: [String]
});

const State = mongoose.model('State', stateSchema);
module.exports = State;
