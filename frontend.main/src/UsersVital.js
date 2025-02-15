import React from "react";
import { Box, Button, Typography, TextField,MenuItem } from "@mui/material";
import './UsersVital.css';
import iconImage from "./assets/logo.jpg";
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
</link>

const departments = [
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
];

const yearsOfExperienceOptions = [
  "1 – 5 years",
  "6 – 10 years",
  "Above 10 years"
];

const ageOptions=[
  "0-25",
  "26-35",
  "36-45",
  "Above 45"
]
const genderOptions = [
  "Male","Female"];


export default function StaffSurveyWelcome({ onClose, department, setDepartment, gender, setGender, yearsOfExperience, setYearsOfExperience ,age,setAge,handleDepartmentChange,customDepartment, setCustomDepartment}) {

  const handleFormSubmit = () => {
    if ( gender && yearsOfExperience && department && age) {
      onClose();
    } else {
      alert("Please fill out all fields.");
    }
  };
  return (
    <Box sx={{ 
      width: 400, 
      padding: 4, 
      margin: 'auto', 
      backgroundColor: 'white', 
      borderRadius: 2, 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)' 
    }}>
     


     <Typography 
  variant="h5" 
  gutterBottom 
  align="center"
  sx={{
    fontWeight: "bold",
    fontFamily: "'Montserrat', sans-serif",
    background: "linear-gradient(45deg, #1E88E5, #42A5F5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: 2,
  }}
>   <img src={iconImage} alt="icon" style={{ width: 50, height: 50 }} /><br></br>
Assessing VRA's Work Culture        
      </Typography>
      <Typography variant="caption" display="block" sx={{ textAlign: "justify", lineHeight: 1.6, marginBottom: 2 }}>
  This survey, based on the <strong>Competing Values Culture Assessment</strong> developed by <strong>Robert E. Quinn</strong> and <strong>Kim S. Cameron</strong>, is designed to help the <strong>Corporate Strategy Department</strong> understand VRA’s current workplace culture and identify how it can be improved to achieve VRA’s objectives and drive long-term success.
</Typography>

<Typography variant="caption" display="block" sx={{ color: "red", fontWeight: "bold", marginTop: 1 }}>
  This survey has been designed to be anonymous.
</Typography>

    
      {/* <TextField
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        margin="normal"
      /> */}
      <TextField
        select
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {genderOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {ageOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))} </TextField>
      <TextField
        select
        label="Department"
        value={department}
        onChange={handleDepartmentChange}
        fullWidth
        margin="normal"
      >
        {departments.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      {department === "Other" && (
        <TextField
          label="Please specify"
          value={customDepartment}
          onChange={(e) => setCustomDepartment(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      )}
      <TextField
        select
        label="Years of Experience"
        value={yearsOfExperience}
        onChange={(e) => setYearsOfExperience(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {yearsOfExperienceOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {/* <Box className="confidentiality-box">
            <Typography variant="body2" className="confidentiality-text">
              🔒 Your information is kept confidential and will only be used for survey purposes.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} />}
              label="I consent to provide my details for this survey."
            />
          </Box> */}
      <Button variant="contained" color="primary" onClick={handleFormSubmit} sx={{ marginTop: 2 }}>
        Start Survey
      </Button>
    </Box>
  );
}
