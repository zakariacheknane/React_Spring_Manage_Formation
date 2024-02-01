import React, { useState } from "react";
import { Grid, Box, Button, TextField, Typography, Container, Avatar, ThemeProvider, createTheme, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Sousbg from "../../Assets/sousbg.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
});

const center = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSendResetLink = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/sendPasswordResetEmail/${email}`);
      const resetLink = await response.text();
      console.log('Reset Link:', resetLink);
      navigate(`/login`);
    } catch (error) {
      console.error('Error sending reset link:', error);
    }
  };

  return (
    <>
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
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}>
                      </Avatar>
                      <Typography component="h1" variant="h4"
                        style={{ marginLeft: "40px", }} >
                        Reset Password
                      </Typography>
                    </Box>
                    <Box height={35} />
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label="Email"
                          name="email"
                          autoComplete="username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth="true"
                          size="large"
                          sx={{
                            mt: "10px",
                            mr: "20px",
                            borderRadius: 28,
                            color: "#ffffff",
                            minWidth: "170px",
                            backgroundColor: "#37C1DB"
                          }}
                          onClick={handleSendResetLink}
                        >
                          SEND RESET LINK
                        </Button>
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            component="span"
                            variant="body1"
                            style={{ marginTop: "10px" }}
                          >
                            Login to your Account.{" "}
                            <span
                              style={{ color: "#beb4fb", cursor: "pointer" }}
                              onClick={() => {
                                navigate("/login");
                              }}
                            >
                              Sign In
                            </span>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ForgotPassword;
