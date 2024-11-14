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

const LIMITS_OF_LIABILITY_VALUES = [
  { value: 10000000, label: "$10,000,000" },
  { value: 20000000, label: "$20,000,000" },
  { value: 5000000, label: "$5,000,000" },
];

const TAX_AUDIT_SUM_INSURED_VALUES = [
  { value: 0, label: "$0" },
  { value: 10000, label: "$10,000" },
  { value: 20000, label: "$20,000" },
  { value: 30000, label: "$30,000" },
  { value: 40000, label: "$40,000" },
  { value: 50000, label: "$50,000" },
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

const BusinessLiabilityCoverage = ({ Data, setData, ProductElementCode }) => {
  const [formState, setFormState] = useState({
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
      if (code === "") {
        coverage[field] = value;
        return updatedData;
      } else {
        const benefit = coverage.PolicyBenefitList.find(
          (benefit) => benefit.ProductElementCode == code
        );
        benefit[field] = value;
        return updatedData;
      }
    });
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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

        {/* Number of Employees */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Number of Employees</FormLabel>
            <TextField
              fullWidth
              id="numberOfEmployees"
              value={Data.NumberofEmployees}
              disabled
              sx={styles.textField()}
              placeholder="Number of Employees"
            />
          </FormControl>
        </Grid2>

        {/* Limits of Liability */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Limits of Liability</FormLabel>
            <Select
              value={getValue("B00863", "LimitOfLiability")}
              onChange={(e) =>
                updateDataArray("B00863", "LimitOfLiability", e.target.value)
              }
              displayEmpty
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>
                Select Limits of Liability
              </MenuItem>
              {LIMITS_OF_LIABILITY_VALUES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        {/* Annual Wages */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Annual Wages</FormLabel>
            <TextField
              fullWidth
              id="annualWages"
              value={getValue("", "AnnualWages")}
              onChange={(e) => updateDataArray("", "AnnualWages", e.target.value)}
              sx={styles.textField()}
              placeholder="Enter Annual Wages"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Property in Physical or Legal Care */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>
              Property in Your Physical or Legal Care
            </FormLabel>
            <TextField
              fullWidth
              id="physicalOrLegalCare"
              value={getValue("", "PropertyUnderYourCareorCustody")}
              onChange={(e) =>
                updateDataArray("", "PropertyUnderYourCareorCustody", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Property Value"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Contractor or Labour Hire Payments */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>
              Contractor or Labour Hire Payments
            </FormLabel>
            <TextField
              fullWidth
              id="labourHirePayments"
              value={getValue("", "ConctororLabourHirePaynts")}
              onChange={(e) =>
                updateDataArray("", "ConctororLabourHirePaynts", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Payments"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Tax Audit Sum Insured */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Tax Audit Sum Insured</FormLabel>
            <Select
              value={getValue("B00863", "TaxAuditSI")}
              onChange={(e) =>
                updateDataArray("B00863", "TaxAuditSI", e.target.value)
              }
              displayEmpty
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>
                Select Tax Audit Sum Insured
              </MenuItem>
              {TAX_AUDIT_SUM_INSURED_VALUES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        {/* Excess for Each Claim */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess for Each Claim</FormLabel>
            <Select
              value={getValue("B00863", "Excess")}
              onChange={(e) =>
                updateDataArray("B00863", "Excess", e.target.value)
              }
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

        {/* Interested Party */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Interested Party</FormLabel>
            <TextField
              fullWidth
              id="interestedParty"
              value={getValue("", "BLInterestedParty")}
              onChange={(e) =>
                updateDataArray("", "BLInterestedParty", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Interested Party"
            />
          </FormControl>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BusinessLiabilityCoverage;

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