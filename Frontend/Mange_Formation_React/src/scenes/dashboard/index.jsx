import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useUserContext } from "../../Context/UserContext";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formationCount, setFormationCount] = useState(0);
  const [formateurCount, setFormateurCount] = useState(0);
  const [enterpriseCount, setEnterpriseCount] = useState(0);
  const [individuCount, setIndividuCount] = useState(0);
  const [interestedTrainers, setInterestedTrainers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("token");
  const { isUserAdmin, isUserAssistent, isUserFormateur } = useUserContext();
  const isAdmin = isUserAdmin();
  const isAssistent = isUserAssistent();
  const isFormateur = isUserFormateur();
  const email = localStorage.getItem("email");
  const [formateurData, setFormateurData] = useState(null);
  const [nameFormation, setNameFormation] = useState("");
  const [nbHours, setNbHours] = useState("");
  const [cost, setCost] = useState("");
  const [objectif, setObjectif] = useState("");
  const [programme, setProgramme] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [teamSeuil, setTeamSeuil] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const fetchFormateurData = async () => {
      try {
        const formateurResponse = await axios.get(
          `http://localhost:8080/formateur/findByEmail/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormateurData(formateurResponse.data);
      } catch (error) {
        console.error("Error fetching formateur data:", error);
      }
    };

    fetchFormateurData();
  }, [token, email]); // Add token and email as dependencies

  useEffect(() => {
    console.log(JSON.stringify(formateurData, null, 2));

    if (formateurData && formateurData.formation) {
      setNameFormation(formateurData.formation.name_formation);
      setNbHours(formateurData.formation.nb_hours);
      setCost(formateurData.formation.cost);
      setObjectif(formateurData.formation.objectif);
      setProgramme(formateurData.formation.programme);
      setCity(formateurData.formation.city);
      setCategory(formateurData.formation.category);
      setTeamSeuil(formateurData.formation.team_seuil);
      setDate(formateurData.formation.date);
    }
  }, [formateurData]);
  const handleSendEmail = async () => {
    try {
      const formationResponse = await axios.get(
        "http://localhost:8080/planification/deleteEndPlanification",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error, display an error message, etc.
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formationResponse = await axios.get(
          "http://localhost:8080/formation/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormationCount(formationResponse.data);

        const formateurResponse = await axios.get(
          "http://localhost:8080/formateur/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormateurCount(formateurResponse.data);

        const enterpriseResponse = await axios.get(
          "http://localhost:8080/enterprise/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnterpriseCount(enterpriseResponse.data);

        const individuResponse = await axios.get(
          "http://localhost:8080/individu/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIndividuCount(individuResponse.data);

        // Fetch interested trainers who are not accepted
        const interestedTrainersResponse = await axios.get(
          "http://localhost:8080/formateur/nonAccepted",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInterestedTrainers(interestedTrainersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:8080/feedback/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, [token]);
  const handleAcceptTrainer = async (trainer) => {
    console.log(trainer);
    try {
      const response = await axios.put(
        `http://localhost:8080/formateur/accepteFormateur`,
        trainer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const interestedTrainersResponse = await axios.get(
          "http://localhost:8080/formateur/nonAccepted",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInterestedTrainers(interestedTrainersResponse.data);
      } else {
        console.error("Failed to accept trainer:", response.statusText);
      }
    } catch (error) {
      console.error("Error accepting trainer:", error);
    }
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {isAdmin || isAssistent ? (
          <Box>
            <Button
              onClick={handleSendEmail}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              send feedback to individu
            </Button>
          </Box>
        ) : null}
      </Box>
      {isAdmin || isAssistent ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={formationCount}
              subtitle="Formations"
              icon={
                <ReceiptOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={formateurCount}
              subtitle="Formateurs"
              icon={
                <ContactsOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={enterpriseCount}
              subtitle="Enterprise"
              icon={
                <BusinessIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={individuCount}
              subtitle="Individu"
              icon={
                <PeopleOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              colors={colors.grey[100]}
              pt="15px"
              pl="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Interested Trainers
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.greenAccent[500]}
                variant="h6"
                fontWeight="600"
              >
                Trainner Name
              </Typography>
              <Typography color={colors.greenAccent[500]}>
                Formation Name
              </Typography>
              <Typography
                color={colors.greenAccent[500]}
                sx={{ marginRight: "90px" }}
              >
                Skills
              </Typography>
              <Typography color={colors.greenAccent[500]}></Typography>
            </Box>
            {/* Content Section - Interested Trainers */}
            {interestedTrainers.map((trainer, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h6"
                  fontWeight="600"
                >
                  {trainer.firstname} {trainer.lastname}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {trainer.formation.name_formation}
                </Typography>
                <Typography
                  color={colors.grey[100]}
                  sx={{ marginLeft: "20px" }}
                >
                  {trainer.skills}
                </Typography>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                  onClick={() => handleAcceptTrainer(trainer)}
                  style={{ cursor: "pointer" }}
                >
                  Accept
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            gridColumn="span 4 "
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                All Feedbacks
              </Typography>
            </Box>
            {feedbacks.map((feedback, i) => (
              <Box
                key={`${feedback.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {`Qualite: ${feedback.qualite}, Rythme: ${feedback.rythme}, CoursTp: ${feedback.coursTp}, Maitrise: ${feedback.maitrise}`}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {`Formateur: ${feedback.formateur.firstname}  ${feedback.formateur.lastname} `}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {`Individu :${feedback.individu.firstName}  ${feedback.individu.lastName} `}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
      {isFormateur ? (
           <Box
           display="grid"
           gridTemplateColumns="repeat(12, 1fr)"
           gridAutoRows="140px"
           gap="20px"
         >
                  <Box
        gridColumn="span 3"
        gridRow="span 2"
        backgroundColor={colors.primary[500]}
      >
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            pt="15px"
            pl="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Your Formation
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight="600"
            >
              Formation Name :
            </Typography>
            <Typography color={colors.grey[100]} variant="h6" fontWeight="600">
              {nameFormation}
            </Typography>
            <Typography color={colors.greenAccent[500]}>City:</Typography>
            <Typography
              color={colors.grey[100]}
              sx={{ marginLeft: "20px" }}
            >{city}</Typography>
            </Box>
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
                <Typography color={colors.greenAccent[500]}>Objectif :</Typography>
            <Typography
              color={colors.grey[100]}
              sx={{ marginLeft: "20px" }}>
              {objectif}
            </Typography>
            <Typography
              color={colors.greenAccent[500]}
              sx={{ marginRight: "20px" }}>
              Cost :
            </Typography>
            <Typography color={colors.grey[100]}>{cost}</Typography>
        
            </Box>
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.greenAccent[500]}>Programme :</Typography>
            <Typography
              color={colors.grey[100]}
              sx={{ marginLeft: "20px" }}
            >{programme}</Typography>
            <Typography color={colors.greenAccent[500]}>Team Seuil :</Typography>
            <Typography
              color={colors.grey[100]}
              sx={{ marginLeft: "20px" }}
            >{teamSeuil}</Typography>
            </Box>
              <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.greenAccent[500]}>Date :</Typography>
            <Typography
              color={colors.grey[100]}
              sx={{ marginLeft: "20px" }}
            >{date}</Typography>
            <Typography color={colors.greenAccent[500]}>Category :</Typography>
            <Typography
              color={colors.grey[100]}
              sx={{ marginLeft: "20px" }}
            >{category}</Typography>
            </Box>
              <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.greenAccent[500]}>Hours Number :</Typography>
            
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
              marginRight="400px"
            >{nbHours}</Box>
          </Box>

        </Box>
        <Box
        gridColumn="span 3"
        gridRow="span 2"
        backgroundColor={colors.primary[500]}
      >
        </Box>
     </Box>
         ) : null}
  
    </Box>
  );
};

export default Dashboard;
