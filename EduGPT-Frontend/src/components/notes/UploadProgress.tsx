import React from "react";
import {
  Box,
  LinearProgress,
  Paper,
  Typography,
  Slide,
  IconButton,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface UploadProgressProps {
  progress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  const isComplete = progress === 100;

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 320,
          p: 3,
          zIndex: 2000,
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          backgroundColor: "white",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {isComplete ? (
              <CheckCircleIcon sx={{ color: "#10b981", fontSize: "1.5rem" }} />
            ) : (
              <CloudUploadIcon sx={{ color: "#3b82f6", fontSize: "1.5rem" }} />
            )}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
                fontSize: "1rem",
              }}
            >
              {isComplete ? "Upload Complete" : "Uploading Files"}
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              color: "#6b7280",
              "&:hover": { color: "#374151" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: "0.875rem",
              }}
            >
              {isComplete
                ? "Files uploaded successfully"
                : "Processing files..."}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: isComplete ? "#10b981" : "#3b82f6",
                fontSize: "0.875rem",
              }}
            >
              {progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e2e8f0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: isComplete ? "#10b981" : "#3b82f6",
                borderRadius: 4,
              },
            }}
          />
        </Box>

        {isComplete && (
          <Fade in={isComplete}>
            <Typography
              variant="body2"
              sx={{
                color: "#10b981",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                py: 1,
                backgroundColor: "#f0fdf4",
                borderRadius: "6px",
                border: "1px solid #bbf7d0",
              }}
            >
              ✓ Files are now available in your notes
            </Typography>
          </Fade>
        )}
      </Paper>
    </Slide>
  );
};

export default UploadProgress;
