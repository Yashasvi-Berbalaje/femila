import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorModal = ({ open, handleClose, errors }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={modalStyles.title}>Errors</DialogTitle>
      <DialogContent>
        <Box sx={modalStyles.content}>
          {errors.length > 0 ? (
            <List>
              {errors.map((error, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ErrorIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={modalStyles.errorText}>
                        {error.description}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography sx={modalStyles.noErrorText}>No Errors</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={modalStyles.closeButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;

const modalStyles = {
  title: {
    fontFamily: "Outfit",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "30.24px",
    textAlign: "left",
    color: "#452262",
  },
  content: {
    padding: "16px 0",
  },
  errorText: {
    fontFamily: "Arboria-Medium",
    fontSize: "16px",
    fontWeight: 400,
    color: "rgba(245, 91, 29, 1)", // Error color
  },
  noErrorText: {
    fontFamily: "Arboria-Book",
    fontSize: "16px",
    fontWeight: 400,
    color: "#8a8a8a", // Light gray for no errors
    textAlign: "center",
  },
  closeButton: {
    fontFamily: "Arboria-Medium",
    fontSize: "16px",
    color: "#452262",
    "&:hover": {
      backgroundColor: "rgba(245, 91, 29, 0.1)", // Slight hover effect
    },
  },
};