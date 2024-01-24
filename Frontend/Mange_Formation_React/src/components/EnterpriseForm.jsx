import React from "react";
import { Formik } from "formik";
import { Box, TextField, Button, useMediaQuery } from "@mui/material";

const EnterpriseForm = ({ onSubmit, onClick, initialValues,updateOrcreate }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        name:"",
        adress: "",
        number_phone: "",
        url: "",
        email: "",
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
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4 " }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Adress"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.adress}
              name="adress"
              error={!!touched.adress && !!errors.adress}
              helperText={touched.adress && errors.adress}
              sx={{ gridColumn: "span 4" }}
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
              label="URL"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.url}
              name="url"
              error={!!touched.url && !!errors.url}
              helperText={touched.url && errors.url}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Number Phone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.number_phone}
              name="number_phone"
              error={!!touched.number_phone && !!errors.number_phone}
              helperText={touched.number_phone && errors.number_phone}
              sx={{ gridColumn: "span 4" }}
            />

          
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              {updateOrcreate}  Enterprise
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

export default EnterpriseForm;
