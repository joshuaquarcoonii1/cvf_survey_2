import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

const AllSubmissionsScreen = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  
    const saveToExcel = (submissions) => {
      if (!submissions || submissions.length === 0) {
        alert("No responses to save.");
        return;
      }
    
      const idMapping = {};
      let idCounter = 1;
  
      submissions.forEach((submission) => {
        if (!idMapping[submission._id]) {
          idMapping[submission._id] = idCounter++;
        }
      });
  
      // Create worksheet data with an ID column
      const excelData = submissions.flatMap((submission) =>
        submission.responses.map((resp) => ({
          "ID": idMapping[submission._id],
          "Age": submission.age,
          "Department": submission.department,
          "Gender": submission.gender,
          "Years of Experience": submission.yearsOfExperience,
          "Question": resp.questionId.text || resp.questionId, // Include question text if available
          "A": resp.answers.A,
          "B": resp.answers.B,
          "C": resp.answers.C,
          "D": resp.answers.D,
        }))
      );
    
      // Create a new workbook and add the data
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Survey Responses");
    
      // Convert to Excel file and trigger download
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      FileSaver.saveAs(data, "survey_responses.xlsx");
    };
    
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("https://cvf-survey-2.onrender.com/survey/responses");
        setSubmissions(response.data);
      } catch (err) {
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch("http://172.20.10.2:3000/survey/export/excel", {
  //       responseType: "blob", // Important to handle binary data
  //     });
  
  //     const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  //     FileSaver.saveAs(blob, "survey_responses.csv");
  //   } catch (error) {
  //     console.error("Download error:", error);
  //     alert("Failed to download file.");
  //   }
  // };
  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        All Submissions
      </Typography>

      <List>
        {submissions.map((item) => (
          <ListItem key={item._id} disablePadding>
            <ListItemButton onClick={() => navigate(`/submission/${item._id}`)}>
              <ListItemText
                primary={`Submission by ${item.department}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Age: {item.age}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textPrimary">
                      Gender: {item.gender}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textPrimary">
                      Experience: {item.yearsOfExperience} years
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <button onClick={() => saveToExcel(submissions)} style={{ padding: "10px 20px", background: "green", color: "white", border: "none", cursor: "pointer" }}>
  Save Responses to Excel
</button>

    </Box>
  );
};

export default AllSubmissionsScreen;
