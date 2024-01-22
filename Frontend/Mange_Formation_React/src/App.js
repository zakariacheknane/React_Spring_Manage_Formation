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
            <div className="app">
              <main className="content">
                <Topbar />
                <Login />
              </main>
            </div>
          }
        />
        <Route
          path="/reset-password"
          element={
            <div className="app">
              <main className="content">
                <ForgotPassword />
              </main>
            </div>
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
                      </Routes>
                    </main>
                  </div>
                </ColorModeContext.Provider>
              </ThemeProvider>
            </>
          }
        />
        ) : (
          // Redirect to another route if the user is not an admin
          <Route
            path="/*"
            element={<Navigate to="/login" />}
          />
        )}
        
      </Routes>
    );
  }
  
  export default App;