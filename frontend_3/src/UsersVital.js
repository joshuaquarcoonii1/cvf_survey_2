import React from "react";
import { Box, Button, Typography, TextField,MenuItem } from "@mui/material";
import './UsersVital.css';


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
  "Other"
];

const yearsOfExperienceOptions = [
  "1 – 5 years",
  "6 – 10 years",
  "Above 10 years"
];
const genderOptions = [
  "male","female"];


export default function StaffSurveyWelcome({ onClose, department, setDepartment, gender, setGender, yearsOfExperience, setyearsOfExperience ,age,setAge}) {
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
      <Typography variant="h6" gutterBottom align="center">
        Welcome to the Staff Survey
        
      </Typography>
      <Typography  variant="caption" display="block">
      This survey, based on the Competing Values Culture Assessment developed by Robert E. Quinn and Kim S. Cameron, is designed to help the Corporate Strategy Department understand VRA’s current workplace culture and identify how it can be improved, to achieve VRA’s objectives and drive long-term success.
This Survey has been designed to be anonymous.
        
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
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
           <TextField
        select
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {departments.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {department === "Other" && (
        <TextField
          label="Please specify"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      )}
      <TextField
        select
        label="Years of Experience"
        value={yearsOfExperience}
        onChange={(e) => setyearsOfExperience(e.target.value)}
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
      <Button variant="contained" color="primary" onClick={handleFormSubmit} sx={{ marginTop: 2 }}>
        Start Survey
      </Button>
    </Box>
  );
}