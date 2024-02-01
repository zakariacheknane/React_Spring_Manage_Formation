import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import ForgotPassword from "./scenes/ForgotPassword";
import { useUserContext } from "./Context/UserContext";
import Formation from "./scenes/formation";
import Formateur from "./scenes/formateur";
import Enterprise from "./scenes/enterprise";
import Planification from "./scenes/planification";
import Home from "./scenes/home";
import Feedback from "./scenes/feedback";
import TopbarHome from "./scenes/global/TopbarHome";
import TopbarLogin from "./scenes/global/TopbarLogin";
import ChangePassword from "./scenes/changePassword";
import Individu from "./scenes/individu";
import Profile from "./scenes/profile";
import assitent from "./Assets/assitent.jpg";
import formateur from "./Assets/formateur.png";
function App() {
  const [theme, colorMode] = useMode();
  const { isUserAdmin, isUserAssistent, isUserFormateur } = useUserContext();
  const isAdmin = isUserAdmin();
  const isAssistent = isUserAssistent();
  const isFormateur = isUserFormateur();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ThemeProvider theme={theme}>
            <ColorModeContext.Provider value={colorMode}>
              <CssBaseline />
              <div className="app">
                <main className="content">
                  <TopbarLogin />
                  <Login />
                </main>
              </div>
            </ColorModeContext.Provider>
          </ThemeProvider>
        }
      />
      <Route
        path="/feedback"
        element={
          <ThemeProvider theme={theme}>
            <ColorModeContext.Provider value={colorMode}>
              <CssBaseline />
              <div className="app">
                <main className="content">
                  <TopbarHome />
                  <Feedback />
                </main>
              </div>
            </ColorModeContext.Provider>
          </ThemeProvider>
        }
      />
      <Route
        path="/"
        element={
          <ThemeProvider theme={theme}>
            <ColorModeContext.Provider value={colorMode}>
              <CssBaseline />
              <div className="app">
                <main className="content">
                  <TopbarHome />
                  <Home />
                </main>
              </div>
            </ColorModeContext.Provider>
          </ThemeProvider>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ThemeProvider theme={theme}>
            <ColorModeContext.Provider value={colorMode}>
              <CssBaseline />
              <div className="app">
                <main className="content">
                  <TopbarHome />
                  <ForgotPassword />
                </main>
              </div>
            </ColorModeContext.Provider>
          </ThemeProvider>
        }
      />
      <Route
        path="/resetyourpassword"
        element={
          <ThemeProvider theme={theme}>
            <ColorModeContext.Provider value={colorMode}>
              <CssBaseline />
              <div className="app">
                <main className="content">
                  <TopbarHome />
                  <ChangePassword />
                </main>
              </div>
            </ColorModeContext.Provider>
          </ThemeProvider>
        }
      />

      {isAdmin || isAssistent || isFormateur ? (
        <Route
          path="/*"
          element={
            <>
              <ThemeProvider theme={theme}>
                <ColorModeContext.Provider value={colorMode}>
                  <CssBaseline />
                  <div className="app">
                    {isAdmin ? (
                      <Sidebar
                        primary="ADMIN"
                        second="Admin"
                        img="./assets/user.png"
                      />
                    ) : null}
                    {isAssistent ? (
                      <Sidebar
                        primary="ASSISTENT"
                        second="Assistent"
                        img={assitent}
                      />
                    ) : null}
                    {isFormateur ? (
                      <Sidebar
                        primary="FORMATEUR"
                        second="Formateur"
                        img={formateur}
                      />
                    ) : null}
                    <main className="content">
                      <Topbar />
                      <Routes>
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/profil" element={<Profile />} />
                        {isAdmin || isAssistent ? (
                          <>
                            <Route path="/formation" element={<Formation />} />
                            <Route path="/formateur" element={<Formateur />} />
                            <Route
                              path="/enterprise"
                              element={<Enterprise />}
                            />
                            <Route
                              path="/planification"
                              element={<Planification />}
                            />
                            <Route path="/individu" element={<Individu />} />
                          </>
                        ) : (
                          <Route
                            path="/*"
                            element={<Navigate to="/Dashboard" />}
                          />
                        )}
                      </Routes>
                    </main>
                  </div>
                </ColorModeContext.Provider>
              </ThemeProvider>
            </>
          }
        />
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
