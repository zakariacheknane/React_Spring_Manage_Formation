import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const Feedback = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [idIndividu, setidIndividu] = useState("");
  const [idFormater, setidFormater] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const individuId = searchParams.get("idIndividu");
    const formaterId = searchParams.get("idFormater");
    setidIndividu(individuId || "");
    setidFormater(formaterId || "");
  }, [location.search]);

  const handleFormSubmit = (values) => {
    console.log(values);
    axios
      .post(`http://localhost:8080/feedback/add/${idFormater}/${idIndividu}`, values)
      .then((response) => {
        console.log("Feedback added successfully:", response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error adding feedback:", error);
      });
  };

  return (
    <Box m="100px" display="flex" alignItems="center" justifyContent="center">
      <Box
        width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
        p="20px"
        boxShadow={3}
        borderRadius="8px"
        bgcolor={colors.primary[400]}
      >
        <Typography
          variant="h4"
          sx={{
            color: colors.grey[100],
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Add Your Feedback
        </Typography>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
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
                gap="20px"
                gridTemplateColumns={{
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr 1fr",
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Quality"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.qualite}
                  name="qualite"
                  error={!!touched.qualite && !!errors.qualite}
                  helperText={touched.qualite && errors.qualite}
                  sx={{ gridColumn: "span 4" }}
                  inputProps={{ min: 0, max: 10 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Rhythm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rythme}
                  name="rythme"
                  error={!!touched.rythme && !!errors.rythme}
                  helperText={touched.rythme && errors.rythme}
                  sx={{ gridColumn: "span 4" }}
                  inputProps={{ min: 0, max: 10 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Course Tp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.coursTp}
                  name="coursTp"
                  error={!!touched.coursTp && !!errors.coursTp}
                  helperText={touched.coursTp && errors.coursTp}
                  sx={{ gridColumn: "span 4" }}
                  inputProps={{ min: 0, max: 10 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Mastery"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.maitrise}
                  inputProps={{ min: 0, max: 10 }}
                  name="maitrise"
                  error={!!touched.maitrise && !!errors.maitrise}
                  helperText={touched.maitrise && errors.maitrise}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create New Feedback
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  qualite: 0,
  rythme: 0,
  coursTp: 0,
  maitrise: 0,
};

export default Feedback;
