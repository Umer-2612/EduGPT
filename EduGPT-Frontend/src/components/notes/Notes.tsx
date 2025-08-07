import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  Fade,
  Pagination,
  CircularProgress,
  Link,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import UploadProgress from "./UploadProgress";
import { useGetNotesQuery, type NoteItem } from "../../services/notesApi";

const PAGE_SIZE = 10;

const Notes: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const folderInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  // Fetch notes with RTK Query
  const { data, isLoading, isFetching, refetch } = useGetNotesQuery({
    page,
    limit: PAGE_SIZE,
  });
  const items = data?.notes || [];
  const total = data?.totalCount || 0;
  const pageCount = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  const open = Boolean(anchorEl);

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // File upload with fetch and progress
  const handleUploadFiles = () => {
    handleClose();
    fileInputRef.current?.click();
  };

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("file", file); // changed from 'files' to 'file'
    });
    // Optionally add description and tag (replace with real values from UI if needed)
    formData.append("description", ""); // TODO: replace with user input if available
    formData.append("tag", ""); // TODO: replace with user input if available
    setUploadProgress(0);
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/api/notes/upload");
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
      xhr.onload = () => {
        setUploadProgress(null);
        refetch();
        resolve();
      };
      xhr.onerror = () => {
        setUploadProgress(null);
        reject();
      };
      xhr.send(formData);
    });
  };

  // const handleUploadFolder = () => {
  //     handleClose();
  //     folderInputRef.current?.click();
  // };

  // const handleCreateFolder = () => {
  //     handleClose();
  //     const folderName = prompt("Enter folder name");
  //     if (folderName) {
  //         // API call for folder creation (not implemented)
  //     }
  // };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileIcon = (item: NoteItem) => {
    if (item.mimeType === "application/pdf") {
      return <PictureAsPdfIcon sx={{ color: "#ef4444", fontSize: "1.5rem" }} />;
    }
    if (
      item.mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      item.mimeType === "application/msword"
    ) {
      return <DescriptionIcon sx={{ color: "#3b82f6", fontSize: "1.5rem" }} />;
    }
    return <DescriptionIcon sx={{ color: "#64748b", fontSize: "1.5rem" }} />;
  };

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
                color: theme.palette.mode === "dark" ? "#ffffff" : "#1e293b",
                fontSize: "2rem",
                letterSpacing: "-0.025em",
              }}
            >
              Notes
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#ffffff" : "#64748b",
                mt: 0.5,
                fontSize: "0.95rem",
              }}
            >
              Manage your educational documents and materials
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            sx={{
              backgroundColor: "#3b82f6",
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1.5,
              borderRadius: "8px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              "&:hover": {
                backgroundColor: "#2563eb",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
            }}
          >
            Add
          </Button>
        </Box>

        {/* Search and Filter Bar */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            p: 2,
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 500 }}
          >
            {total} items
          </Typography>
        </Box>
      </Box>

      {/* Table Section */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 1px 3px 0 rgba(0,0,0,0.5)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <TableContainer
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.default
                      : "#f8fafc",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    py: 2,
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    py: 2,
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    py: 2,
                  }}
                >
                  Size
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    py: 2,
                  }}
                >
                  Uploaded At
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    py: 2,
                    width: "100px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isFetching ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : items.length > 0 ? (
                items.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                      "&:last-child td": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      sx={{ py: 2, color: theme.palette.text.primary }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {getFileIcon(item)}
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              color: theme.palette.text.primary,
                              fontSize: "0.95rem",
                            }}
                          >
                            {item.originalName}
                          </Typography>
                          {item.description && (
                            <Chip
                              label={item.description}
                              size="small"
                              sx={{
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? theme.palette.primary.dark
                                    : "#dbeafe",
                                color:
                                  theme.palette.mode === "dark"
                                    ? theme.palette.primary.contrastText
                                    : "#1e40af",
                                fontSize: "0.75rem",
                                height: "20px",
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{ py: 2, color: theme.palette.text.secondary }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.875rem",
                        }}
                      >
                        {item.mimeType.split("/").pop()?.toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ py: 2, color: theme.palette.text.secondary }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.875rem",
                        }}
                      >
                        {formatFileSize(item.fileSize)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ py: 2, color: theme.palette.text.secondary }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.875rem",
                        }}
                      >
                        {new Date(item.uploadDate).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            sx={{ color: theme.palette.primary.main }}
                            component={Link}
                            href={item.s3Url}
                            target="_blank"
                            rel="noopener"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <span>
                            <IconButton
                              size="small"
                              sx={{ color: theme.palette.text.secondary }}
                              disabled
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <span>
                            <IconButton
                              size="small"
                              sx={{ color: theme.palette.error.main }}
                              disabled
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: "center" }}>
                      <FolderIcon
                        sx={{
                          fontSize: "4rem",
                          color: theme.palette.divider,
                          mb: 2,
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "1.125rem",
                          fontWeight: 500,
                        }}
                      >
                        No notes uploaded yet
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.text.disabled,
                          fontSize: "0.875rem",
                          mt: 0.5,
                        }}
                      >
                        Upload your first document to get started
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      {/* Add Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
          },
        }}
      >
        <MenuItem onClick={handleUploadFiles} sx={{ py: 1.5, px: 2 }}>
          <UploadFileIcon sx={{ mr: 2, color: "#3b82f6" }} />
          <Typography sx={{ fontWeight: 500 }}>Upload Files</Typography>
        </MenuItem>
        {/*
                <MenuItem onClick={handleUploadFolder} sx={{ py: 1.5, px: 2 }}>
                    <FolderOpenIcon sx={{ mr: 2, color: "#f59e0b" }} />
                    <Typography sx={{ fontWeight: 500 }}>Upload Folder</Typography>
                </MenuItem>
                <MenuItem onClick={handleCreateFolder} sx={{ py: 1.5, px: 2 }}>
                    <CreateNewFolderIcon sx={{ mr: 2, color: "#10b981" }} />
                    <Typography sx={{ fontWeight: 500 }}>New Folder</Typography>
                </MenuItem>
                */}
      </Menu>

      {/* Hidden inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
        style={{ display: "none" }}
        onChange={(e) => uploadFiles(e.target.files)}
      />
      {/*
            <input
                ref={folderInputRef}
                type="file"
                // @ts-expect-error - webkitdirectory not in types yet
                webkitdirectory="true"
                style={{ display: "none" }}
                onChange={(e) => simulateUpload(e.target.files, "folder")}
            />
            */}

      {/* Upload Progress */}
      {uploadProgress !== null && <UploadProgress progress={uploadProgress} />}
    </Box>
  );
};

export default Notes;
