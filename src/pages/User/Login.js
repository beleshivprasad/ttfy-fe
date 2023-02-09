import React, { useEffect } from "react";

import { Card, Button, Box, Typography, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";

import Main from "../../layouts/Main";
import Toast from "../../components/Toast";

import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

const validationSchema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Weak password")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const flash = useSelector((state) => state.flash);

  useEffect(() => {
    if (user.isLoggedIn) navigate("/");
  }, [navigate, user.isLoggedIn]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (user) => dispatch(loginUser(user)),
  });

  return (
    <Main
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Toast
        showMessage={flash.showMessage}
        messageType={flash.messageType}
        message={flash.message}
        errors={flash.errors}
        hideAfter={flash.hideAfter}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            minWidth: "400px",
            width: "30%",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            fontSize={"30px"}
            fontWeight={"semibold"}
            textAlign={"center"}
            color="primary"
            marginBottom={4}
          >
            Login
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField
              fullWidth
              required
              name="email"
              helperText={
                (formik.touched.email && formik.errors.email) ||
                "We'll never share your password"
              }
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              name="password"
              label="Password"
              variant="outlined"
              type={"password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              fullWidth={true}
              onClick={formik.handleSubmit}
              size="large"
              variant="contained"
            >
              Submit
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button size="small" type="text">
                Forgot password
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ margin: 0, padding: 0 }}
                  color={"black"}
                  fontSize={"13px"}
                  component={Button}
                >
                  New User?
                </Typography>

                <Button
                  sx={{ margin: 0, padding: 0 }}
                  size="small"
                  type="text"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Main>
  );
};

export default Login;
