import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formationCount, setFormationCount] = useState(0);
  const [formateurCount, setFormateurCount] = useState(0);
  const [enterpriseCount, setEnterpriseCount] = useState(0);
  const [individuCount, setIndividuCount] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("token");
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:8080/feedback/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
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
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Interested  Trainers
            </Typography>
          </Box>

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
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
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
                  {" "}
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
    </Box>
  );
};

export default Dashboard;
