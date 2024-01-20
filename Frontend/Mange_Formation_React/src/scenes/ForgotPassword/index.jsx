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
import {useNavigate } from "react-router-dom";
const darkTheme =createTheme({
    palette:{
      mode:"dark"  
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
};
export const ForgotPassword = () => {
    const navigate=useNavigate();
  return (
    <>
      <div
        style={{
          backgroundColor: "#ffffff",
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
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
                <ThemeProvider theme={darkTheme}>
                <Container>
                  <Box height={35} />
                  <Box sx={center}>
                    <Avatar
                      sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}>
                      </Avatar>
                    <Typography component="h1" variant="h4"
                     style={{  marginLeft: "40px",}} >
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
                        label="Username"
                        name="username"
                        autoComplete="username"
                      />
                    </Grid>
                    
               
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Button
                        type="submit"
                        variant="contained"
                        fullWidth="true"
                        size="large"
                        sx={{mt:"10px",
                    mr:"20px",
                    borderRadius:28,
                    color:"#ffffff",
                    minWidth:"170px",
                    backgroundColor:"#37C1DB"
                }}>SEND RESET LINK </Button>
                </Grid>
                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <Stack direction="row" spacing={2}>
                        <Typography
                         component="span" 
                         variant="body1"
                         style={{marginTop:"10px"}}
                        >
                         Login to your Account. {" "}
                         <span 
                         style={{color:"#beb4fb",cursor:"pointer"}}
                         onClick={()=>{
                            navigate("/login");
                         }}
                         >Sign In</span>
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
      </div>
    </>
  );
};

export default ForgotPassword;

