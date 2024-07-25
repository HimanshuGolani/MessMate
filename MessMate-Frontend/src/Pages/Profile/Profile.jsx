import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { useAppState } from "../../Context/AppState";

const Profile = () => {
  const { BASE_URL, customerId } = useAppState();

  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [mealCancelations, setMealCancelations] = useState([]);
  const [planStartDate, setPlanStartDate] = useState(null);
  const [planEndDate, setPlanEndDate] = useState(null);
  const [mealType, setMealType] = useState("");
  const [planId, setPlanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodaysStatus = async (date) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/meal/getTodaysCacnelation/${selectedDate}/${customerId}`
      );
      console.log("====================================");
      console.log(response.data);
      console.log("====================================");
      setMealCancelations(response.data.response || []);
      setLoading(false);
    } catch (error) {
      setError("Error fetching meal cancelations");
      console.log("Error fetching meal cancelations:", error);
      setLoading(false);
    }
  };

  const getCurrentPlan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/user/getCurrentPlanDetails/${customerId}`
      );
      const currentPlan = response.data.currentPlan;

      setPlanId(currentPlan._id);
      setPlanStartDate(moment(currentPlan.startingDate).format("YYYY-MM-DD"));
      setPlanEndDate(moment(currentPlan.validTill).format("YYYY-MM-DD"));
      setLoading(false);
    } catch (error) {
      setError("Error fetching plan details");
      console.log("Error fetching plan details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentPlan();
  }, [customerId]);

  useEffect(() => {
    if (planStartDate && planEndDate) {
      if (
        moment(selectedDate).isBetween(planStartDate, planEndDate, null, "[]")
      ) {
        fetchTodaysStatus(selectedDate);
      }
    }
  }, [selectedDate, planStartDate, planEndDate]);

  const handleDayClick = (value) => {
    const date = moment(value).format("YYYY-MM-DD");
    if (moment(date).isBetween(planStartDate, planEndDate, null, "[]")) {
      setSelectedDate(date);
    }
  };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const cancelMeal = async () => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8080/api/v1/meal/cancelRequest`, {
        customerId,
        planId,
        selectedDate,
        mealType,
      });
      fetchTodaysStatus(selectedDate);
      setLoading(false);
    } catch (error) {
      setError("Error canceling meal");
      console.log("Error canceling meal:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
          alignItems: "center",
          padding: 2,
        }}
      >
        {/* Display the loading spinner */}
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
          alignItems: "center",
          padding: 2,
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
        justifyContent: "center",
        flexDirection: "column",
        margin: "0 auto",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Calendar
        onClickDay={handleDayClick}
        value={new Date(selectedDate)}
        tileDisabled={({ date }) =>
          !moment(date).isBetween(planStartDate, planEndDate, null, "[]")
        }
        tileClassName={({ date, view }) =>
          view === "month" && moment(date).format("YYYY-MM-DD") === selectedDate
            ? "selected-day"
            : null
        }
      />

      <Typography
        variant="h3"
        sx={{
          marginTop: 2,
          textDecoration: "underline",
          color: "rgb(207, 126, 27)",
          fontWeight: "bold",
        }}
      >
        Meal Details
      </Typography>

      <List>
        {mealCancelations.length > 0 ? (
          mealCancelations.map((item, index) => (
            <Paper
              key={index}
              sx={{
                margin: 1,
                padding: 2,
                backgroundColor: "#E0E0E0",
                borderRadius: 1,
              }}
            >
              <ListItem>
                <Typography>
                  Meal: {item.mealType} - Status: Canceled
                </Typography>
              </ListItem>
            </Paper>
          ))
        ) : (
          <Typography variant="h5">No meals canceled on this date.</Typography>
        )}
      </List>

      {moment(selectedDate).isSameOrAfter(today) &&
      !mealCancelations.some((meal) => meal.date === selectedDate) ? (
        <Box sx={{ marginTop: 2 }}>
          <Typography>Select Meal Type to Cancel:</Typography>
          <RadioGroup row value={mealType} onChange={handleMealTypeChange}>
            <FormControlLabel value="Lunch" control={<Radio />} label="Lunch" />
            <FormControlLabel
              value="Dinner"
              control={<Radio />}
              label="Dinner"
            />
          </RadioGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={cancelMeal}
            disabled={!mealType}
            sx={{ marginTop: 2 }}
          >
            Cancel Selected Meal
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default Profile;
