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
import { columnsIndividu } from "../../Data/columns";
import DeleteIcon from "@mui/icons-material/Delete";
const Individu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedIndividu, setSelectedIndividu] = useState(null);
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/individu/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting individu with ID:", id);

      const response = await axios.delete(
        `http://localhost:8080/individu/delete/${id}`,
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
      console.error("Error deleting individu:", error);
    }
  };

  const handleOpenDeleteDialog = (individu) => {
    setSelectedIndividu(individu);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteModal = () => {
    setSelectedIndividu(null);
    setOpenDeleteDialog(false);
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Individus" subtitle="List of Individu" />
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
            ...columnsIndividu,
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
          Delete Individu
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
                Are you sure you want to delete this individu?
            </Typography>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button
                onClick={() => handleDelete(selectedIndividu.id)}
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

export default Individu;
