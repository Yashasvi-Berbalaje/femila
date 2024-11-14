"use client";
import {
  Box,
  Button,
  Grid2,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FormControlSelect from "./FormSelect";
import Bussiness from "../../public/assets/img/bussinessIcon.svg";
import People from "../../public/assets/img/people.svg";
import Price from "../../public/assets/img/PriceIcon.svg";
import Calendar from "../../public/assets/img/calendar.svg";
import Dropdown from "../../public/assets/img/dropdown.svg";
import Image from "next/image";
import ButtonProceed from "./ButtonProceed";
import buttonBack from "../../public/assets/img/buttonBack.svg";
import CrossBtn from "../../public/assets/img/crossbtn.svg";
import ChooseForm from "./ChooseForm";
import TextBox from "../../public/assets/img/textbox.svg";
import SectionOneCoverge from "./SectionOneCoverge";
import SectionTwoCoverge from "./SectionTwoCoverge";

const CoveregeForm = ({ handleNext,Data,setData,setQuote }) => {
  const [sectionOne, setSection] = useState(0);
  const handleSubmitSectionOne = (e) => {
    setSection(1);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={{ md: "end" }}>
      {sectionOne === 0 && (
        <>
          <SectionOneCoverge Data={Data} setData={setData} handlenext={handleSubmitSectionOne} />
        </>
      )}
      {sectionOne === 1 && (
        <>
          <SectionTwoCoverge handleNext={handleNext} Data={Data} setData={setData} setQuote={setQuote} />
        </>
      )}
    </Box>
  );
};

export default CoveregeForm;
