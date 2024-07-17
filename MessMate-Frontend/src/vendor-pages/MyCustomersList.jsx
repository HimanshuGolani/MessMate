import React, { useEffect, useState } from "react";
import { useAppState } from "../Context/AppState";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";

export default function MyCustomersList() {
  const { BASE_URL, vendorId } = useAppState();
  const [customerList, setCustomerList] = useState([]);

  console.log("====================================");
  console.log(vendorId);
  console.log("====================================");

  const getListOfCustomers = async () => {
    console.log("====================================");
    console.log("triggered the request", vendorId);
    console.log("====================================");
    const response = await axios.get(
      `${BASE_URL}/vender/getListOfCustomers/${vendorId}`
    );
    const { ListOfCustomers } = response.data;
    console.log(response.data);
    setCustomerList(ListOfCustomers);
  };

  useEffect(() => {
    getListOfCustomers();
  }, []);

  return (
    <Box
      sx={{ backgroundColor: "#fae5d3", minHeight: "100vh", padding: "2rem" }}
    >
      <Container>
        {customerList && customerList.length > 0 ? (
          customerList.map((item, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 600,
                margin: "2rem auto",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              variant="outlined"
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {`Customer Name: ${item.fullName}`}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {`Address: ${item.address.location}, City: ${item.address.city}`}
                </Typography>
                <Typography variant="body1">{`Plan: ${item.plan}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{
                    color: "#fff",
                    backgroundColor: "#cf711f",
                    fontSize: "1rem",
                    fontWeight: "600",
                    padding: "0.8rem 1.6rem",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#b85e1b",
                    },
                  }}
                >
                  Click me
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h4" color="text.primary">
              No Customers have purchased any plans yet.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
