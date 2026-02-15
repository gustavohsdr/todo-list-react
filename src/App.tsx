// App.tsx
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Home from "./Pages/Home";
import { theme } from "./theme/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}
