import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const themeColors = {
  primary: "#e67e22",
  secondary: "#fae5d3",
  text: "#333",
  highlight: "#e67e22",
  background: "#fff",
  boxBackground: "#fafafa",
};

const StyledCard = styled(Card)({
  backgroundColor: themeColors.boxBackground,
  color: themeColors.text,
  maxWidth: 345,
  margin: "20px auto",
});

// displays the plas offered by a vendor
export default function PlanCard({
  planName,
  description,
  menuImage,
  planType,
  duration,
  price,
  planId,
}) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/plansDetails/${planId}`, {
      state: { planName, description, duration, menuImage, price, planId },
    });
  };

  console.log("====================================");
  console.log("The planId is ", planId);
  console.log("====================================");

  return (
    <StyledCard>
      <CardHeader title={`The plan Name is : ${planName}`} />
      <CardMedia
        component="img"
        height="140"
        image={menuImage}
        alt="Menu image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`The description of the plan is : ${description}`}
        </Typography>
        <Typography variant="h6" component="p" color={themeColors.text}>
          The plan type is:{" "}
          {planType === "Both" ? "Lunch and Dinner" : planType}
        </Typography>
        <Typography variant="h6" component="p" color={themeColors.text}>
          The price is Rs: {price}
        </Typography>
      </CardContent>
      <Box textAlign="center" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDetailsClick}
        >
          View Details
        </Button>
      </Box>
    </StyledCard>
  );
}
