import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function VendorDisplayCard({
  businessName,
  businessAddress,
  ListOfPlansOffered,
  ListOfCustomers,
  businessPhone,
  registeredOn,
  imageOfMess,
}) {
  const navigate = useNavigate();

  const { city, location } = businessAddress;

  function openGoogleMapsAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps?q=${encodedAddress}`;
    window.open(url, "_blank");
  }

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mt: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: getRandomColor() }}
            aria-label="initials of the business name"
          >
            {businessName[0].toUpperCase()}
          </Avatar>
        }
        title={businessName}
        subheader={`Since ${registeredOn}`}
      />
      <CardMedia component="img" height="194" src={imageOfMess} />
      <CardContent sx={{ backgroundColor: "#f9f9f9" }}>
        <Typography variant="body1" color="textPrimary">
          {`City is : ${city}.`}
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {`The location : ${location}`}
        </Typography>
        <Typography variant="body1" color="textPrimary">
          {`Phone: ${businessPhone}`}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          margin: "0 5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="medium"
          variant="contained"
          style={{
            backgroundColor: "#cf711f",
          }}
          color="primary"
          onClick={() =>
            navigate("/plansOffered", { state: { ListOfPlansOffered } })
          }
        >
          Surf Plans
        </Button>
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          style={{
            color: "black",
            border: "1px solid black",
          }}
          onClick={() => openGoogleMapsAddress(location + " " + city)}
        >
          Locate Us
        </Button>
      </CardActions>
    </Card>
  );
}
