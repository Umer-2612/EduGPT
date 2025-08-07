import React, { useMemo, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Placeholder for notesApi, will be created in next step
import { notesApi } from "./services/notesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

// Theme context for toggling
const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorMode = () => useContext(ColorModeContext);

const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
});
setupListeners(store.dispatch);

// eslint-disable-next-line react-refresh/only-export-components
const Main = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f8fafc", paper: "#fff" },
                primary: { main: "#3b82f6" },
                secondary: { main: "#64748b" },
              }
            : {
                background: { default: "#18181b", paper: "#23232a" },
                primary: { main: "#60a5fa" },
                secondary: { main: "#a1a1aa" },
              }),
        },
        shape: { borderRadius: 10 },
        typography: { fontFamily: "Inter, Roboto, Arial, sans-serif" },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </ColorModeContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
