import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";

const Questions: React.FC = () => {
  return (
    <Box sx={{ p: 4, maxWidth: "100%" }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                fontSize: "2rem",
                letterSpacing: "-0.025em",
              }}
            >
              Questions
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                mt: 0.5,
                fontSize: "0.95rem",
              }}
            >
              Create and manage exam questions and assessments
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Coming Soon Section */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          p: 8,
          textAlign: "center",
          backgroundColor: "white",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <QuizIcon sx={{ fontSize: "4rem", color: "#cbd5e1", mb: 3 }} />
        <Typography
          variant="h5"
          sx={{
            color: "#64748b",
            fontWeight: 600,
            mb: 1,
          }}
        >
          Questions Section Coming Soon
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#94a3b8",
            maxWidth: "400px",
            mx: "auto",
          }}
        >
          We're working on building a comprehensive question management system.
          This will include AI-powered question generation, exam creation, and
          assessment tools.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Questions;
