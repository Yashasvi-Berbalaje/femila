"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import CrossBtn from "../../public/assets/img/crossbtn.svg";
import PlusBtn from "../../public/assets/img/plusButton.svg";

const ChooseForm = ({ title, active, setActive }) => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        cursor: "pointer",
        padding: "1rem",
        backgroundColor: active
          ? "rgba(174, 173, 172, 0.2)"
          : "rgba(245, 91, 29, 0.3)",
        position: "relative",
      }}
      onClick={() => setActive(!active)}
    >
      <Image
        src={active ? PlusBtn : CrossBtn}
        alt="Close"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      />
      <Typography
        sx={{
          fontFamily: "Arboria-Medium",
          fontSize: "16px",
          textAlign: "center",
          fontWeight: 400,
          lineHeight: "19.89px",
          color: active ? "#4B4B4B" : "#F55B1D",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default ChooseForm;
