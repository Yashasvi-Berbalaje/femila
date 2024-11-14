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
  Grid2
} from "@mui/material";

const EXCESS_VALUES = [
  "250", "500", "750", "1000", "1250", "1500", "1750", "2000", "2500", "5000", "10000"
];

const BuildingAndContentsLimits = ({Data,setData,ProductElementCode}) => {
  const [formState, setFormState] = useState({
    buildingSumInsured: "",
    buildingExcess: "",
    contentsSumInsured: "",
    contentsExcess: "",
    stockSumInsured: "",
    stockExcess: ""
  });
// Function to update Data array based on ProductElementCode
// const updateDataArray = (code, sumInsured, excess) => {
//     setData((prevData) =>
//         prevData.map((item) =>
//             item.ProductElementCode === code
//                 ? { ...item, SumInsured: sumInsured, Excess: excess }
//                 : item
//         )
//     );
// };

// Update formState based on Data prop
// useEffect(() => {
//     const buildingData = Data.find(item => item.ProductElementCode === "B00868");
//     const contentsData = Data.find(item => item.ProductElementCode === "B00869");
//     const stockData = Data.find(item => item.ProductElementCode === "B00870");

//     setFormState({
//         buildingSumInsured: buildingData?.SumInsured || "",
//         buildingExcess: buildingData?.Excess || "",
//         contentsSumInsured: contentsData?.SumInsured || "",
//         contentsExcess: contentsData?.Excess || "",
//         stockSumInsured: stockData?.SumInsured || "",
//         stockExcess: stockData?.Excess || ""
//     });
// }, [Data]);

const getValue = (code, field) => {
    const data = Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
    );
    const currentObject = data.PolicyBenefitList.find(
        (benefit) => benefit.ProductElementCode == code
    );
    return currentObject[field];
};

const updateDataArray = (code, field, value) => {
    setData((prevData) => {
        const updatedData = { ...prevData };
        const coverage = updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
            (coverage) => coverage.ProductElementCode == ProductElementCode
        );
        const benefit = coverage.PolicyBenefitList.find(
            (benefit) => benefit.ProductElementCode == code
        );
        benefit[field] = value;
        return updatedData;
    });
};




  const [errors, setErrors] = useState({});

