import React, { useEffect, useState } from "react";
import { useAppState } from "../Context/AppState";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const TodaysCancelation = () => {
  const { BASE_URL, vendorId } = useAppState();
  const [canceledMeals, setCanceledMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTodaysCancelations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/meal/vendorGetTodaysCanelations/${vendorId}`
      );
      console.log("====================================");
      console.log(response.data);
      console.log("====================================");
      setCanceledMeals(response.data);
    } catch (error) {
      setError("Error fetching canceled meals");
      console.log("Error fetching canceled meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodaysCancelations();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress /> {/* Display the loading spinner */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">Error: {error}</Typography>{" "}
        {/* Display error message */}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      {canceledMeals.length > 0 ? (
        canceledMeals.map((meal, index) => (
          <Card
            key={index}
            sx={{
              width: "100%",
              maxWidth: 600,
              margin: 2,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Meal: {meal.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: Canceled
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {new Date(meal.date).toLocaleDateString()}
              </Typography>
              {/* Add more meal details as needed */}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No canceled meals found.</Typography>
      )}
    </Box>
  );
};

export default TodaysCancelation;
