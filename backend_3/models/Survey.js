const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  staffId: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  yearsOfService: { type: Number, required: true },
  userId: { type: String, required: true },
  responses: [
    {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        now: [Number],
      
    },
  ],
});

module.exports = mongoose.model("Responses", SurveySchema,"Responses");