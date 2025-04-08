const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // If using a .env file for MongoDB URI

const State = require("./models/State"); 
const Station = require("./models/Station"); 

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/selectev', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const statesData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "states.json"), "utf-8"));
const stationsData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "stationev.json"), "utf-8"));

const importData = async () => {
    try {
        await State.insertMany(statesData.states);
        await Station.insertMany(stationsData);
        console.log("✅ Data Imported Successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error Importing Data:", error);
        process.exit(1);
    }
};

importData();
