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

const BLANKET_COVER_VALUES = [
  { value: 10000, label: "$10,000" },
  { value: 20000, label: "$20,000" },
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

const EquipmentBreakdownLimitsAndExcess = ({ Data, setData, ProductElementCode }) => {
  const [formState, setFormState] = useState({
    blanketCover: "",
    deteriorationOfStock: "",
    increasedCostOfWorking: "",
    numberOfMachines: "",
    excessMachinery: "",
    computers: "",
    portableEquipment: "",
    otherEquipment: "",
    excessElectronic: "",
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

    if (!formState.blanketCover) {
      newErrors.blanketCover = "Blanket Cover is required";
    }
    if (!formState.numberOfMachines) {
      newErrors.numberOfMachines = "Number of Machines is required";
    }
    if (!formState.excessMachinery) {
      newErrors.excessMachinery = "Excess is required for Machinery Breakdown";
    }
    if (!formState.excessElectronic) {
      newErrors.excessElectronic = "Excess is required for Electronic Equipment";
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
      {/* Heading 1: Machinery Breakdown */}
      <Typography sx={styles.title}>Machinery Breakdown</Typography>
      <Grid2 container spacing={3}>
        {/* Blanket Cover */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Blanket Cover</FormLabel>
            <Select
              value={getValue("B00874", "BlanketCover")}
              onChange={(e) => updateDataArray("B00874", "BlanketCover", e.target.value)}
              displayEmpty
              error={!!errors.blanketCover}
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>
                Select Blanket Cover
              </MenuItem>
              {BLANKET_COVER_VALUES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.blanketCover && (
              <Typography color="error" sx={styles.errorText}>
                {errors.blanketCover}
              </Typography>
            )}
          </FormControl>
        </Grid2>

        {/* Deterioration of Stock */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Deterioration of Stock</FormLabel>
            <TextField
              fullWidth
              id="deteriorationOfStock"
              value={getValue("B00874", "DeteriorationOfStock")}
              onChange={(e) =>
                updateDataArray("B00874", "DeteriorationOfStock", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Deterioration of Stock"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Increased Cost of Working */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Increased Cost of Working</FormLabel>
            <TextField
              fullWidth
              id="increasedCostOfWorking"
              value={getValue("B00874", "ICOWIncreasedCostofWorking")}
              onChange={(e) =>
                updateDataArray("B00874", "ICOWIncreasedCostofWorking", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Increased Cost of Working"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Number of Machines */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Number of Machines</FormLabel>
            <TextField
              fullWidth
              id="numberOfMachines"
              value={getValue("B00874", "NumberofMachines")}
              onChange={(e) => updateDataArray("B00874", "NumberofMachines", e.target.value)}
              error={!!errors.numberOfMachines}
              helperText={errors.numberOfMachines}
              sx={styles.textField()}
              placeholder="Enter Number of Machines"
            />
          </FormControl>
        </Grid2>

        {/* Excess for Machinery Breakdown */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess</FormLabel>
            <Select
              value={getValue("B00874", "Excess")}
              onChange={(e) => updateDataArray("B00874", "Excess", e.target.value)}
              displayEmpty
              error={!!errors.excessMachinery}
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
            {errors.excessMachinery && (
              <Typography color="error" sx={styles.errorText}>
                {errors.excessMachinery}
              </Typography>
            )}
          </FormControl>
        </Grid2>
      </Grid2>

      {/* Heading 2: Electronic Equipment */}
      <Typography sx={styles.title}>Electronic Equipment</Typography>
      <Grid2 container spacing={3}>
        {/* Computers */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Computers</FormLabel>
            <TextField
              fullWidth
              id="computers"
              value={getValue("B00875", "ComputerLimit")}
              onChange={(e) => updateDataArray("B00875", "ComputerLimit", e.target.value)}
              sx={styles.textField()}
              placeholder="Enter Computers Value"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Portable Electronic Equipment */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Portable Electronic Equipment</FormLabel>
            <TextField
              fullWidth
              id="portableEquipment"
              value={getValue("B00875", "PortableElectronicEquipment")}
              onChange={(e) =>
                updateDataArray("B00875", "PortableElectronicEquipment", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Portable Electronic Equipment Value"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Other Electronic Equipment */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Other Electronic Equipment</FormLabel>
            <TextField
              fullWidth
              id="otherEquipment"
              value={getValue("B00875", "OtherElectronicEquipment")}
              onChange={(e) =>
                updateDataArray("B00875", "OtherElectronicEquipment", e.target.value)
              }
              sx={styles.textField()}
              placeholder="Enter Other Electronic Equipment Value"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Excess for Electronic Equipment */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess</FormLabel>
            <Select
              value={getValue("B00875", "Excess")}
              onChange={(e) => updateDataArray("B00875", "Excess", e.target.value)}
              displayEmpty
              error={!!errors.excessElectronic}
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
            {errors.excessElectronic && (
              <Typography color="error" sx={styles.errorText}>
                {errors.excessElectronic}
              </Typography>
            )}
          </FormControl>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default EquipmentBreakdownLimitsAndExcess;

const styles = {
  title: {
    fontFamily: "Outfit",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "30.24px",
    textAlign: "left",
    color: "#452262",
    marginBottom: "16px",
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