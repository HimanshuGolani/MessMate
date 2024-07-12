import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
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
});

const StyledCard = styled(Card)({
  backgroundColor: themeColors.boxBackground,
  color: themeColors.text,
  maxWidth: 600,
  margin: "0 auto",
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
      <StyledCard>
        <CardHeader title={planName} />
        <CardMedia component="img" height="194" image={menuImage} alt="Menu" />
        <CardContent>
          <PlanDetail label="Description" value={description} />
          <PlanDetail label="Price" value={`Rs: ${price}`} />
          <Box mt={4}>
            <Typography variant="h6" component="h2" color={themeColors.text}>
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
        </CardContent>
      </StyledCard>
    </Container>
  );
}
