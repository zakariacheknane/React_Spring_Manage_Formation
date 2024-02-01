import React, { useEffect, useState } from "react";
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
import {useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Sousbg from "../../Assets/sousbg.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [idUser, setidUser] = useState("");
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("iduser");
    setidUser(userId|| "");
  }, [location.search]);

  const handleChangePassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await fetch(`http://localhost:8080/users/updatePassword/${idUser}/${password}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Password updated successfully");
        navigate("/login");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to update password");
      }
    } catch (error) {
        setError("Error updating password");
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
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      ></Avatar>
                      <Typography
                        component="h1"
                        variant="h4"
                        style={{ marginLeft: "40px" }}
                      >
                        Change Your Password
                      </Typography>
                    </Box>
                    <Box height={35} />
                    <Grid container spacing={1}>
                      
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          type="password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                          {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
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
                            backgroundColor: "#37C1DB",
                          }}
                          onClick={handleChangePassword}
                        >
                          CHANGE PASSWORD
                        </Button>
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            component="span"
                            variant="body1"
                            style={{ marginTop: "10px" }}
                          >
                            Back to{" "}
                            <span
                              style={{ color: "#beb4fb", cursor: "pointer" }}
                              onClick={() => {
                                navigate("/login");
                              }}
                            >
                              Login
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

export default ChangePassword;
