"use client";

import { useEffect, useRef, useState } from "react";
import globeIcon from "../../public/assets/img/globeicon.svg";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grid,
  Grow,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from "@mui/material";

// assets
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
// ==============================|| LOCALIZATION ||============================== //

const LocalizationSection = () => {
  const languages = [
    { code: "English", name: "English", nativeName: "EN" },
  
  ];

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [language, setLanguage] = useState("English"); // Changed default language to "English"

  const handleListItemClick = (event, lng) => {
    setLanguage(lng);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box>
        <Box
          sx={{
            background: "transparent",
            color: "#452262",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: 400,
            "&:hover": {
              cursor: "pointer",
            },
            borderRadius: "4px",
          }}
          ref={anchorRef}
          onClick={handleToggle}
          color="inherit"
        >
          {/* Globe SVG Icon */}
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              fontFamily: "arboria-medium",
              fontWeight: 400,
              color: "#452262",
              marginRight: "4px", // Added margin right for better spacing
            }}
            color="inherit"
          >
            {language}
          </Typography>
          <Image
            src={globeIcon}
            alt="Globe Icon"
            style={{ width: "15px", height: "15px" }}
          />{" "}
        </Box>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper
                sx={{
                  borderRadius: "4px", // Added border radius for a better look
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Added box shadow for depth
                  padding: "8px", // Added padding for better spacing
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <List
                    sx={{
                      padding: "0", // Removed default padding for better spacing
                    }}
                  >
                    {languages.map((lng) => (
                      <ListItemButton
                        key={lng.code}
                        onClick={(event) =>
                          handleListItemClick(event, lng.code)
                        }
                        sx={{
                          padding: "8px", // Added padding for better spacing
                          "&:hover": {
                            background: "#f5f5f5", // Added hover background for better feedback
                          },
                        }}
                      >
                        <ListItemText
                          primary={lng.name}
                          sx={{
                            fontSize: "10px !important",
                            fontFamily: "arboria-medium",
                            fontWeight: 400,
                            color: "#452262",
                            "& .MuiTypography-root": {
                              fontSize: "14px",
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
};

export default LocalizationSection;
