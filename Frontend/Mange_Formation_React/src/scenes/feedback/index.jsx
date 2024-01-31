import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

const Feedback = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);

    axios
      .post("http://localhost:8080/feedback/add", values)
      .then((response) => {
        console.log("Feedback added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding feedback:", error);
      });
  };

  return (
    <Box m="100px" display="flex" alignItems="center" justifyContent="center" >
      <Box
        width="30%" // Adjust the width as needed
        p="20px"
        boxShadow={3}
        borderRadius="8px"
        
      >
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
                color="ffffff"
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
                type="number"
                label="Quality"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.qualite}
                name="qualite"
                error={!!touched.qualite && !!errors.qualite}
                helperText={touched.qualite && errors.qualite}
                sx={{ gridColumn: "span 4" }}
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
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Mastery"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maitrise}
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
