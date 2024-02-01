import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Box,
  TextField,
  Button,
  useMediaQuery,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";

const PlanificationForm = ({ onSubmit, onClick, initialValues, updateOrcreate }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = localStorage.getItem("token");
  const [formations, setFormations] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formationsResponse = await axios.get("http://localhost:8080/formation/all");
        const formateursResponse = await axios.get("http://localhost:8080/formateur/all",{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json',
          },
        });
        const entreprisesResponse = await axios.get("http://localhost:8080/enterprise/all",{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json',
          },
        });
        setFormations(formationsResponse.data);
        setFormateurs(formateursResponse.data);
        setEntreprises(entreprisesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      if (selectedFormationId) {
        try {
          const teamsResponse = await axios.get(`http://localhost:8080/team/findbyFormation/${selectedFormationId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type':'application/json',
            },
          });
          setTeams(teamsResponse.data);
        } catch (error) {
          console.error("Error fetching teams:", error);
        }
      }
    };

    fetchTeams();
  }, [selectedFormationId]);


  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        startDate: "",
        endDate: "",
        formation_id: "",
        formateur_id: "",
        Entreprise_id: null,
        Team_id: null,
        ...initialValues,
      }}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Start Date"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.startDate}
              name="startDate"
              error={!!touched.startDate && !!errors.startDate}
              helperText={touched.startDate && errors.startDate}
              sx={{ gridColumn: "span 4 " }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="date"
              label="End Date"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.endDate}
              name="endDate"
              error={!!touched.endDate && !!errors.endDate}
              helperText={touched.endDate && errors.endDate}
              sx={{ gridColumn: "span 4" }}
            />

            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
              <InputLabel htmlFor="formation_id">Formation</InputLabel>
              <Select
                label="Formation"
                name="formation_id"
                value={values.formation_id}
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  setSelectedFormationId(event.target.value); // Update selectedFormationId
                }}
              >
                {formations.map((formation) => (
                  <MenuItem key={formation.id} value={formation.id}>
                    {formation.name_formation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
              <InputLabel htmlFor="formateur_id">Formateur</InputLabel>
              <Select
                label="Formateur"
                name="formateur_id"
                value={values.formateur_id}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {formateurs.map((formateur) => (
                  <MenuItem key={formateur.id} value={formateur.id}>
                    {`${formateur.firstname} ${formateur.lastname}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
              <InputLabel htmlFor="Entreprise_id">Entreprise</InputLabel>
              <Select
                label="Entreprise"
                name="Entreprise_id"
                value={values.Entreprise_id}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {entreprises.map((entreprise) => (
                  <MenuItem key={entreprise.id} value={entreprise.id}>
                    {entreprise.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
              <InputLabel htmlFor="Team_id">Team</InputLabel>
              <Select
                label="Team"
                name="Team_id"
                value={values.Team_id}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              {updateOrcreate} Planification
            </Button>
            <Box ml={2}>
              <Button onClick={onClick} color="secondary" variant="contained">
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PlanificationForm;
