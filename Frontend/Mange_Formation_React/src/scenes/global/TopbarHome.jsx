import React from "react";
import { Box, Button, IconButton,  useTheme } from "@mui/material";
import {  tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const TopbarHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const handleFormationClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        borderRadius="3px"
      >
         <IconButton onClick={handleFormationClick}
         sx={{ fontSize: "2rem", padding: "8px" }} >
          Formation
        </IconButton>
      </Box>
      <Box display="flex">
      <Button
          variant="contained"
          color="primary"
          
          style={{
            fontSize: "1.2rem",
            padding: "8px",
            borderRadius: "20px",
            marginRight: "20px",
            width:"100px",
            backgroundColor:colors.primary[400],
          }}
          onClick={handleLoginClick}
        >
          Login
        </Button>
       </Box>
   
    </Box>
  );
};

export default TopbarHome;
