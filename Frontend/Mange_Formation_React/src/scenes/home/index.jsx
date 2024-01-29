import React, { useEffect, useState } from 'react';
import axios from 'axios'; // You may need to install axios
import HorizontalCard from '../../components/HorizontalCard';

const Home = () => {
  const [formateurs, setFormateurs] = useState([]);

  useEffect(() => {
    // Make the API call when the component mounts
    axios.get('http://localhost:8080/formation/all')
      .then(response => {
        setFormateurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching formateurs:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {formateurs.map(formateur => (
        <HorizontalCard
          key={formateur.id} 
          title={formateur.name_formation}
          nbHours={formateur.nb_hours}
          cost={formateur.cost}
          objective={formateur.objectif}
          city={formateur.city}
          category={formateur.category}
        />
      ))}
    </div>
  );
};

export default Home;
