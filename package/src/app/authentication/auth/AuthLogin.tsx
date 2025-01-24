import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Alert,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useAppDispatch } from "@/app/redux/store";
import { login } from "@/app/redux/Auth/authSlice";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const dispatch = useAppDispatch(); 
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({ usernameOrEmail: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    let valid = true;
    const newErrors = { usernameOrEmail: "", password: "" };

    if (!credentials.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Email or Username is required.";
      valid = false;
    }
    if (!credentials.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    const resultAction = await dispatch(login(credentials));
    if (login.fulfilled.match(resultAction)) {
      window.location.href = "/"; 
    } else {
      setLoginError("Login failed. Please check your credentials."); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack spacing={2}>
        {loginError && <Alert severity="error">{loginError}</Alert>}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="usernameOrEmail"
            mb="5px"
          >
            Username or Email
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            name="usernameOrEmail"
            value={credentials.usernameOrEmail}
            onChange={handleChange}
            error={!!errors.usernameOrEmail}
            helperText={errors.usernameOrEmail} 
          />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={credentials.password}
            onChange={handleChange}
            error={!!errors.password} 
            helperText={errors.password}
          />
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>

        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </Stack>

      {subtitle}
    </>
  );
};

export default AuthLogin;
