"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid2,
} from "@mui/material";

const INDEMNITY_PERIOD_VALUES = [
  { value: "3M", label: "3 Months" },
  { value: "6M", label: "6 Months" },
  { value: "9M", label: "9 Months" },
  { value: "12M", label: "12 Months" },
  { value: "18M", label: "18 Months" },
  { value: "24M", label: "24 Months" },
  { value: "36M", label: "36 Months" },
];

const EXCESS_VALUES = [
  "250",
  "500",
  "750",
  "1000",
  "1250",
  "1500",
  "1750",
  "2000",
  "2500",
  "5000",
  "10000",
];

const BusinessInterruptionLimitsAndExcess = ({
  Data,
  setData,
  ProductElementCode,
}) => {
  const [formState, setFormState] = useState({
    indemnityPeriod: "",
    annualGrossProfit: "",
    additionalCostOfWork: "",
    claimPreparationCost: "",
    interestedParty: "",
    excess: "",
  });


  const getValue = (code, field) => {
    const data =
      Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
      );

    if (code === "") {
      return data[field];
    } else {
      const currentObject = data.PolicyBenefitList.find(
        (benefit) => benefit.ProductElementCode == code
      );
      return currentObject[field];
    }
  };

  const updateDataArray = (code, field, value) => {

    setData((prevData) => {
      const updatedData = { ...prevData };
      const coverage =
        updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
          (coverage) => coverage.ProductElementCode == ProductElementCode
        );
        if(code === ""){
            coverage[field] = value;
            return updatedData;
        }
        else{
      const benefit = coverage.PolicyBenefitList.find(
        (benefit) => benefit.ProductElementCode == code
      );
        benefit[field] = value;
        benefit["Turnover"]=Data.Turnover;
        return updatedData;
    }
      
    });
  };

  const updateInterestedParty = (value) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      const coverage =
        updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
          (coverage) => coverage.ProductElementCode == ProductElementCode
        );
      coverage.InterestedParty = value;
      return updatedData;
    });
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formState.annualGrossProfit) {
      newErrors.annualGrossProfit = "Annual Gross Profit is required";
    }
    if (!formState.excess) {
      newErrors.excess = "Excess is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formState);
    }
  };

  return (
    <Box backgroundColor="#FFF">
      <Grid2 container spacing={3}>
        {/* Annual Turnover */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Annual Turnover</FormLabel>
            <TextField
              fullWidth
              id="annualTurnover"
              value={Data.Turnover}
              disabled
              sx={styles.textField()}
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Indemnity Period */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Indemnity Period</FormLabel>
            <Select
              value={getValue("", "IndemnityPeriod_Name")}
              onChange={(e) => {
                const selectedPeriod = INDEMNITY_PERIOD_VALUES.find(
                  (option) => option.label === e.target.value
                );
                updateDataArray("","IndemnityPeriod_Name",selectedPeriod.label)
                updateDataArray("","IndemnityPeriod",selectedPeriod.value)
              }}
              displayEmpty
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>
                Select Indemnity Period
              </MenuItem>
              {INDEMNITY_PERIOD_VALUES.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        {/* Annual Gross Profit */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Annual Gross Profit</FormLabel>
            <TextField
              fullWidth
              id="annualGrossProfit"
              value={getValue("", "GrossProfit")}
              onChange={(e) =>
                updateDataArray("", "GrossProfit", e.target.value)
              }
              error={!!errors.annualGrossProfit}
              helperText={errors.annualGrossProfit}
              sx={styles.textField()}
              placeholder="Enter Annual Gross Profit"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Additional Increase Cost of Work */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>
              Additional Increase Cost of Work
            </FormLabel>
            <TextField
              fullWidth
              id="additionalCostOfWork"
              value={getValue("", "AdditionIncreaseCostOfWorking")}
              onChange={(e) =>
                updateDataArray("", "AdditionIncreaseCostOfWorking", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Additional Cost of Work"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Claim Preparation Cost */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Claim Preparation Cost</FormLabel>
            <TextField
              fullWidth
              id="claimPreparationCost"
              value={getValue("", "ClaimPreparationCost")}
              onChange={(e) =>
                updateDataArray("", "ClaimPreparationCost", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Claim Preparation Cost"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Interested Party */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Interested Party</FormLabel>
            <TextField
              fullWidth
              id="interestedParty"
              value={getValue("", "BIInterestedParty")}
              onChange={(e) => updateDataArray("", "BIInterestedParty", e.target.value)}
              sx={styles.textField()}
              placeholder="Enter Interested Party"
            />
          </FormControl>
        </Grid2>

        {/* Excess */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess</FormLabel>
            <Select
              value={getValue("B00864", "Excess")}
              onChange={(e) => updateDataArray("B00864", "Excess", e.target.value)}
              displayEmpty
              error={!!errors.excess}
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>
                Select Excess
              </MenuItem>
              {EXCESS_VALUES.map((value) => (
                <MenuItem key={value} value={value}>
                  ${value}
                </MenuItem>
              ))}
            </Select>
            {errors.excess && (
              <Typography color="error" sx={styles.errorText}>
                {errors.excess}
              </Typography>
            )}
          </FormControl>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BusinessInterruptionLimitsAndExcess;

const styles = {
  title: {
    fontFamily: "Outfit",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "30.24px",
    textAlign: "left",
    color: "#452262",
  },
  textField: () => ({
    "& .MuiInputBase-root": {
      borderRadius: "10px",
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
    "& .MuiOutlinedInput-input": {
      padding: "13px 16px",
    },
  }),
  formLabel: {
    fontFamily: "Arboria-Medium",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19.89px",
    marginBottom: 0.5,
    color: "rgba(69, 34, 98, 1)",
  },
  errorText: {
    fontSize: "12px",
    marginLeft: 2,
  },
};
