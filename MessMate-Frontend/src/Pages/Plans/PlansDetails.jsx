import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";

const themeColors = {
  primary: "#e67e22",
  secondary: "#fae5d3",
  text: "#333",
  highlight: "#e67e22",
  background: "#fff",
  boxBackground: "#fafafa",
};

const Container = styled("div")({
  padding: "20px",
  backgroundColor: themeColors.background,
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledBox = styled(Box)({
  backgroundColor: themeColors.boxBackground,
  color: themeColors.text,
  width: "100%",
  maxWidth: "800px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const PlanDetail = ({ label, value }) => (
  <Box my={2}>
    <Typography variant="h6" component="h2" color={themeColors.text}>
      {label}
    </Typography>
    <Typography variant="body1" component="p" color={themeColors.text}>
      {value}
    </Typography>
  </Box>
);

export default function PlansDetails() {
  const { state } = useLocation();
  const { planName, description, menuImage, price } = state;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment("");
    }
  };

  return (
    <Container>
      <StyledBox>
        <CardHeader title={planName} />
        <CardMedia component="img" height="300" image={menuImage} alt="Menu" />
        <CardContent>
          <PlanDetail label="Description" value={description} />
          <PlanDetail label="Price" value={`Rs: ${price}`} />

          {/*
             Add a login stage here: if login is true then only the comment section will be shown
             and if the user has bought the plan, then only they can comment.
          */}
          {false ? (
            <>
              <Box mt={4}>
                <Typography
                  variant="h6"
                  component="h2"
                  color={themeColors.text}
                >
                  Comments
                </Typography>
                <List>
                  {comments.map((comment, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={comment} />
                    </ListItem>
                  ))}
                </List>
                <Box mt={2}>
                  <TextField
                    label="Add Comment"
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </StyledBox>
    </Container>
  );
}
