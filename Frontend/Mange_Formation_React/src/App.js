import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route,Navigate } from "react-router-dom";
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


function App() {
  const [theme, colorMode] = useMode();
  const { isUserAdmin, isUserAssistent } = useUserContext();
  const isAdmin = isUserAdmin();
  const isAssistent = isUserAssistent();
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
          path="/home"
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
        
         {isAdmin || isAssistent ? (
        <Route
          path="/*"
          element={
            <>
              <ThemeProvider theme={theme}>
                <ColorModeContext.Provider value={colorMode}>
                  <CssBaseline />
                  <div className="app">
                    <Sidebar />
                    <main className="content">
                      <Topbar />
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/formation" element={<Formation />} />
                        <Route path="/formateur" element={<Formateur />} />
                        <Route path="/enterprise" element={<Enterprise />} />
                        <Route path="/planification" element={<Planification />} />
                      </Routes>
                    </main>
                  </div>
                </ColorModeContext.Provider>
              </ThemeProvider>
            </>
          }
        />
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/login" />}
          />
        )}
        
      </Routes>
    );
  }
  
  export default App;
