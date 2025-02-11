const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  statements: [
    {
        text: { type: String, required: true },
      category: { type: String, required: true } // A, B, C, or D
    
    }
  ]
});

const Question = mongoose.model("Question", QuestionSchema,"Question");

module.exports = Question;
