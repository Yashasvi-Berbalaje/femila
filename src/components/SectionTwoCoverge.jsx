"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid2,
  Radio,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import Calendar from "../../public/assets/img/calendar.svg";
import buttonBack from "../../public/assets/img/buttonBack.svg";
import ChooseForm from "./ChooseForm";
import App from "./RecursiveAccordian";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import ErrorModal from "./ErrorModels";
import cloneDeep from "lodash/cloneDeep";

const CalendarIcon = () => (
  <div style={{ marginRight: "4px" }}>
    <Image src={Calendar} alt="Calendar" />
  </div>
);

const RadioGroupField = ({
  question,
  field,
  formState,
  handleChange,
  error,
}) => (
  <Grid2 size={{ xs: 12, lg: 8 }}>
    <Box sx={styles.labelBox}>
      <Typography sx={styles.itemLabel}>Further Question</Typography>
    </Box>
    <Box sx={styles.furtherQBox}>
      <FormLabel sx={{ ...styles.formLabel, marginRight: "1rem" }}>
        {question}
      </FormLabel>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {["Yes", "No"].map((option) => (
          <FormControl
            key={option}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Radio
              checked={formState[field] === option}
              onChange={() => handleChange(field, option)}
              value={option}
              name={field}
              sx={styles.radioButton}
              inputProps={{ "aria-label": option }}
            />
            <FormLabel sx={styles.formLabel}>{option}</FormLabel>
          </FormControl>
        ))}
      </Box>
    </Box>
    {error && <Typography color="error">{error}</Typography>}
  </Grid2>
);

const renderTextField = (
  id,
  label,
  value,
  handleChangeField,
  errorKey,
  placeholder
) => (
  <TextField
    required
    id={id}
    name={id}
    label={label}
    fullWidth
    value={value}
    onChange={(e) => handleChangeField(id, e.target.value)}
    placeholder={placeholder}
    sx={styles.textField()}
  />
);

const SectionTwoCoverge = ({ handleNext, Data, setData, setQuote }) => {
  const [loader,setLoader]=useState(false)
  const [active, setActive] = useState(false);
  const [formState, setFormState] = useState({
    abn: "",
    effectiveDate: "",
    expiryDate: "",
    businessName: "",
    businessDescription: "",
    anzicCode: "",
    annualTurnover: "",
    numEmployees: "",
    yearBusinessStarted: "",
    limitsOfLiability: "",
    annualWages: "",
    propertyCare: "",
    hirePayment: "",
    taxAuditSumInsured: "",
    excessPerClaim: "",
    interestedParty: "",
    serveAlcohol: "",
    hasDanceFloor: "",
    claim: "",
    importsExports: "",
  });

  const [errors, setErrors] = useState([]);
  const [premium, setPremium] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "abn",
      "effectiveDate",
      "expiryDate",
      "businessName",
      "limitsOfLiability",
      "businessDescription",
      "anzicCode",
      "annualTurnover",
      "numEmployees",
      "yearBusinessStarted",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formState[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .trim()} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePremium = () => {
    const liability = parseFloat(formState.limitsOfLiability) || 0;
    const calculatedPremium = 420 + liability * 0.02;
    setPremium(calculatedPremium.toFixed(2));
  };

  const convertToMidnight = (dateString) => {
    const date = new Date(dateString);

    // Set hours, minutes, seconds, and milliseconds to 0 (midnight)
    date.setUTCHours(0, 0, 0, 0);

    // Format back to the required format (YYYY-MM-DDTHH:MM:SS)
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const getYear = (dateString) => {
    const date = new Date(dateString);
    return date.getUTCFullYear(); // Returns the year in UTC
  };

  const convertYearToDate = (year) => {
    // Create a new Date object with the year, January 1st
    const date = new Date(Date.UTC(year, 0, 1)); // 0 is January
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0]; // Split by 'T' and take the date part
    return formattedDate;
  };

  // const formattedDate = convertToMidnight("2024-10-06T05:40:52.806Z");
  // console.log(formattedDate);

  const convertYearToISO = (year) => {
    // Create a Date object for January 1st of the given year at midnight
    const date = new Date(Date.UTC(year, 0, 1)); // 0 is January, 1 is the day
    // Format the date as YYYY-MM-DDTHH:MM:SS
    const yearStr = date.getUTCFullYear();
    const monthStr = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dayStr = String(date.getUTCDate()).padStart(2, "0");
    const hoursStr = String(date.getUTCHours()).padStart(2, "0");
    const minutesStr = String(date.getUTCMinutes()).padStart(2, "0");
    const secondsStr = String(date.getUTCSeconds()).padStart(2, "0");

    return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)

    const { selectedCoverages, ...restData } = cloneDeep(Data);
    restData.EffectiveDate = convertToMidnight(restData.EffectiveDate);
    restData.ExpiryDate = convertToMidnight(restData.ExpiryDate);
    restData.YearBusinessStarted = getYear(
      restData.YearBusinessStarted
    ).toString();
    restData.PolicyLobList[0].PolicyRiskList[0].YearBuilt = convertYearToDate(
      restData.PolicyLobList[0].PolicyRiskList[0].YearBuilt
    );

    restData.PolicyLobList[0].PolicyEntityList.forEach((lob) => {
      delete lob.id;
      lob.DateOfLoss = convertYearToISO(lob.DateOfLoss);
    });

    if (selectedCoverages.includes(2)) {
      let ProductElementCode = "C0001787";
      let sum = 0;
      restData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
      ).PolicyEntityList.forEach((entity) => {
        delete entity.index;
        sum += Number(entity.ReplacementValue);
      });
      let Excess = "";
      restData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
      ).PolicyBenefitList.forEach((benefit) => {
        if (benefit.ProductElementCode == "B00866") {
          Excess = benefit.Excess;
        }
      });
      restData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
      ).PolicyBenefitList.push({
        ProductElementCode: "B00867",
        ReplacementValueOfTotalContents: sum.toString(),
        Excess: Excess,
      });
    }

    const response = await axiosInstance.post("/createquote", restData);

    if (response.data.quote.Status === "FAILED") {
      if (response.data.quote.CloverErrorResponse?.reasons) {
        setErrors(response.data.quote.CloverErrorResponse.reasons);
      } else {
        setErrors([
          {
            description: response.data.quote.CloverErrorResponse.errorMessage,
          },
        ]);
      }
      setLoader(false)
      setOpen(true);
    } else {
      setLoader(false)
      setQuote(response.data.quote);
      handleNext();
    }
  };

  return (
    <>
      <Box
        backgroundColor="#FFF"
        borderRadius="15px"
        p={{ xs: 4, lg: 4 }}
        sx={{ width: "95%" }}
      >
        <Typography sx={{ ...styles.title, mb: 3 }}>
          Coverage Selection
        </Typography>
        <App Data={Data} setData={setData} />
        <ErrorModal
          open={open}
          errors={errors}
          handleClose={() => setOpen(false)}
        />
      </Box>
      <Box>
        <Button
          className="button"
          onClick={handleSubmit}
          sx={styles.proceedButton}
        >
          Proceed
        </Button>
      </Box>
      <Backdrop
        open={loader} // Control when the loader is shown
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures it covers everything
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent grey background
        }}
      >
        <CircularProgress
          size={25}
          sx={{
            color: "#F55B1D", // Set the loader color here
          }}
        />
        <Typography sx={{ ml: 1 }}>Creating Quote...</Typography>
      </Backdrop>
    </>
  );
};

