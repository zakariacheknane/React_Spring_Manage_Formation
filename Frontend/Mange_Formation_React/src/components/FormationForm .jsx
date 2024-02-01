import React from "react";
import { Formik } from "formik";
import { Box, TextField, Button, useMediaQuery } from "@mui/material";

const FormationForm = ({
  onSubmit,
  onClick,
  initialValues,
  updateOrcreate,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        name_formation: "",
        nb_hours: "",
        cost: "",
        objectif: "",
        programme: "",
        city: "",
        category: "",
        team_seuil: "",
        ...initialValues,
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
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
              type="text"
              label="Formation Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name_formation}
              name="name_formation"
              error={!!touched.name_formation && !!errors.name_formation}
              helperText={touched.name_formation && errors.name_formation}
              sx={{ gridColumn: "span 4 " }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Objectif"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.objectif}
              name="objectif"
              error={!!touched.objectif && !!errors.objectif}
              helperText={touched.objectif && errors.objectif}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Programme"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.programme}
              name="programme"
              error={!!touched.programme && !!errors.programme}
              helperText={touched.programme && errors.programme}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Category"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.category}
              name="category"
              error={!!touched.category && !!errors.category}
              helperText={touched.category && errors.category}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="City"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              name="city"
              error={!!touched.city && !!errors.city}
              helperText={touched.city && errors.city}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Team Seuil"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.team_seuil}
              name="team_seuil"
              error={!!touched.team_seuil && !!errors.team_seuil}
              helperText={touched.team_seuil && errors.team_seuil}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Hours Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nb_hours}
              name="nb_hours"
              error={!!touched.nb_hours && !!errors.nb_hours}
              helperText={touched.nb_hours && errors.nb_hours}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Cost"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cost}
              name="cost"
              error={!!touched.cost && !!errors.cost}
              helperText={touched.cost && errors.cost}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              {updateOrcreate} Formation
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

export default FormationForm;
