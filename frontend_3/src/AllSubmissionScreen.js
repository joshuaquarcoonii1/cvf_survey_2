import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllSubmissionsScreen = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://192.168.0.178:3000/survey/responses");
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
    </Box>
  );
};

export default AllSubmissionsScreen;