import React, { useState, useEffect } from "react";
import { Button, Card,TextField, CardContent, Typography, Box, IconButton,Modal  ,LinearProgress } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import StaffSurveyWelcome from "./UsersVital"; // Adjust the import path as needed
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
      department
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
    <Box sx={{ padding: 4, textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Modal
        open={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-description"
        BackdropProps={{ onClick: (e) => e.stopPropagation() }}
      >
        <StaffSurveyWelcome
          onClose={() => setIsWelcomeModalOpen(false)}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          department={department}
          setDepartment={setDepartment}
          yearsOfExperience={yearsOfExperience}
          setYearsOfExperience={setYearsOfExperience}
             customDepartment={customDepartment}
          setCustomDepartment={setCustomDepartment}
         handleDepartmentChange={handleDepartmentChange}

        />
      </Modal>

      <Card sx={{ width: "90%", maxWidth: 800, padding: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
          Question {currentQuestionIndex + 1} of {questions.length}: {questions.length > 0 && questions[currentQuestionIndex]?.text}
          </Typography>
<Typography variant="caption" display="block" sx={{ color: "red", fontWeight: "bold", marginTop: 1 }}>
Kindly allocate 100 points accross the statements below.</Typography>
          {questions.length > 0 &&
            questions[currentQuestionIndex]?.statements.map((statement, sIndex) => (
              
              <Box key={sIndex} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #ddd", padding: 2, borderRadius: 2, marginBottom: 2 }}>
  
  {/* Input Field on the Left */}
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <TextField
      type="number"
      value={responses[currentQuestionIndex][sIndex].currentCulture}
      onChange={(event) => handleManualInput(currentQuestionIndex, sIndex, event)}
      sx={{ width: 80, textAlign: "center", fontWeight: "bold", marginRight: 1 }}
      inputProps={{ min: 0, max: 100 }}
    />
    
    <IconButton onClick={() => handleChange(currentQuestionIndex, sIndex, -10)}>
      <Remove />
    </IconButton>

    <IconButton onClick={() => handleChange(currentQuestionIndex, sIndex, 10)}>
      <Add />
    </IconButton>
  </Box>

  {/* Question Text */}
  <Typography variant="body1" sx={{ flex: 1 }}>
  <Typography component="span" sx={{ fontWeight: "bold" }}>
    {labels[sIndex]}.
  </Typography> {statement.text}
</Typography>
</Box>

            ))}
            <LinearProgress
              variant="determinate"
              value={totalCurrentCulture}
              sx={{
                marginBottom: 2,
                height: 10,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: progressColor
                }
              }}
            />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: totalCurrentCulture === 100 ? "green" : "red" }}>
            Points Remaining: {100 - totalCurrentCulture}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <Button variant="contained" disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>
              Previous
            </Button>

            {currentQuestionIndex < questions.length - 1 ? (
              <Button variant="contained" disabled={totalCurrentCulture !== 100} onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>
                Next
              </Button>
            ) : (
              <Button variant="contained" color="success" disabled={totalCurrentCulture !== 100} onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={isSuccessModalOpen}
        onClose={() => {}}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box sx={{ width: 400, padding: 4, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2, textAlign: 'center' }}>
      <CheckCircleIcon sx={{ color: "green", fontSize: 100 }} />
          <Typography variant="h6" id="success-modal-title">
            Your response has been successfully submitted
          </Typography>
          <Typography variant="body1" id="success-modal-description" sx={{ marginTop: 2 }}>
            Thank you!
          </Typography>
        </Box>
      </Modal>
      
    </Box>
    
  );
}
