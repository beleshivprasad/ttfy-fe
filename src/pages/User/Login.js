import React, { useState } from "react";

import {
  Card,
  Button,
  CardActions,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import Main from "../../layouts/Main";
import Toast from "../../components/Toast";

import client from "../../services/axios";

import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";

const validationSchema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Weak password")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageType, setFlashMessageType] = useState("info");
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [errors, setErrors] = useState([]);

  function displayFlashMessage(msg, type, errors = []) {
    const allowedFlashTypes = ["success", "info", "error", "warning"];
    if (!allowedFlashTypes.includes(type))
      throw new Error("Invalid flash message type, allowed", allowedFlashTypes);

    setFlashMessage(msg);
    setFlashMessageType(type);
    setErrors(errors);
    setShowFlashMessage(true);
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (formData) => {
      const res = await client.post("/user/login", formData);
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
        flashMessageType={flashMessageType}
        flashMessage={flashMessage}
        errors={errors}
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
            marginBottom={4}
            color="primary"
          >
            Login
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
              variant="standard"
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
              <Typography>New user?</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Box>
            <Button
              onClick={formik.handleSubmit}
              size="small"
              variant="outlined"
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Main>
  );
};

export default Login;
