import React, { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import "./UsersVital.css";
import { red } from "@mui/material/colors";

export default function StaffSurveyWelcome({ onSubmit }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [otherDepartment, setOtherDepartment] = useState("");
  const [workYears, setWorkYears] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const departmentOptions = [
    "Board Secretariat",
    "Commercial Services",
    "Corporate Affairs & External Relations",
    "Corporate Office",
    "Corporate Strategy",
    "Digital Transformation & Innovation Unit (DTI)",
    "Engineering Services",
    "Environment & Sustainable Dev't",
    "Finance & Investment",
    "Human Resources",
    "Hydro Generation",
    "Internal Audit",
    "Legal Services",
    "Management Information Systems (MIS)",
    "Procurement",
    "Real Estate & Security Services",
    "Strategic Projects and New Business",
    "Technical Services",
    "Thermal Generation",
    "Utility Services",
    "VRA Academy (VRAA)",
    "Water Resources and Renewable Energy",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!age || !gender || !department || !workYears || !consent) {
      setError("Please complete all fields and accept the consent.");
      return;
    }
    setError("");
    const finalDepartment = department === "Other" ? otherDepartment : department;
    onSubmit({ age, gender, department: finalDepartment, workYears });
  };

  return (
    <Container className="survey-container">
      
      <Paper elevation={4} className="survey-box">
        <Typography variant="h4" className="welcome-text">Assessing the Culture of VRA</Typography>
        <Typography variant="subtitle1" className="sub-text">
        This survey, based on the Competing Values Culture Assessment developed by Robert E. Quinn and Kim S. Cameron, is designed to help the Corporate Strategy Department understand VRA’s current workplace culture and identify how it can be improved, to achieve VRA’s objectives and drive long-term success.
        <Typography variant="body2" style={{ color: "red" }}>
         This Survey has been designed to be anonymous.
        </Typography>


        </Typography>
        
        <form onSubmit={handleSubmit} className="form">
          <FormControl fullWidth required className="select-field">
            <InputLabel>Age</InputLabel>
            <Select value={age} onChange={(e) => setAge(e.target.value)}
              label="Age">
              <MenuItem value="0-25">0-25</MenuItem>
              <MenuItem value="26-35">26-35</MenuItem>
              <MenuItem value="36-45">36-45</MenuItem>
              <MenuItem value="Above 45">Above 45</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required className="select-field">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}
              label="Gender">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              
            </Select>
          </FormControl>

          <FormControl fullWidth required className="select-field">
            <InputLabel>Department</InputLabel>
            <Select value={department} onChange={(e) => setDepartment(e.target.value)}
              label="Department">
              {departmentOptions.map((dept, index) => (
                <MenuItem key={index} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {department === "Other" && (
            <TextField
              label="Specify Other Department"
              variant="outlined"
              fullWidth
              required
              value={otherDepartment}
              onChange={(e) => setOtherDepartment(e.target.value)}
              className="extra-input"
            />
          )}

          <FormControl fullWidth required className="select-field">
            <InputLabel>Number of Years Worked in VRA</InputLabel>
            <Select value={workYears} onChange={(e) => setWorkYears(e.target.value)}
              label="Number of Years Worked in VRA">
              <MenuItem value="1-5 years">1-5 years</MenuItem>
              <MenuItem value="6-10 years">6-10 years</MenuItem>
              <MenuItem value="Above 10 years">Above 10 years</MenuItem>
            </Select>
          </FormControl>

          <Box className="confidentiality-box">
            <Typography variant="body2" className="confidentiality-text">
              🔒 Your information is kept confidential and will only be used for survey purposes.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} />}
              label="I consent to provide my details for this survey."
            />
          </Box>

          {error && <Typography className="error-text">{error}</Typography>}

          <Button type="submit" variant="contained" color="primary" fullWidth className="submit-btn">
            Proceed to Survey
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
