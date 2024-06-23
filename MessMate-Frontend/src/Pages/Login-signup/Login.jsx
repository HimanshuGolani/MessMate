import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Input,
  InputLabel,
  Typography,
  Avatar,
  Link,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Avatar sx={{ bgcolor: "red" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Welcome
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlinedIcon color="action" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowClick}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            New to us?{" "}
            <Link href="/signup" underline="always">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
