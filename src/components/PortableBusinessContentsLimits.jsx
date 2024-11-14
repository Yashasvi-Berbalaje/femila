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

const PortableBusinessContentsLimits = ({Data,setData,ProductElementCode}) => {
  const [formState, setFormState] = useState({
    blanketCoverContent: "",
    blanketCoverStock: "",
    excess: "",
    interestedParty: ""
  });

  const getValue = (code, field) => {
    const data = Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
    );
    const currentObject = data.PolicyBenefitList.find(
        (benefit) => benefit.ProductElementCode == code
    );
    return currentObject[field];
};

const getInterestedpartValue = () => {
    const data = Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
    );
    return data.PBCInterestedParty;
}

const updateInterestedParty = (value) => {
    setData((prevData) => {
        const updatedData = { ...prevData };
        const coverage = updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
            (coverage) => coverage.ProductElementCode == ProductElementCode
        );
        coverage.PBCInterestedParty = value;
        return updatedData;
    });
}

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

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formState.blanketCoverContent) {
      newErrors.blanketCoverContent = "Blanket Cover Content is required";
    }
    if (!formState.excess) {
      newErrors.excess = "Excess is required";
    }
    if (!formState.blanketCoverStock) {
      newErrors.blanketCoverStock = "Blanket Cover Stock is required";
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
      {/* Blanket Cover Content */}

      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Blanket Cover Content (up to $2,500)</FormLabel>
            <TextField
              fullWidth
              id="blanketCoverContent"
              value={getValue("B00865","BlanketCoverContent")}
              onChange={(e) => updateDataArray("B00865","BlanketCoverContent", e.target.value)}
              error={!!errors.blanketCoverContent}
              helperText={errors.blanketCoverContent}
              sx={styles.textField()}
              placeholder="Enter Blanket Cover Content"
              InputProps={{
                startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
              }}
            />
          </FormControl>
        </Grid2>

        {/* Excess */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Excess</FormLabel>
            <Select
              value={getValue("B00866","Excess")}
              onChange={(e) => updateDataArray("B00866","Excess", e.target.value)}
              displayEmpty
              error={!!errors.excess}
              sx={styles.textField()}
             
            >
              <MenuItem value="" disabled>Select Excess</MenuItem>
              {EXCESS_VALUES.map((value) => (
                <MenuItem key={value} value={value}>
                  ${value}
                </MenuItem>
              ))}
            </Select>
            {errors.excess && (
              <Typography color="error" sx={styles.errorText}>{errors.excess}</Typography>
            )}
          </FormControl>
        </Grid2>
     

      {/* Blanket Cover Stock */}
     
    
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={styles.formLabel}>Blanket Cover Stock(up to $2,500)</FormLabel>
            <TextField
              fullWidth
              id="blanketCoverStock"
              value={getValue("B00866","BlanketCoverStock")}
              onChange={(e) => updateDataArray("B00866","BlanketCoverStock", e.target.value)}
              error={!!errors.blanketCoverStock}
              helperText={errors.blanketCoverStock}
              sx={styles.textField()}
              placeholder="Enter Blanket Cover Stock"
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
              value={getInterestedpartValue()}
              onChange={(e) => updateInterestedParty(e.target.value)}
              sx={styles.textField()}
              placeholder="Enter Interested Party"
            />
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

export default PortableBusinessContentsLimits;

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