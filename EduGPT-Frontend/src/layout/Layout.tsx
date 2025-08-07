import React from "react";
import {
  Box,
  CssBaseline,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "../main";

const Layout: React.FC = () => {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: "280px", // Match sidebar width
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        {/* Header Bar */}
        <AppBar
          position="static"
          elevation={0}
          color="transparent"
          sx={{ boxShadow: "none", background: "none", px: 0, py: 0 }}
        >
          <Toolbar sx={{ justifyContent: "flex-end", minHeight: 64 }}>
            <Tooltip
              title={
                mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                size="large"
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
