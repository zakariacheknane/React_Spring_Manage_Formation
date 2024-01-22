import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const Formation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/formation/all");
      const data = await response.json();
      setRows(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name_formation",
      headerName: "Formation Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "nb_hours",
      headerName: "Hours Number",
      flex: 1,
    
    },

    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
    },
    {
      field: "objectif",
      headerName: "Objectif",
      flex: 1,
    },
    {
      field: "programme",
      headerName: "Programme",
      flex: 1,
    },

    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
        field: "category",
        headerName: "Category",
        flex: 1,
      },
  ];

  return (
    <Box m="20px">
      <Header title="FORMATIONS" subtitle="List of Formation" />
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
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Formation;
