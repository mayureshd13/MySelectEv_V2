const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 8080;

const State = require("./models/State");
const Station = require("./models/Station");
const EV = require("./models/EV");
const { timeLog } = require("console");
const { title } = require("process");
require('dotenv').config();
const cors = require("cors");



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));


    app.use(cors({
      origin: "https://select-ev.onrender.com"
    }));

    app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/states", async (req, res) => {
    try {
      const states = await State.find();
      res.json(states);
    } catch (error) {
      res.status(500).json({ error: "Error fetching states" });
    }
  });

  app.get("/stations", async (req, res) => {
    try {
      const stations = await Station.find();
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: "Error fetching stations" });
    }
  });

  app.get("/stations/:city", async (req, res) => {
    try {
      const city = req.params.city;
      const stations = await Station.find({ city });
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: "Error fetching stations for city" });
    }
  });

  app.get("/evs", async (req, res) => {
    try {
        const evs = await EV.find();
        res.json(evs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching EV data" });
    }
});

    

app.get("/", (req, res) => {
    res.render("pages/index.ejs",{ title:'Select-EV' ,currentPage: 'home' });
});

app.get("/ev-finder", (req, res) => {
    res.render("pages/evFinder",{title:'Ev-Finder', currentPage: 'evs'});
});

app.get("/find-stations", (req, res) => {
    res.render("pages/evStation",{title: 'Find EV Charging Station', currentPage: 'stations'});
});

app.get("/compare-evs", (req, res) => {
  res.render("pages/compareEVs", {title: 'Compare EVs', currentPage: 'compare'});
});

app.get("/about-us",(req,res)=>{
  res.render("pages/about",{title:"About Us",currentPage:'about'});
});

app.get("/eva",(req,res)=>{
  res.render("pages/eva",{title:"Eva",currentPage:'Eva'});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});





































