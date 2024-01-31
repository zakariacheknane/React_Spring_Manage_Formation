import React from "react";
import { Formik } from "formik";
import { Box, TextField, Button, useMediaQuery } from "@mui/material";

const IndividuForm = ({ onSubmit, onClick, initialValues }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        firstName: "",
        lastName: "",
        birthDate: "",
        city: "",
        email: "",
        phone: "",
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
              value={values.firstName}
              name="firstName"
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Birth Date"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.birthDate}
              name="birthDate"
              error={!!touched.birthDate && !!errors.birthDate}
              helperText={touched.birthDate && errors.birthDate}
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
              type="email"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Phone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              name="phone"
              error={!!touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Register as Individu
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

export default IndividuForm;
