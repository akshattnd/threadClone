import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Arial, sans-serif", // Set the global font family
    h1: {
      fontFamily: "Roboto,Georgia, serif", // Specific font for h1
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    body1: {
      fontFamily: "Roboto,Verdana, sans-serif", // Specific font for body text
    },
    // Customize other variants as needed
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
