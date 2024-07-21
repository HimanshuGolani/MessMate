import React, { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase.js";
import { toast, ToastContainer } from "react-toastify";
import { useAppState } from "../Context/AppState";
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
  const { BASE_URL, userId, vendorId } = useAppState();

  console.log(userId);

  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    planName: "",
    description: "",
    planType: "",
    price: "",
    duration: "",
  });
  const [formErrors, setFormErrors] = useState({
    planName: "",
    description: "",
    planType: "",
    price: "",
    duration: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLoading(true);
      const storageRef = ref(storage, `menu_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          toast.error("Failed to upload image.");
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            setLoading(false);
            toast.success("Image uploaded successfully!");
          });
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formValues.planName) errors.planName = "Plan name is required.";
    if (!formValues.description)
      errors.description = "Description is required.";
    if (!formValues.planType) errors.planType = "Plan type is required.";
    if (!formValues.price) errors.price = "Price is required.";
    if (!formValues.duration) errors.duration = "Duration is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      console.log("Form submitted:", formValues, imgUrl);
      console.log(`${BASE_URL}/vender/addPlan/${vendorId}`);
      const response = await axios.post(
        `${BASE_URL}/vender/addPlan/${vendorId}`,
        {
          planName: formValues.planName,
          description: formValues.description,
          menuImage: imgUrl,
          planType: formValues.planType,
          price: formValues.price,
          duration: formValues.duration,
        }
      );
      console.log(response.data);
      toast.success("The plan is added.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onClose: () => navigate("/vender/myPlans"),
      });
    } catch (error) {
      toast.error("Error submitting the form.");
      console.error(error);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <StyledCard>
        <CardHeader title="Plan Details" />
        <CardContent>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Plan Name"
                  variant="outlined"
                  name="planName"
                  value={formValues.planName}
                  onChange={handleInputChange}
                  error={!!formErrors.planName}
                  helperText={formErrors.planName}
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
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <div className="input-field">
                  <label className="input-label" htmlFor="imageOfMess">
                    Upload an Image of Your Business
                  </label>
                  <input
                    id="imageOfMess"
                    name="imageOfMess"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input-box"
                  />
                  {loading && <CircularProgress />}
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.planType}>
                  <InputLabel id="plan-type-label">Plan Type</InputLabel>
                  <Select
                    labelId="plan-type-label"
                    label="Plan Type"
                    name="planType"
                    value={formValues.planType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                  </Select>
                  {formErrors.planType && (
                    <Typography variant="caption" color="error">
                      {formErrors.planType}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Duration"
                  variant="outlined"
                  name="duration"
                  value={formValues.duration}
                  onChange={handleInputChange}
                  error={!!formErrors.duration}
                  helperText={formErrors.duration}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions>
          <StyledButton size="large" onClick={handleSubmit}>
            Submit
          </StyledButton>
        </CardActions>
      </StyledCard>
    </Container>
  );
}
