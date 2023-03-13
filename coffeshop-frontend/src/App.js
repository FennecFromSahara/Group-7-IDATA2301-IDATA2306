import { ThemeProvider } from "@emotion/react";
import LandingPage from "./LandingPage";
import { createTheme } from "@mui/material";
import { mainTheme } from "./components/MainTheme";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import IndividualProduct from "./IndividualProduct";
import ShoppingCart from "./ShoppingCart";

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
      <Route
        path="/products/:productName"
        element={
          <ThemeProvider theme={theme}>
            <IndividualProduct />
          </ThemeProvider>
        }
      />
      <Route
        path="/shoppingCart"
        element={
          <ThemeProvider theme={theme}>
            <ShoppingCart />
          </ThemeProvider>
        }
      />

      {/** TODO: IMPLEMENT NOT FOUND SITE */}
      <Route path="*" element={<h1>404: Not Found</h1>} />
    </Routes>
  );
}

export default App;
