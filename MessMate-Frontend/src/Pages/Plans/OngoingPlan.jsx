import React, { useEffect, useState } from "react";
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
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useAppState } from "../../Context/AppState";

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
  color: themeColors.text,
  width: "100%",
  maxWidth: "800px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: themeColors.boxBackground,
});

const StyledLabel = styled(Typography)({
  fontWeight: "bold",
  marginRight: "8px",
  color: themeColors.primary,
});

const DataRow = styled(Box)({
  display: "flex",
  marginBottom: "10px",
  alignItems: "center",
});

const CommentsSection = styled(Box)({
  marginTop: "20px",
  padding: "10px",
  borderRadius: "8px",
});

const CommentCard = styled(Card)({
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: themeColors.background,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const CommentHeader = styled(CardHeader)({
  paddingBottom: "8px",
});

const CommentDate = styled(Typography)({
  fontSize: "0.875rem",
  color: themeColors.text,
});

const StyledButton = styled(Button)({
  marginTop: "10px",
  backgroundColor: themeColors.primary,
  color: "#fff",
  "&:hover": {
    backgroundColor: themeColors.highlight,
  },
});

const OngoingPlan = () => {
  const [onGoingPlan, setOnGoingPlan] = useState({});
  const [vendorName, setVendorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [planId, setPlanId] = useState("");

  const { BASE_URL, customerId } = useAppState();

  const userId = customerId;

  const getCurrentPlan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/user/getCurrentPlanDetails/${userId}`
      );
      const currentPlan = response.data.currentPlan;
      setPlanId(currentPlan._id);
      setVendorName(response.data.vendorName);
      setOnGoingPlan(currentPlan);
      await getComments(currentPlan._id);
    } catch (error) {
      setError("Failed to fetch plan details");
      console.error("Error fetching plan details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getComments = async (planId) => {
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

  useEffect(() => {
    getCurrentPlan();
  }, [userId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const response = await axios.post(
        `${BASE_URL}/comment/addComment/${planId}`,
        {
          customerId: customerId,
          planId: planId,
          comment: newComment,
          rating: newRating,
        }
      );
      console.log(response.data);
      setComments((prevComments) => [
        ...prevComments,
        {
          comment: newComment,
          customerId: userId,
          date: new Date().toISOString(),
          rating: newRating,
        },
      ]);
      setNewComment("");
      setNewRating(0);
    }
  };

  const topComments = showAllComments ? comments : comments.slice(0, 3);

  if (loading) {
    return (
      <Container>
        <StyledBox>Loading...</StyledBox>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StyledBox>Error: {error}</StyledBox>
      </Container>
    );
  }

  return (
    <Container>
      <StyledBox>
        <Card>
          <CardHeader
            title={onGoingPlan.planName}
            titleTypographyProps={{ variant: "h5", color: themeColors.text }}
            sx={{ paddingBottom: "0" }}
          />
          <a
            href={onGoingPlan.menuImage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardMedia
              component="img"
              height="300"
              image={onGoingPlan.menuImage}
              alt="Menu"
            />
          </a>
          <CardContent>
            <DataRow>
              <StyledLabel>Description:</StyledLabel>
              <Typography>{onGoingPlan.description}</Typography>
            </DataRow>
            <DataRow>
              <StyledLabel>Duration:</StyledLabel>
              <Typography>{onGoingPlan.duration}</Typography>
            </DataRow>
            <DataRow>
              <StyledLabel>Offered By:</StyledLabel>
              <Typography>{vendorName || "Loading..."}</Typography>
            </DataRow>
            <DataRow>
              <StyledLabel>Plan Type:</StyledLabel>
              <Typography>{onGoingPlan.planType}</Typography>
            </DataRow>
            <DataRow>
              <StyledLabel>Price:</StyledLabel>
              <Typography>Rs: {onGoingPlan.price}</Typography>
            </DataRow>
          </CardContent>
        </Card>
        <CommentsSection>
          <Typography
            variant="h6"
            component="h2"
            color={themeColors.text}
            fontWeight="bold"
            mb={2}
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
                    <CommentHeader
                      title={`Comment #${index + 1}`}
                      subheader={
                        <CommentDate>
                          {new Date(comment.date).toLocaleDateString()}
                        </CommentDate>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1">{comment.comment}</Typography>
                      <Typography variant="body2" color={themeColors.text}>
                        Rating: {comment.rating}
                      </Typography>
                    </CardContent>
                  </CommentCard>
                </ListItem>
              ))
            )}
          </List>
          {comments.length > 3 && (
            <StyledButton
              variant="outlined"
              onClick={() => setShowAllComments((prev) => !prev)}
            >
              {showAllComments ? "Show Less" : "Show More"}
            </StyledButton>
          )}
          <Box mt={4}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box display="flex" alignItems="center" mb={2}>
              <Typography component="legend" color={themeColors.text}>
                Rating:
              </Typography>
              <Rating
                value={newRating}
                onChange={(e, newValue) => setNewRating(newValue)}
              />
            </Box>
            <StyledButton variant="contained" onClick={handleAddComment}>
              Add Comment
            </StyledButton>
          </Box>
        </CommentsSection>
      </StyledBox>
    </Container>
  );
};

export default OngoingPlan;
