import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const ResponseDetails = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://192.168.0.178:3000/survey/responses/${id}`);
        setSubmission(response.data);
      } catch (err) {
        setError("Failed to load submission");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Submission Details
      </Typography>
      {submission && (
        <Box>
          <Typography variant="body1">
            <strong>Department:</strong> {submission.department}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {submission.age}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {submission.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Years of Experience:</strong> {submission.yearsOfExperience}
          </Typography>
          <Typography variant="body1">
            <strong>Responses:</strong>
          </Typography>
          <ul>
            {submission.responses.map((response, index) => (
              <li key={index}>
                <Typography variant="body2">
                  <strong>Question:</strong> {response.questionId ? response.questionId.text : "Question not found"}
                </Typography>
                <Typography variant="body2">
                  <strong>Answer:</strong> {JSON.stringify(response.answers)}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default ResponseDetails;