import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import { useAppState } from "../../Context/AppState";
import axios from "axios";

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
  console.log(menuImage);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { isAuth, role } = useAppState();
  const [showAllComments, setShowAllComments] = useState(false);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment("");
    }
  };

  const purchasePlan = async () => {
    // const response = await axios
    //  console.log(response.data);
  };

  const topComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <Container>
      <StyledBox>
        <Card>
          <CardHeader
            style={{
              textAlign: "center",
              fontSize: "2rem",
            }}
            title={`The plan name is : ${planName}`}
          />
          <CardMedia
            component="img"
            height="300"
            image={menuImage}
            alt="Menu"
          />
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.2rem",
            }}
          >
            <PlanDetail label="Description" value={description} />
            <PlanDetail label="Price" value={`Rs: ${price}`} />
          </CardContent>
          {isAuth ? (
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "column" }}
              justifyContent="center"
              alignItems={"center"}
              marginBottom={"2rem"}
            >
              {role === "Vendor" ? (
                <></>
              ) : (
                <>
                  <Box mt={4}>
                    <Typography
                      variant="h6"
                      component="h2"
                      color={themeColors.text}
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Purchase the plan
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={purchasePlan}
                      sx={{ mt: 2 }}
                    >
                      Purchase
                    </Button>
                  </Box>
                </>
              )}

              <Box mt={4} sx={{ width: "100%", maxWidth: "400px" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  color={themeColors.text}
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Comments
                </Typography>
                <List>
                  {comments.length === 0 ? (
                    <>No Comments till now.</>
                  ) : (
                    <>
                      {" "}
                      {topComments.map((comment, index) => (
                        <ListItem key={index} className="step-box">
                          <Typography variant="h6">{`Comment ${
                            index + 1
                          }`}</Typography>
                          <Typography variant="body1">{comment}</Typography>
                        </ListItem>
                      ))}
                    </>
                  )}
                </List>
                {comments.length > 3 && (
                  <Button
                    variant="outlined"
                    onClick={() => setShowAllComments((prev) => !prev)}
                    sx={{ mt: 2 }}
                  >
                    {showAllComments ? "Show Less" : "Show More"}
                  </Button>
                )}

                {role === "Vendor" ? (
                  <></>
                ) : (
                  <>
                    <TextField
                      label="Add Comment"
                      variant="outlined"
                      fullWidth
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      sx={{ mt: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddComment}
                      sx={{ mt: 2 }}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color={themeColors.text} mt={4}>
              Please log in to purchase the plan and add comments.
            </Typography>
          )}
        </Card>
      </StyledBox>
    </Container>
  );
}
