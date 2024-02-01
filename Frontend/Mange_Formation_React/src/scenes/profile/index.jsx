import { Box, Button, Snackbar, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [userData, setUserData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/findByEmail/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token, email]);

  const handleCloseSuccessMessage = () => {
    setSuccessMessage("");
  };

  const validateConfirmPassword = (value) => {
    return value === initialValues.password ? undefined : "Passwords do not match";
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:8080/users/updatePassword/${userData.id}/${values.password}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Password updated successfully
        setSuccessMessage("Password updated successfully");
      } else {
        // Handle the error scenario
        console.error("Error updating password:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Update Password" subtitle="Update your Password" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (values.confirm !== values.password) {
            errors.confirm = "Passwords do not match";
          }
          return errors;
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirm}
                name="confirm"
                error={!!touched.confirm && !!errors.confirm}
                helperText={touched.confirm && errors.confirm}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update your Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ backgroundColor: "green" }}
      />
    </Box>
  );
};

const initialValues = {
  password: "",
  confirm: "",
};

export default Profile;
