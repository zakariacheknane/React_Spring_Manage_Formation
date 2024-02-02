import React, { useEffect, useState } from "react";
import axios from "axios";
import HorizontalCard from "../../components/HorizontalCard";
import IndividuForm from "../../components/IndividuForm";
import FormateurExternForm from "../../components/FormateurExternForm";
import {
  Dialog,
  DialogTitle,
  useTheme,
  DialogContent,
  Box,
  TextField,
  Pagination,
} from "@mui/material";
import { tokens } from "../../theme";
import form from "../../Assets/5293.png";

const Home = () => {
  const [formations, setFormations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalExtern, setOpenModalExtern] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    filterFormations();
  }, [cityFilter, dateFilter, categoryFilter]);

  const handleOpenModal = (formationId) => {
    setOpenModal(true);
    setSelectedFormationId(formationId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModalExtern = (formationId) => {
    setOpenModalExtern(true);
    setSelectedFormationId(formationId);
  };

  const handleCloseModalExtern = () => {
    setOpenModalExtern(false);
  };

  const handleFormSubmit = (values) => {
    console.log("Individual registered successfully:", values);
    axios
      .post(
        `http://localhost:8080/individu/registration/${selectedFormationId}`,
        values
      )
      .then((response) => {
        console.log("Individual registered successfully:", response.data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error registering individual:", error);
      });
  };

  const handleFormSubmitFormateur = (values) => {
    console.log("Formateur registered successfully:", values);
    axios
      .post(
        `http://localhost:8080/formateur/newFormateurExtern/${selectedFormationId}`,
        values
      )
      .then((response) => {
        console.log("Formateur registered successfully:", response.data);
        handleCloseModalExtern();
      })
      .catch((error) => {
        console.error("Error registering Formateur:", error);
      });
  };

  const filterFormations = () => {
    let apiUrl = "http://localhost:8080/formation/all";

    if (cityFilter)
      apiUrl = `http://localhost:8080/formation/findByCity/${cityFilter}`;
    if (dateFilter)
      apiUrl = `http://localhost:8080/formation/findByDate/${dateFilter}`;
    if (categoryFilter)
      apiUrl = `http://localhost:8080/formation/findByCategory/${categoryFilter}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setFormations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered formations:", error);
      });
  };

  const indexOfLastFormation = currentPage * itemsPerPage;
  const indexOfFirstFormation = indexOfLastFormation - itemsPerPage;
  const currentFormations = formations.slice(indexOfFirstFormation, indexOfLastFormation);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "1000px",
            marginTop: "1em",
            marginLeft: "5em",
            float: "left",
            color: "white",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          <p
            style={{
              fontSize: "38px",
              padding: "10px",
              boxShadow: "2px 2px 4px",
              borderRadius: "10px",
              width: "460px",
            }}
          >
            Discover, Learn & Improve{" "}
          </p>
          <p>
            You're in the right place, you can find below all the courses
            available to sign in now, reserve your seat !
          </p>
        </div>
        <div>
          <img
            alt="imageee"
            src={form}
            style={{ width: "300px", marginLeft: "150px", marginTop: "100px" }}
          />
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <TextField
            label="City"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            variant="outlined"
            style={{ margin: "8px" }}
          />
          <TextField
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            variant="outlined"
            style={{ margin: "8px", width: "200px" }} // Adjust the width as needed
          />
          <TextField
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            variant="outlined"
            style={{ margin: "8px" }}
          />

        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currentFormations.map((formation) => (
            <HorizontalCard
              key={formation.id}
              title={formation.name_formation}
              nbHours={formation.nb_hours}
              cost={formation.cost}
              objective={formation.objectif}
              city={formation.city}
              category={formation.category}
              onOpenModal={handleOpenModal}
              onOpenModalExtern={handleOpenModalExtern}
              formationId={formation.id}
            />
          ))}

          <Dialog open={openModalExtern} onClose={handleCloseModalExtern}>
            <DialogTitle
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "20px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Register As Formater
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
                <FormateurExternForm
                  onSubmit={handleFormSubmitFormateur}
                  onClick={handleCloseModalExtern}
                />
              </Box>
            </DialogContent>
          </Dialog>
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
          <Pagination
  count={Math.ceil(formations.length / itemsPerPage)}
  page={currentPage}
  onChange={handlePageChange}
  color="primary"
  sx={{
    '& .Mui-selected': {
      backgroundColor: colors.primary[200],
      color: '#ffffff',
    },
  }}
/>
</div>
        </div>
      </div>
    </>
  );
};

export default Home;