export default SectionTwoCoverge;

const styles = {
  labelBox: {
    backgroundColor: "#FFF",
    borderBottom: "1px solid rgba(69, 34, 98, 0.2)",
    position: "absolute",
    borderRadius: "0px 0px 4px 4px",
    marginLeft: "20px",
    marginTop: "-10px",
    padding: "4px 8px",
  },
  inputBox: {
    backgroundColor: "rgba(178, 178, 178, 0.15)",
    border: "1px solid rgba(69, 34, 98, 0.2)",
    borderRadius: "10px",
    padding: "28px",
  },
  textField: (errorField) => ({
    "& .MuiInputBase-root": {
      borderRadius: "10px",
      backgroundColor: errorField ? "rgb(255, 242, 241)" : undefined,
    },
    "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(245, 91, 29, 1)",
      borderRadius: "10px",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.6)",
    },
    ".MuiFormLabel-root": {
      fontFamily: "Arboria-Book",
      fontSize: "16px",
      letterSpacing: "0.00938em",
      fontWeight: 400,
      lineHeight: "1.375em",
      color: "#8a8a8a",
    },
    "& .MuiFormLabel-root": {
      color: errorField ? "rgb(255, 65, 54)" : undefined,
    },
    "& .MuiOutlinedInput-input": {
      padding: "13px 16px",
    },
  }),
  radioButton: {
    color: "rgba(69, 34, 98, 0.2)",
    "&.Mui-checked": {
      color: "#F55B1D",
    },
  },
  furtherQBox: {
    border: "1px solid rgba(69, 34, 98, 0.2)",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
  },
  formLabel: {
    fontFamily: "Arboria-Medium",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19.89px",
    color: "rgba(69, 34, 98, 1)",
  },
  title: {
    fontFamily: "Outfit",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "30.24px",
    textAlign: "left",
    color: "#452262",
  },
  description: {
    fontFamily: "Arboria-Medium",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "26.1px",
    textAlign: "left",
    color: "#000000",
  },
  caption: {
    fontFamily: "Arboria-Medium",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19.89px",
    textAlign: "left",
    marginTop: "0.25rem",
    color: "#000000",
  },
  itemLabel: {
    fontFamily: "Arboria-Book",
    fontSize: "12px",
    color: "#452262",
  },
  proceedButton: {
    backgroundImage: `url(${buttonBack.src})`,
    cursor: "pointer",
    fontWeight: 400,
    fontSize: 16,
    marginTop: "2rem",
    fontFamily: "Arboria-Medium",
    lineHeight: "19.16px",
    paddingLeft: "2rem",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    width: "172px",
    height: "40px",
    textAlign: "left",
    color: "#ffffff",
    transition: "transform 0.3s ease-in-out",
  },
};
