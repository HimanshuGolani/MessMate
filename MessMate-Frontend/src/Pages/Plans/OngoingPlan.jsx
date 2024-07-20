import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Box,
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
});

const StyledLabel = styled(Typography)({
  fontWeight: "bold",
  marginRight: "8px",
});

const DataRow = styled(Box)({
  display: "flex",
  marginBottom: "8px",
  alignItems: "center",
});

const OngoingPlan = () => {
  const [onGoingPlan, setOnGoingPlan] = useState({});
  const [vendorName, setVendorName] = useState("");

  const { BASE_URL, customerId } = useAppState();

  const userId = customerId;

  const getCurrentPlan = async () => {
    const response = await axios.get(
      `${BASE_URL}/user/getCurrentPlanDetails/${userId}`
    );

    setVendorName(response.data.vendorName);
    setOnGoingPlan(response.data.currentPlan);
  };

  useEffect(() => {
    getCurrentPlan();
  }, []);

  return (
    <Container>
      <StyledBox>
        <Card>
          <CardHeader
            title={onGoingPlan.planName}
            titleTypographyProps={{ variant: "h5", color: themeColors.text }}
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
              <Typography>{vendorName ? vendorName : "Loading.."}</Typography>
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
      </StyledBox>
    </Container>
  );
};

export default OngoingPlan;
