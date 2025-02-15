// src/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const surveyRoutes = require("./routers/Router");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://boss_1:joshq@cluster0.1sy3gyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{ 
  dbName: 'cvf_survey'})
.then(()=>{
  console.log("database connected");
});

app.use("/survey", surveyRoutes);

app.listen(3000, "0.0.0.0",() => console.log("Server running on port 3000"));


