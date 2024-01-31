// HorizontalCard.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography,Button,useTheme } from '@mui/material';
import { tokens } from '../theme';
import WEB_DEVELOPMENT from '../Assets/WEB_DEVELOPMENT.png';
import Machine_Learning from'../Assets/Machine_Learning.jpg';
import Formation from '../Assets/formation.png'
const getImageBasedOnCategory = (category) => {
  if (category) {
    // Add your logic to map categories to specific images
    switch (category.toLowerCase()) {
      case 'web_development':
        return WEB_DEVELOPMENT;
      case 'machine_learning':
        return Machine_Learning;
      // Add more cases for other categories as needed
      default:
             return Formation;
    }
  }
  return ''; // Default image for undefined category
};

const HorizontalCard = ({ title, nbHours, cost, objective, city, category,onOpenModal,formationId ,onOpenModalExtern }) => {
  const imageUrl = getImageBasedOnCategory(category);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleRegisterClick = () => {
    onOpenModal(formationId);
  };
  const handleRegisterFormateurClick = () => {
    onOpenModalExtern(formationId);
  };
  return (
    <Card  style={{ backgroundColor: "#fcfcfc",display: 'flex', flexDirection: 'row', marginBottom: '16px' , width: '40%' , direction: 'row',marginLeft: '100px'}}>
      <CardMedia
        component="img"
        sx={{ width: 220, objectFit: 'cover'}}
        alt="Card Image"
        height="100%"
        image={imageUrl}
      />
      <CardContent>
        <Typography variant="h4" color={colors.grey[800]} align="center">{title}</Typography>
        <Typography variant="body2" color={colors.grey[500]}>
          <strong>Duration:</strong> {nbHours} hours
        </Typography>
        <Typography variant="body2" color={colors.grey[500]}>
          <strong>Cost:</strong> ${cost}
        </Typography>
        <Typography variant="body2" color={colors.grey[500]}>
          <strong>Objective:</strong> {objective}
        </Typography>
        <Typography variant="body2" color={colors.grey[500]}>
          <strong>City:</strong> {city}
        </Typography>
        <Typography variant="body2" color={colors.grey[500]}>
          <strong>Category:</strong> {category}
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleRegisterClick}   style={{ marginTop: theme.spacing(2), marginRight: theme.spacing(1) }} >
        Enroll as Individu
        </Button>
        <Button variant="outlined" color="primary" onClick={handleRegisterFormateurClick} style={{ marginTop: theme.spacing(2)}}>
          Enroll as Formater
        </Button>
      </CardContent>
    </Card>
  );
};

export default HorizontalCard;
