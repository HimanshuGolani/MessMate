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
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../Context/AppState";
import EditIcon from "@mui/icons-material/Edit";

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
  const { planName, description, duration, menuImage, price, planId } = state;
  console.log(planId);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { isAuth, role } = useAppState();
  const [showAllComments, setShowAllComments] = useState(false);

  const navigate = useNavigate();

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

  const handleEdit = () => {
    navigate(`/vender/editPlanForm`, {
      state: { planName, description, duration, menuImage, price, planId },
    });
  };

  const topComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <Container>
      <StyledBox>
        <Card>
          <CardHeader
            action={
              role === "Vendor" && (
                <Button onClick={handleEdit}>
                  <EditIcon />
                </Button>
              )
            }
            title={planName}
            titleTypographyProps={{ variant: "h5", color: themeColors.text }}
          />
          <CardMedia
            component="img"
            height="300"
            image={menuImage}
            alt="Menu"
          />
          <CardContent>
            <PlanDetail label="Description" value={description} />
            <PlanDetail label="Price" value={`Rs: ${price}`} />
          </CardContent>
          {isAuth ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginBottom="2rem"
            >
              {role !== "Vendor" && (
                <Box mt={4} textAlign="center">
                  <Typography
                    variant="h6"
                    component="h2"
                    color={themeColors.text}
                    fontWeight="bold"
                  >
                    Purchase the plan
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: themeColors.primary,
                      "&:hover": { backgroundColor: themeColors.highlight },
                    }}
                    onClick={purchasePlan}
                  >
                    Purchase
                  </Button>
                </Box>
              )}
              <Box mt={4} sx={{ width: "100%", maxWidth: "400px" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  color={themeColors.text}
                  fontWeight="bold"
                >
                  Comments
                </Typography>
                <List>
                  {comments.length === 0 ? (
                    <Typography variant="body1" color={themeColors.text}>
                      No Comments till now.
                    </Typography>
                  ) : (
                    topComments.map((comment, index) => (
                      <ListItem key={index}>
                        <Box>
                          <Typography variant="h6">{`Comment ${
                            index + 1
                          }`}</Typography>
                          <Typography variant="body1">{comment}</Typography>
                        </Box>
                      </ListItem>
                    ))
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
                {role !== "Vendor" && (
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
                      sx={{
                        mt: 2,
                        backgroundColor: themeColors.primary,
                        "&:hover": { backgroundColor: themeColors.highlight },
                      }}
                      onClick={handleAddComment}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          ) : (
            <Typography
              variant="body1"
              color={themeColors.text}
              mt={4}
              textAlign="center"
            >
              Please log in to purchase the plan and add comments.
            </Typography>
          )}
        </Card>
      </StyledBox>
    </Container>
  );
}
