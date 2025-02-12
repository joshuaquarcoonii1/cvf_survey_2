// src/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const surveyRoutes = require("./routers/Router");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017',{ 
    dbName: 'cvf_survey'})
  .then(()=>{
    console.log("database connected");
  });

app.use("/survey", surveyRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));


