import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import HorizontalCard from '../../components/HorizontalCard';
import IndividuForm from '../../components/IndividuForm';
import { Dialog, DialogTitle, useTheme, DialogContent, Box, TextField, Button } from '@mui/material';
import { tokens } from "../../theme";

const Home = () => {
  const [formations, setFormations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [cityFilter, setCityFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Make the API call when the component mounts
    filterFormations();
  }, [cityFilter, dateFilter, categoryFilter]); // Trigger the API call when filters change

  const handleOpenModal = (formationId) => {
    setOpenModal(true);
    setSelectedFormationId(formationId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = (values) => {
    console.log('Individual registered successfully:', values);
    axios.post(`http://localhost:8080/individu/registration/${selectedFormationId}`, values)
      .then(response => {
        console.log('Individual registered successfully:', response.data);
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error registering individual:', error);
      });
  };

  const filterFormations = () => {
    // Implement filtering logic based on cityFilter, dateFilter, and categoryFilter
    // Update the API call URLs accordingly
    let apiUrl = 'http://localhost:8080/formation/all';

    if (cityFilter) apiUrl = `http://localhost:8080/formation/findByCity/${cityFilter}`;
    if (dateFilter) apiUrl = `http://localhost:8080/formation/findByDate/${dateFilter}`;
    if (categoryFilter) apiUrl = `http://localhost:8080/formation/findByCategory/${categoryFilter}`;

    axios.get(apiUrl)
      .then(response => {
        setFormations(response.data);
      })
      .catch(error => {
        console.error('Error fetching filtered formations:', error);
      });
  };

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
      <TextField
        label="City"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        variant="outlined"
        style={{ margin: '8px' }}
      />
      <TextField
        label="Date"
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        variant="outlined"
        style={{ margin: '8px' }}
      />
      <TextField
        label="Category"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        variant="outlined"
        style={{ margin: '8px' }}
      />
      <Button variant="outlined" color="primary" onClick={filterFormations} style={{ margin: '8px' }}>
        Apply Filters
      </Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {formations.map(formation => (
        <HorizontalCard
          key={formation.id} 
          title={formation.name_formation}
          nbHours={formation.nb_hours}
          cost={formation.cost}
          objective={formation.objectif}
          city={formation.city}
          category={formation.category}
          onOpenModal={handleOpenModal}
          formationId={formation.id}
        />
      ))}
 
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "20px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Register As Individu 
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <Box m="20px">
            <IndividuForm
              onSubmit={handleFormSubmit}
              onClick={handleCloseModal}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default Home;
