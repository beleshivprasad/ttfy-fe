import React, { useState } from "react";
import * as yup from "yup";
import client from "../../services/axios";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Button,
  CardActions,
  Box,
  Typography,
  TextField,
} from "@mui/material";

import Main from "../../layouts/Main";
import Toast from "../../components/Toast";

yup.addMethod(yup.string, "isSame", function (msg) {
  return this.test("isSame", msg, function (value) {
    const password = this.parent.password;
    if (password) {
      if (value) return password === value;
      return false;
    }
    return true;
  });
});

const validationSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Weak Password")
    .required("Password is required"),
  confirmPassword: yup.string().isSame("Password doesn't match"),
});

const Register = () => {
  const navigate = useNavigate();

  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageType, setFlashMessageType] = useState("info");
  const [errors, setErrors] = useState([]);

  function displayFlashMessage(msg, type, errors = []) {
    const allowedFlashTypes = ["success", "info", "error", "warning"];
    if (!allowedFlashTypes.includes(type))
      throw new Error("Invalid flash message type, allowed", allowedFlashTypes);

    setFlashMessage(msg);
    setFlashMessageType(type);
    setErrors(errors);
    setShowFlashMessage(true);

    setTimeout(() => {
      setShowFlashMessage(false);
      setFlashMessage("");
      setFlashMessageType("info");
      setErrors([]);
    }, 4000);
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (formData) => {
      const res = await client.post("/user/register", formData);
      if (res.success) {
        displayFlashMessage(res.message, "success");
      } else {
        displayFlashMessage(res.message, "error", res.errors);
      }
    },
  });

  return (
    <Main>
      <Toast
        showFlashMessage={showFlashMessage}
        setShowFlashMessage={setShowFlashMessage}
        errors={errors}
        flashMessage={flashMessage}
        flashMessageType={flashMessageType}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ minWidth: "400px", width: "30%", padding: 3 }}>
          <Typography
            fontSize={"30px"}
            fontWeight={"semibold"}
            marginBottom={2}
            color="primary"
          >
            Register
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              required
              name="first_name"
              label="First Name"
              variant="standard"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
              fullWidth
              required
              name="last_name"
              label="Last Name"
              variant="standard"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
            <TextField
              fullWidth
              required
              name="email"
              helperText={
                (formik.touched.email && formik.errors.email) ||
                "We'll never share your password"
              }
              label="Email"
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <TextField
              fullWidth
              required
              name="password"
              label="Password"
              variant="standard"
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
              variant="standard"
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
          <CardActions
            sx={{
              marginTop: 4,
              display: "flex",
              justifyContent: "space-between",
              padding: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography>Already registered?</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
            <Button
              onClick={formik.handleSubmit}
              size="small"
              variant="outlined"
            >
              Register
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Main>
  );
};

export default Register;
