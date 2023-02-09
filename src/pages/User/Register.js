import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegisterValidationSchema } from "../../plugins/yup";
import { useFormik } from "formik";
import { registerUser } from "../../redux/actions/userActions";

import { Card, Button, Box, Typography, TextField } from "@mui/material";
import Main from "../../layouts/Main";
import Toast from "../../components/Toast";

const Register = () => {
  // HooksuseFormik
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Flash Message State
  const flash = useSelector((state) => state.flash);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoggedIn) navigate("/");
  }, [navigate, user.isLoggedIn]);

  const formikSubmitHandler = (user) => {
    const requestData = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.email,
    };

    dispatch(registerUser(requestData));
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userRegisterValidationSchema,
    onSubmit: formikSubmitHandler,
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
            gap: 2,
          }}
        >
          <Typography
            fontSize={"30px"}
            fontWeight={"semibold"}
            textAlign={"center"}
            color="primary"
            marginBottom={3}
          >
            Sign Up
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              required
              name="firstName"
              label="First Name"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              required
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              required
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
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
            />
            <TextField
              fullWidth
              required
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type={"password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{ margin: 0, padding: 0 }}
                color={"black"}
                fontSize={"13px"}
                component={Button}
              >
                Already have account?
              </Typography>

              <Button
                sx={{ margin: 0, padding: 0 }}
                size="small"
                type="text"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </Main>
  );
};

export default Register;
