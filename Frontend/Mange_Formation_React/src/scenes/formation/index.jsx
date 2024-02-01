import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { columnsFormation } from "../../Data/columns";
import FormationForm from "../../components/FormationForm ";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserContext } from "../../Context/UserContext";
const Formation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const { isUserAdmin, isUserAssistent } = useUserContext();
  const isAdmin = isUserAdmin();
  const isAssistent = isUserAssistent();

  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/formation/all");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      console.log("Submitting form with values:", values);

      const response = await axios.post(
        "http://localhost:8080/formation/add",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json',
          },
        }
      );
      fetchData();
      handleCloseModal();
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = async (values) => {
    try {
      console.log("Updating form with values:", values);

      const response = await axios.put(
        "http://localhost:8080/formation/update",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      handleCloseModal();
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting formation with ID:", id);

      const response = await axios.delete(
        `http://localhost:8080/formation/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      handleCloseDeleteModal();
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error deleting formation:", error);
    }
  };

  const handleOpenModal = (formation) => {
    setSelectedFormation(formation);
    setOpenModal(true);
  };
  const handleOpenModalAdd = () => {
    setSelectedFormation(null);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setSelectedFormation(null);
    setOpenModal(false);
  };
  const handleOpenDeleteDialog = (formation) => {
    setSelectedFormation(formation);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteModal = () => {
    setSelectedFormation(null);
    setOpenDeleteDialog(false);
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FORMATIONS" subtitle="List of Formation" />
   
        {isAdmin  ?<Box>
          <Button
            onClick={handleOpenModalAdd}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add Formation
          </Button>
        </Box>:null}
      </Box>
        
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          rows={rows}
          columns={[
            ...columnsFormation,
            {
              field: "update",
              headerName: "Update",
              sortable: false,
              flex: 0.5,
              renderCell: (params) => (
                <IconButton
               color={colors.blueAccent[700]}
                onClick={() => handleOpenModal(params.row)}
              >
                <EditIcon />
              </IconButton>
              ),
            },
            {
                field: "delete",
                headerName: "Delete",
                sortable: false,
                flex: 0.5,
                renderCell: (params) => (
                  <IconButton
                 color={colors.redAccent[700]}
                  onClick={() => handleOpenDeleteDialog(params.row)}
                >
                  <DeleteIcon />
                </IconButton>
                ),
              },
          ]}
        />
      </Box>
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
          {selectedFormation ? "Update Formation" : "Add Formation"}
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
          <FormationForm
              onSubmit={
                selectedFormation ? handleUpdate : handleFormSubmit
              }
              onClick={handleCloseModal}
              initialValues={{
                ...selectedFormation,
                id: selectedFormation ? selectedFormation.id : undefined,
              }}
              updateOrcreate={
                selectedFormation ? "Update" : "Create New"
              }
            />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteModal}>
        <DialogTitle
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "20px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Delete Formation
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
          <Typography>
                Are you sure you want to delete this formation?
            </Typography>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button
                onClick={() => handleDelete(selectedFormation.id)}
                sx={{
                  backgroundColor: colors.redAccent[500],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "0 10px",
                }}
              >
                Delete
              </Button>
              <Button
                onClick={handleCloseDeleteModal}
                color="secondary"
                variant="contained"
                sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    margin: "0 10px",
                  }}
              >
                Cancel
              </Button>
          </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Formation;
