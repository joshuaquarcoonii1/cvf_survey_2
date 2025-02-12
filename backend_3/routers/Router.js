const express = require("express");
const Survey = require("../models/Survey");
const router = express.Router();
const Question = require("../models/Question");
const Response = require("../models/Response");
// router.post("/", async (req, res) => {
//   try {
//     const newSurvey = new Survey(req.body);
//     await newSurvey.save();
//     res.status(201).json(newSurvey);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
//get all responses
router.get("/responses", async (req, res) => {
    try {
      const responses = await Response.find().populate("responses.questionId");
  
      if (!responses.length) {
        return res.status(404).json({ message: "No responses found" });
      }
  
      res.status(200).json(responses);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
//submit responses
router.post("/responses", async (req, res) => {
    try {
      const { age,department, gender, yearsOfExperience, responses } = req.body;
  
      // Validate total for each question
      const isValid = responses.every((q) =>
        Object.values(q.answers).reduce((sum, val) => sum + Number(val), 0) === 100
      );
  
      if (!isValid) {
        return res.status(400).json({ message: "Each question's responses must total 100." });
      }
  
      const newResponse = new Response({ age,department, gender, yearsOfExperience, responses });
      await newResponse.save();
  
      res.status(201).json({ message: "Survey submitted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  //get all questions
router.get("/questions", async (req, res) => {
  try {
    const surveys = await Question.find();
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/responses/:id", async (req, res) => {
  try {
    const response = await Response.findById(req.params.id).populate("responses.questionId");

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;