//   const handleChange = (code,field, value) => {
//     setFormState((prev) => ({ ...prev, [field]: value }));
//   };

  const validateForm = () => {
    const newErrors = {};

    if (!getValue("B00868", "SumInsured")) {
      newErrors.buildingSumInsured = "Building Sum Insured is required";
    }
    if (!getValue("B00868", "Excess")) {
      newErrors.buildingExcess = "Building Excess is required";
    }
    if (!getValue("B00869", "SumInsured")) {
      newErrors.contentsSumInsured = "Contents Sum Insured is required";
    }
    if (!getValue("B00869", "Excess")) {
      newErrors.contentsExcess = "Contents Excess is required";
    }
    if (!getValue("B00870", "SumInsured")) {
      newErrors.stockSumInsured = "Stock Sum Insured is required";
    }
    if (!getValue("B00870", "Excess")) {
      newErrors.stockExcess = "Stock Excess is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const updatedPolicyBenefitList = [
            {
              ProductElementCode: "B00868", // For Building
              SumInsured: formState.buildingSumInsured,
              Excess: formState.buildingExcess
            },
            {
              ProductElementCode: "B00869", // For Contents
              SumInsured: formState.contentsSumInsured,
              Excess: formState.contentsExcess
            },
            {
              ProductElementCode: "B00870", // For Stock
              SumInsured: formState.stockSumInsured,
              Excess: formState.stockExcess
            }
        ];
      console.log("Form submitted successfully:", formState);
    }
  };

  return (
    <Box backgroundColor="#FFF">
      {/* Building Limits and Excess */}
      <Typography sx={{ ...styles.title, mb: 3 }}>Building Limits and Excess</Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Sum Insured</FormLabel>
            <TextField
              fullWidth
              id="buildingSumInsured"
              value={getValue("B00868","SumInsured")}
              onChange={(e) => updateDataArray("B00868", "SumInsured", e.target.value)}
              error={!!errors.buildingSumInsured}
              helperText={errors.buildingSumInsured}
              sx={styles.textField()}
              placeholder="Enter Building Sum Insured"
             
            />
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess</FormLabel>
            <Select
              value={getValue("B00868","Excess")}
              onChange={(e) => updateDataArray("B00868", "Excess", e.target.value)}
              displayEmpty
              error={!!errors.buildingExcess}
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>Select Excess</MenuItem>
              {EXCESS_VALUES.map((value) => (
                <MenuItem key={value} value={value}>
                  ${value}
                </MenuItem>
              ))}
            </Select>
            {errors.buildingExcess && (
              <Typography color="error" sx={styles.errorText}>{errors.buildingExcess}</Typography>
            )}
          </FormControl>
        </Grid2>
      </Grid2>

      {/* Contents Limit and Excess */}
      <Typography sx={{ ...styles.title, mb: 3, mt: 4 }}>Contents Limit and Excess</Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Sum Insured</FormLabel>
            <TextField
              fullWidth
              id="contentsSumInsured"
              value={getValue("B00869","SumInsured")}
              onChange={(e) => updateDataArray("B00869", "SumInsured", e.target.value)}
              error={!!errors.contentsSumInsured}
              helperText={errors.contentsSumInsured}
              sx={styles.textField()}
              placeholder="Enter Contents Sum Insured"
             
            />
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess</FormLabel>
            <Select
              value={getValue("B00869","Excess")}
              onChange={(e) => updateDataArray("B00869", "Excess", e.target.value)}
              displayEmpty
              error={!!errors.contentsExcess}
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>Select Excess</MenuItem>
              {EXCESS_VALUES.map((value) => (
                <MenuItem key={value} value={value}>
                  ${value}
                </MenuItem>
              ))}
            </Select>
            {errors.contentsExcess && (
              <Typography color="error" sx={styles.errorText}>{errors.contentsExcess}</Typography>
            )}
          </FormControl>
        </Grid2>
      </Grid2>

      {/* Stock Limit and Excess */}
      <Typography sx={{ ...styles.title, mb: 3, mt: 4 }}>Stock Limit and Excess</Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Sum Insured</FormLabel>
            <TextField
              fullWidth
              id="stockSumInsured"
              value={getValue("B00870","SumInsured")}
              onChange={(e) => updateDataArray("B00870", "SumInsured", e.target.value)}
              error={!!errors.stockSumInsured}
              helperText={errors.stockSumInsured}
              sx={styles.textField()}
              placeholder="Enter Stock Sum Insured"
             
            />
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess</FormLabel>
            <Select
              value={getValue("B00870","Excess")}
              onChange={(e) => updateDataArray("B00870", "Excess", e.target.value)}
              displayEmpty
              error={!!errors.stockExcess}
              sx={styles.textField()}
            >
              <MenuItem value="" disabled>Select Excess</MenuItem>
              {EXCESS_VALUES.map((value) => (
                <MenuItem key={value} value={value}>
                  ${value}
                </MenuItem>
              ))}
            </Select>
            {errors.stockExcess && (
              <Typography color="error" sx={styles.errorText}>{errors.stockExcess}</Typography>
            )}
          </FormControl>
        </Grid2>
      </Grid2>

      {/* Submit Button */}
      {/* <Box mt={4} sx={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={handleSubmit} sx={styles.proceedButton}>
          Submit
        </Button>
      </Box> */}
    </Box>
  );
};

export default BuildingAndContentsLimits;

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
  proceedButton: {
    backgroundImage: `url('/assets/img/buttonBack.svg')`,
    cursor: "pointer",
    fontWeight: 400,
    fontSize: 16,
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