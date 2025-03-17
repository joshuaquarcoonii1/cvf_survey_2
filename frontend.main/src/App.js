import React, { useState, useEffect } from "react";
import { Button, Card,TextField, CardContent, Typography, Box, IconButton,Modal  ,LinearProgress } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import StaffSurveyWelcome from "./UsersVital"; // Adjust the import path as needed
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CVFModal from "./CVFModal";

export default function CVFSurvey() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [gender, setGender] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [customDepartment, setCustomDepartment] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://cvf-survey-2.onrender.com/survey/questions");
      const data = await response.json();

      if (!data || data.length === 0) {
        console.error("No questions received from API.");
        return;
      }

      setQuestions(data);
      setResponses(data.map((q) => q.statements.map(() => ({ currentCulture: 0 }))));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleChange = (qIndex, sIndex, change) => {
    if (!responses[qIndex]) {
      responses[qIndex] = questions[qIndex]?.statements.map(() => ({ currentCulture: 0 })) || [];
    }

    const newValue = responses[qIndex][sIndex].currentCulture + change;
    if (newValue < 0 || newValue > 100) return;

    const currentTotal = responses[qIndex].reduce((sum, v, j) => sum + (j === sIndex ? 0 : v.currentCulture), 0);
    if (currentTotal + newValue > 100) return;

    const newResponses = [...responses];
    newResponses[qIndex][sIndex].currentCulture = newValue;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    const isValid = responses.every((q) =>
      q && Object.values(q).reduce((sum, val) => sum + Number(val.currentCulture), 0) === 100
    );

    if (!isValid) {
      alert("Each question's responses must total 100.");
      return;
    }

    const formattedResponses = questions.map((question, qIndex) => ({
      questionId: question._id,
      answers: {
        A: responses[qIndex][0].currentCulture,
        B: responses[qIndex][1].currentCulture,
        C: responses[qIndex][2].currentCulture,
        D: responses[qIndex][3].currentCulture
      }
    }));

    const formData = {
      age,
      gender,
      yearsOfExperience,
      responses: formattedResponses,
      department: department === "Other" ? customDepartment : department
    };

    try {
      const response = await fetch("https://cvf-survey-2.onrender.com/survey/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccessModalOpen(true);
        setResponses(questions.map((q) => q.statements.map(() => ({ currentCulture: 0 }))));
      } else {
        const errorData = await response.json();
        alert("Submission failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const getProgressColor = (value) => {
    if (value === 0) return "#ADD8E6"; // Light Blue
    if (value > 0 && value <= 25) return "#FF7F7F"; // Light Red
    if (value > 25 && value <= 50) return "#FFFACD"; // Light Yellow
    if (value > 50 && value <= 75) return "#FFD700"; // Gold
    if (value > 75 && value < 100) return "#90EE90"; // Light Green
    if (value === 100) return "#008000"; // Deep Green
  };


  const totalCurrentCulture = (responses[currentQuestionIndex] || []).reduce((sum, v) => sum + v.currentCulture, 0);
  const progressColor = getProgressColor(totalCurrentCulture);
  // const handleNext = () => {
  //   if (totalCurrentCulture === 100) {
  //     setCurrentQuestionIndex((prev) => prev + 1);
  //   } else {
  //     alert("Please ensure the total current culture for this question is 100 before proceeding.");
  //   }
  // };
  const handleManualInput = (qIndex, sIndex, event) => {
    let newValue = event.target.value;
  
    // Allow only numbers
    if (!/^\d*$/.test(newValue)) return;
  
    newValue = newValue === "" ? 0 : parseInt(newValue, 10); // Handle empty input
  
    const currentTotal = responses[qIndex].reduce(
      (sum, v, j) => sum + (j === sIndex ? 0 : v.currentCulture),
      0
    );
  
    if (currentTotal + newValue > 100) return; // Restrict input if it exceeds 100
  
    const newResponses = [...responses];
    newResponses[qIndex][sIndex].currentCulture = newValue;
    setResponses(newResponses);
  };
  const labels = ["A", "B", "C", "D"];
  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setDepartment(value);
    if (value !== "Other") {
      setCustomDepartment(""); // Reset custom input if not selecting "Other"
    }
  };
  return (
    <div>
    
  <CVFModal />

    </div>
  );
}
