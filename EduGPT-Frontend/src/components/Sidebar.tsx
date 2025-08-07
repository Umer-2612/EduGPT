import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import NoteIcon from "@mui/icons-material/Note";
import QuizIcon from "@mui/icons-material/Quiz";

const drawerWidth = 280;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const selected = location.pathname.includes("questions")
    ? "questions"
    : "notes";
  const theme = useTheme();

  const menuItems = [
    {
      path: "/notes",
      label: "Notes",
      icon: <NoteIcon />,
      key: "notes",
    },
    {
      path: "/questions",
      label: "Questions",
      icon: <QuizIcon />,
      key: "questions",
    },
  ];

  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 1px 3px 0 rgba(0,0,0,0.5)"
            : "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo/Brand Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "#f8fafc",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: "1.5rem",
            letterSpacing: "-0.025em",
          }}
        >
          EduGPT
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.875rem",
            mt: 0.5,
          }}
        >
          AI-Powered Education Platform
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            mb: 1,
            px: 1,
          }}
        >
          Navigation
        </Typography>

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.key} sx={{ p: 0, mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                selected={selected === item.key}
                sx={{
                  borderRadius: "8px",
                  mx: 0.5,
                  py: 1.5,
                  px: 2,
                  color: theme.palette.text.primary,
                  "&.active": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.dark
                        : "#dbeafe",
                    color: theme.palette.primary.contrastText,
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.primary.main,
                    },
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : "#bfdbfe",
                    },
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.text.primary,
                  },
                  "& .MuiListItemIcon-root": {
                    color:
                      selected === item.key
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    minWidth: "40px",
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: selected === item.key ? 600 : 500,
                    fontSize: "0.95rem",
                  },
                }}
              >
                <ListItemIcon sx={{ fontSize: "1.25rem" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
