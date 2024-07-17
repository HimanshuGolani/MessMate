import React, { useEffect, useState } from "react";
import { useAppState } from "../Context/AppState";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";

const themeColors = {
  primary: "#e67e22",
  secondary: "#fae5d3",
  text: "#333",
  background: "#fff",
  boxBackground: "#fafafa",
};

export default function MyCustomersList() {
  const { BASE_URL, vendorId } = useAppState();
  const [customerList, setCustomerList] = useState([]);

  const getListOfCustomers = async () => {
    const response = await axios.get(
      `${BASE_URL}/vender/getListOfCustomers/${vendorId}`
    );
    const { ListOfCustomers } = response.data;

    setCustomerList(ListOfCustomers);
  };

  useEffect(() => {
    getListOfCustomers();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: themeColors.secondary,
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Container>
        {customerList && customerList.length > 0 ? (
          <Grid container spacing={4}>
            {customerList.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: themeColors.background,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {`${index + 1}. ${item.fullName}`}
                    </Typography>
                    <Typography variant="h6" color={themeColors.text}>
                      {`Address: ${item.address}`}
                    </Typography>
                    {/* <Typography variant="body1" color={themeColors.text} mt={2}>
                      {`Plan: ${"Plan name"}`}
                    </Typography> */}
                    <Typography variant="body1" color={themeColors.text} mt={1}>
                      {`Start Date: ${new Date(
                        item.Current_Plan.startingDate
                      ).toLocaleDateString()}`}
                    </Typography>
                    <Typography variant="body1" color={themeColors.text} mt={1}>
                      {`End Date: ${new Date(
                        item.Current_Plan.validTill
                      ).toLocaleDateString()}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h4" color={themeColors.text}>
              No Customers have purchased any plans yet.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
