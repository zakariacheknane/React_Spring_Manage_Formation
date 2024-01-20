import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import ForgotPassword from "./scenes/ForgotPassword";

function App() {
  const [theme, colorMode] = useMode();

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
                    </Routes>
                  </main>
                </div>
              </ColorModeContext.Provider>
            </ThemeProvider>
          </>
        }
      />
    </Routes>
  );
}

export default App;
