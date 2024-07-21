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
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "react-calendar/dist/Calendar.css";

const Profile = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const [planStartDate, setPlanStartDate] = useState("2024-07-01");
  const [planEndDate, setPlanEndDate] = useState("2024-07-31");

  const fetchTodaysStatus = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/todos/completed/${date}`
      );
      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (
      moment(selectedDate).isBetween(planStartDate, planEndDate, null, "[]")
    ) {
      fetchTodaysStatus(selectedDate);
    }
  }, [selectedDate, planStartDate, planEndDate]);

  const handleDayClick = (value) => {
    const date = moment(value).format("YYYY-MM-DD");
    if (moment(date).isBetween(planStartDate, planEndDate, null, "[]")) {
      setSelectedDate(date);
    }
  };

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

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Meal list
      </Typography>

      <List>
        {todos.length > 0 ? (
          todos.map((item, index) => (
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
                <ListItemText primary={item?.title} />
              </ListItem>
            </Paper>
          ))
        ) : (
          <Typography>No data found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default Profile;
