import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, TextField, LinearProgress, Box ,Modal} from "@mui/material";
import { saveAs } from "file-saver";
import StaffSurveyWelcome from "./UsersVital"; // Adjust the import path as needed

export default function CVFSurvey() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
// const [staffId, setStaffId] = useState("");
  const [gender, setGender] = useState("");
  const [yearsOfExperience, setyearsOfExperience] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const handleSubmit = async () => {
    // Validate that each question's answers sum to 100
    const isValid = responses.every((q) =>
      Object.values(q.answers).reduce((sum, val) => sum + Number(val), 0) === 100
    );
  
    if (!isValid) {
      alert("Each question's responses must total 100.");
      return;
    }
  
    const formData = {
      age,
      gender,
      yearsOfExperience,
      responses,
      department
    };
  
    try {
      const response = await fetch("http://192.168.0.178:3000/survey/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        
        alert("Survey submitted successfully!");
        setResponses(questions.map(() => ({ A: "", B: "", C: "", D: "" }))); // Reset form
      } else {
        const errorData = await response.json();
        alert("Submission failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://192.168.0.178:3000/survey/questions'); // Replace with your API endpoint
      const data = await response.json();
      setQuestions(data);
      setResponses(data.map(() => data[0].statements.map(() => ({ currentCulture: 0 }))));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleChange = (qIndex, sIndex, type, value) => {
    const newValue = Number(value) || 0;
    const currentTotal = responses[qIndex].reduce(
      (sum, v, j) => sum + (j === sIndex ? 0 : v[type]),
      0
    );

    if (currentTotal + newValue > 100) return; // Prevent exceeding 100

    const newResponses = [...responses];
    newResponses[qIndex][sIndex][type] = newValue;
    setResponses(newResponses);
  };

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(responses, null, 2)], { type: "application/json" });
    saveAs(blob, "responses.json");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        CVF Survey
      </Typography>
      {questions.map((question, qIndex) => {
        const totalCurrentCulture = responses[qIndex].reduce((sum, v) => sum + v.currentCulture, 0);

        return (
          <Card key={qIndex} sx={{ marginBottom: 4 }}>
            <CardContent>
              <Typography variant="h6">{question.text}</Typography>
              <LinearProgress variant="determinate" value={totalCurrentCulture} sx={{ marginBottom: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Current Culture: {totalCurrentCulture}/100
              </Typography>
              {question.statements.map((statement, sIndex) => (
                <Box key={sIndex} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1">{statement.category}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                    {statement.text}
                  </Typography>
                  <TextField
                    label="Current Culture"
                    type="number"
                    value={responses[qIndex][sIndex].currentCulture}
                    onChange={(e) => handleChange(qIndex, sIndex, "currentCulture", e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        );
      })}
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Submit
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-description"
        BackdropProps={{ onClick: (e) => e.stopPropagation() }}

      >
        <StaffSurveyWelcome
          onClose={() => setIsModalOpen(false)}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          department={department}
          setDepartment={setDepartment}
          yearsOfExperience={yearsOfExperience}
          setyearsOfExperience={setyearsOfExperience}

        />
      </Modal>
    </Box>
  );
}