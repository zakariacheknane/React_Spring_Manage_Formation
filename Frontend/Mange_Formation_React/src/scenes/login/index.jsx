import React from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  ThemeProvider,
  createTheme,
  Stack,
} from "@mui/material";
import Sousbg from "../../Assets/sousbg.png";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../Auth/auth.action";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "75%",
  height: "70%",
  backgroundColor: "#ffffff",
  boxShadow: 24,
};

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
  const handleSubmit = (values) => {
    dispatch(loginUserAction({ data: values }));
    navigate("/*");
  };

  

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${Sousbg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  minHeight: "510px",
                  height: "63vh",
                  backgroundColor: "#3b33d5",
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
                            name="username"  // Fix: Change "username" to "email"
                            placeholder="Email *"
                            type="email"
                            variant="outlined"
                          />
                          <ErrorMessage
                            name="username"
                            component={"div"}
                            className="text-red-500"
                            style={{
                            color:"#ff0000"
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
                              color:"#ff0000"
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
