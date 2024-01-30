import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import PlanificationForm from "../../components/PlanificationForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Planification = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlanification, setSelectedPlanification] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/planification/all"
      );
      const planifications = response.data;

      const events = planifications.map((planification) => ({
        id: planification.id.toString(),
        title: planification.formation.name_formation,
        start: planification.startDate,
        end: planification.endDate,
        allDay: true,
        formation: planification.formation,
        formateur: planification.formateur,
        entreprise: planification.entreprise,
      }));

      setCurrentEvents(events);
    } catch (error) {
      console.error("Error fetching planifications:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateClick = (selected) => {};

  const handleEventClick = (eventInfo) => {
    const selectedEvent = currentEvents.find(
      (event) => event.id === eventInfo.event.id
    );
    if (selectedEvent) {
      handleUpdateButtonClick(selectedEvent);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPlanification(null);
    setOpenModal(false);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/planification/update",
        values
      );
      fetchData();
      handleCloseModal();
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  const handleFormSubmit = async (values) => {
    console.log("Server :", values);
    try {
      const response = await axios.post(
        `http://localhost:8080/planification/planify?startDate=${values.startDate}&endDate=${values.endDate}&formationId=${values.formation_id}&formateurId=${values.formateur_id}&entrepriseId=${values.Entreprise_id}&teamId=${values.Team_id}`
      );
      fetchData();
      handleCloseModal();
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting planification with ID:", id);

      const response = await axios.delete(
        `http://localhost:8080/planification/delete/${id}`
      );
      fetchData();
      handleCloseDeleteModal();
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error deleting planification:", error);
    }
  };

  const handleUpdateButtonClick = (planification) => {
    setSelectedPlanification({
      startDate: planification.start,
      endDate: planification.end,
      formation_id: planification.formation.id,
      formateur_id: planification.formateur.id,
      Entreprise_id: planification.entreprise.id,
    });
    handleOpenModal();
  };

  const handleOpenDeleteModal = (planification) => {
    setSelectedPlanification(planification);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedPlanification(null);
    setOpenDeleteDialog(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Planification"
          subtitle="Full Planification Interactive Page"
        />
        <Box>
          <Button
            onClick={handleOpenModal}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add Planification
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={`${event.title}`} // Concatenate "Formation" with the event title
                  sx={{ textAlign: "center" }}
                  secondary={
                    <>
                      <Typography sx={{ color: colors.grey[100] }}>
                        {" "}
                        From: {event.start}
                      </Typography>
                      <Typography sx={{ color: colors.grey[100] }}>
                        {" "}
                        To: {event.end}
                      </Typography>
                      <Typography sx={{ color: colors.grey[100] }}>
                        By: {event.formateur.firstname}{" "}
                        {event.formateur.lastname}
                      </Typography>
                    
                    </>
                  }
                />
                <div>
                  <IconButton
                    color={colors.blueAccent[700]}
                    onClick={() => handleUpdateButtonClick(event)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color={colors.redAccent[700]}
                    onClick={() => handleOpenDeleteModal(event)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </Box>
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
          {selectedPlanification ? "Update Planification" : "Add Planification"}
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
            <PlanificationForm
              onSubmit={selectedPlanification ? handleUpdate : handleFormSubmit}
              onClick={handleCloseModal}
              initialValues={{
                ...selectedPlanification,
                id: selectedPlanification
                  ? selectedPlanification.id
                  : undefined,
              }}
              updateOrcreate={selectedPlanification ? "Update" : "Create New"}
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
          Delete Planification
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
              Are you sure you want to delete this planification?
            </Typography>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                onClick={() => handleDelete(selectedPlanification.id)}
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

export default Planification;
