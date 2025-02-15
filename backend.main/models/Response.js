const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  age: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  yearsOfExperience: {
    type: String,
    required: true
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
      },
      answers: {
        A: { type: Number, required: true, min: 0, max: 100 },
        B: { type: Number, required: true, min: 0, max: 100 },
        C: { type: Number, required: true, min: 0, max: 100 },
        D: { type: Number, required: true, min: 0, max: 100 }
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Response", responseSchema);
