const fs = require("fs");
const mongoose = require("mongoose");
const EV = require("./models/EV"); // Import the EV model

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/selectev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Read JSON file
const evData = JSON.parse(fs.readFileSync("data/evdata.json", "utf-8"));

// Insert Data into DB
EV.insertMany(evData)
    .then(() => {
        console.log("Data imported successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.error("Error importing data:", err));
