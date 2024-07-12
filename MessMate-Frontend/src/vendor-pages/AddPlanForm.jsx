import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

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

const StyledButton = styled(Button)({
  backgroundColor: themeColors.primary,
  color: themeColors.background,
  "&:hover": {
    backgroundColor: themeColors.highlight,
  },
});

export default function AddPlanForm() {
  return (
    <Container>
      <StyledCard>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: themeColors.primary }}>P</Avatar>}
          title="Plan Details"
        />
        <CardContent>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Plan Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Menu Image URL"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="plan-type-label">Plan Type</InputLabel>
                  <Select labelId="plan-type-label" label="Plan Type">
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Duration"
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions>
          <StyledButton size="large">Submit</StyledButton>
        </CardActions>
      </StyledCard>
    </Container>
  );
}
