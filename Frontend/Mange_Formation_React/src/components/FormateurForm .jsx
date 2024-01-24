import React from "react";
import { Formik } from "formik";
import { Box, TextField, Button, useMediaQuery } from "@mui/material";

const FormateurForm = ({ onSubmit, onClick, initialValues,updateOrcreate }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        firstname:"",
        lastname: "",
        email: "",
        skills: "",
        remarks: "",
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
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstname}
              name="firstname"
              error={!!touched.firstname && !!errors.firstname}
              helperText={touched.firstname && errors.firstname}
              sx={{ gridColumn: "span 2 " }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastname}
              name="lastname"
              error={!!touched.lastname && !!errors.lastname}
              helperText={touched.lastname && errors.lastname}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="email"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Skills"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.skills}
              name="skills"
              error={!!touched.skills && !!errors.skills}
              helperText={touched.skills && errors.skills}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Remarks"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.remarks}
              name="remarks"
              error={!!touched.remarks && !!errors.remarks}
              helperText={touched.remarks && errors.remarks}
              sx={{ gridColumn: "span 4" }}
            />

          
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              {updateOrcreate} New Formateur
            </Button>
            <Box ml={2}>
              <Button
                onClick={onClick}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormateurForm;
