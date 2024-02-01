import React from "react";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TopbarLogin= () => {
  const navigate = useNavigate();
  const handleFormationClick = () => {
    navigate("/");
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
     
   
    </Box>
  );
};

export default TopbarLogin;
