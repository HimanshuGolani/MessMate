import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../Context/AppState";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
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

const StyledButton = styled(Button)({
  marginTop: "1rem",
  backgroundColor: themeColors.primary,
  "&:hover": {
    backgroundColor: themeColors.highlight,
  },
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

const CongratsAnimation = styled("div")({
  fontSize: "2rem",
  color: themeColors.primary,
  textAlign: "center",
  animation: "congrats 2s ease-out infinite",
  "@keyframes congrats": {
    "0%, 100%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.2)",
    },
  },
});

const CommentCard = styled(Card)({
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: themeColors.boxBackground,
});

const CommentHeader = styled(CardHeader)({
  paddingBottom: "0px",
});

const CommentDate = styled(Typography)({
  fontSize: "0.875rem",
  color: themeColors.text,
});

export default function PlansDetails() {
  const { state } = useLocation();
  const { planName, description, menuImage, price, planId } = state;
  const [comments, setComments] = useState([]);
  const { isAuth, role, BASE_URL, customerId } = useAppState();
  const [showAllComments, setShowAllComments] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const purchasePlan = async () => {
    const response = await axios.post(`${BASE_URL}/user/purchasePlan`, {
      planId,
      customerId: customerId,
    });
    console.log(response.data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/vendor/editPlanForm`, {
      state: { planName, description, menuImage, price, planId },
    });
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comment/allComments/${planId}`
      );
      const { comments } = response.data;
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  React.useEffect(() => {
    getComments();
  }, [planId]);

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
          <a href={menuImage} target="_blank" rel="noopener noreferrer">
            <CardMedia
              component="img"
              height="300"
              image={menuImage}
              alt="Menu"
            />
          </a>
          <CardContent>
            <PlanDetail label="Description" value={description} />
            <PlanDetail label="Price" value={`Rs: ${price}`} />
          </CardContent>
          {isAuth ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={4}
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
                  <StyledButton variant="contained" onClick={purchasePlan}>
                    Purchase Plan
                  </StyledButton>
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
                      No comments yet.
                    </Typography>
                  ) : (
                    topComments.map((comment, index) => (
                      <ListItem key={index}>
                        <CommentCard>
                          <CommentHeader title={`Comment ${index + 1}`} />
                          <CardContent>
                            <Typography variant="body1">
                              {comment.comment}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={themeColors.text}
                            >
                              Rating: {comment.rating}
                            </Typography>
                            <CommentDate>
                              {new Date(comment.date).toLocaleDateString()}
                            </CommentDate>
                          </CardContent>
                        </CommentCard>
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
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Card>
      </StyledBox>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Purchase Confirmation
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <CongratsAnimation>Congratulations!</CongratsAnimation>
          <Typography
            variant="h6"
            color={themeColors.text}
            align="center"
            mt={2}
          >
            You have successfully purchased the plan.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
