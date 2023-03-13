import { ThemeProvider } from "@emotion/react";
import LandingPage from "./LandingPage";
import { createTheme } from "@mui/material";
import { mainTheme } from "./components/MainTheme";
import { Route, Routes } from "react-router-dom";
import About from "./About";

function App() {
  const theme = createTheme(mainTheme);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ThemeProvider theme={theme}>
            <LandingPage />
          </ThemeProvider>
        }
      />
      <Route
        path="/about"
        element={
          <ThemeProvider theme={theme}>
            <About />
          </ThemeProvider>
        }
      />
    </Routes>
  );
}

export default App;
