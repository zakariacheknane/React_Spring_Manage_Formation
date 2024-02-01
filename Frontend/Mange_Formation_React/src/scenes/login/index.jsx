import React, { useState } from "react";
import { Grid, Box, Button, TextField, Typography, Container, Avatar, ThemeProvider, createTheme, Stack } from "@mui/material";
import Sousbg from "../../Assets/sousbg.png";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../Auth/auth.action";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { LOGIN_FAILURE, LOGIN_REQUEST } from "../../Auth/auth.actionType";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object({
  username: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Use useSelector to access the erreur property from the Redux state
  const error = useSelector((state) => state.auth.erreur);

  const handleSubmit = async (values) => {
    try {
      // Clear previous error on each submit
      dispatch({ type: LOGIN_REQUEST }); // Assuming you dispatch LOGIN_REQUEST at the start of the login process

      dispatch(loginUserAction({ data: values }));
      navigate("/Dashboard");
    } catch (error) {
      // Set the error state if an error occurs during login
      dispatch({ type: LOGIN_FAILURE, payload: error.message || "An error occurred" });
    }
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "75%",
            height: "70%",
            backgroundColor: colors.primary[500],
            boxShadow: 24,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${Sousbg})`,
                  backgroundSize: "cover",
                  marginLeft: "15px",
                  height: "100%",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  minHeight: "510px",
                  height: "100%",
                  backgroundColor: colors.primary[500],
                }}
              >
                <Container>
                  <Box height={35} />
                  <Box sx={center}>
                    <Avatar
                      sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                    />
                    <Typography component="h1" variant="h4">
                      Sign In
                    </Typography>
                  </Box>

                  <Box height={35} />
                
                  {error && (
  <Typography
    variant="body1"
    color="error"
    sx={{ ml: "3em", mr: "3em" }}
  >
    {typeof error.message === 'string' ? error.message : "Invalid Email or Password"}
  </Typography>
)}
                  <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                  >
                    <Form>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="username" // Fix: Change "username" to "email"
                            placeholder="Email *"
                            type="email"
                            variant="outlined"
                          />
                          <ErrorMessage
                            name="username"
                            component={"div"}
                            className="text-red-500"
                            style={{
                              color: "#ff0000",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="password"
                            placeholder="Password *"
                            type="password"
                            variant="outlined"
                          />
                          <ErrorMessage
                            name="password"
                            component={"div"}
                            className="text-red-500"
                            style={{
                              color: "#ff0000",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              component="span"
                              variant="body1"
                              onClick={() => {
                                navigate("/reset-password");
                              }}
                              style={{ marginTop: "10px", cursor: "pointer" }}
                            >
                              Forgot password ?
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#37C1DB",
                            }}
                          >
                            Sign in
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  </Formik>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Login;
