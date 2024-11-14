import React, { useState, useEffect } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  Button,
  Grid,
  Grid2,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// Claim types with CodeDisplayValue and CodeValue
const claimTypes = [
  { CodeDisplayValue: "Liability - Advertising Liability", CodeValue: "LIAAL" },
  { CodeDisplayValue: "Fire", CodeValue: "FIRE" },
  { CodeDisplayValue: "Impact", CodeValue: "IMPAC" },
  { CodeDisplayValue: "Earthquake or Tsunami", CodeValue: "EAOTS" },
  { CodeDisplayValue: "Explosion", CodeValue: "EXPLO" },
  { CodeDisplayValue: "Machinery Breakdown & Electronic Equipment", CodeValue: "MBEE" },
  { CodeDisplayValue: "Loss of access", CodeValue: "LOOAC" },
  { CodeDisplayValue: "Power Surge", CodeValue: "POWSU" },
  { CodeDisplayValue: "Cyclone", CodeValue: "CYCLO" },
  { CodeDisplayValue: "Escape of Liquid", CodeValue: "ESCLI" },
  { CodeDisplayValue: "Liability - Personal Injury", CodeValue: "LIAPI" },
  { CodeDisplayValue: "Theft or burglary", CodeValue: "THBU" },
  { CodeDisplayValue: "Portable Business Cover", CodeValue: "POBC" },
  { CodeDisplayValue: "Bushfire", CodeValue: "BUSHF" },
  { CodeDisplayValue: "Accidental loss or damage", CodeValue: "ACLOD" },
  { CodeDisplayValue: "Liability - Property damage", CodeValue: "LIAPD" },
  { CodeDisplayValue: "Civil Commotion or Riot", CodeValue: "CICOR" },
  { CodeDisplayValue: "Lightnight or thunderbolt", CodeValue: "LINOT" },
  { CodeDisplayValue: "Vandalism or Malicious Act", CodeValue: "VAMAL" },
  { CodeDisplayValue: "Glass Breakage", CodeValue: "GLABR" },
  { CodeDisplayValue: "Storm", CodeValue: "STORM" },
];

// Helper to generate the last 5 years
const generateLastFiveYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

const ClaimsComponent = ({ProductElementCode,Data,setData}) => {
  const [claims, setClaims] = useState([]);
  const [hasClaims, setHasClaims] = useState(false);

const getValue = () => {
    console.log("Data",Data)
    console.log("ProductElementCode",ProductElementCode)
    const data = Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
            (coverage) => coverage.ProductElementCode == ProductElementCode
    );
    return data.ClaimsInLastFiveYears;
};

const handleClaimsChange = (e) => {
    const selected = e.target.value === "Y";
    setHasClaims(selected);
    const updatedData = { ...Data };
    const coverage = updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode == ProductElementCode
    );
    coverage.ClaimsInLastFiveYears = e.target.value;
    setData(updatedData);
    if (selected && Data.PolicyLobList[0].PolicyEntityList.filter(
        (claim) => claim.ProductCoverageId === ProductElementCode
    ).length === 0) {
        addNewClaim(); // Automatically add one claim when "Yes" is selected
    }
};

  // Handle change for the Yes/No question
//   const handleClaimsChange = (e) => {
//     const selected = e.target.value === "Y";
//     setHasClaims(selected);
//     if (selected && claims.length === 0) {
//       addNewClaim(); // Automatically add one claim when "Yes" is selected
//     }
//   };

  // Handle adding new claim row
const addNewClaim = () => {
    setData({
        ...Data,
        PolicyLobList: [
            {
                ...Data.PolicyLobList[0],
                PolicyEntityList: [
                    ...Data.PolicyLobList[0].PolicyEntityList,
                    {
                        id: Date.now(),
                        ProductElementCode: "CLAIMS", // unique ID
                        ProductCoverageId: ProductElementCode,
                        DateOfLoss: "",
                        ClaimType_Name: "",
                        ClaimType: "",
                        LossAmount: "",
                    },
                ],
            },
        ],
    });

    // setClaims([
    //     ...claims,
    //     {
    //         id: Date.now(), // unique ID
    //         yearOfLoss: "",
    //         claimType: "",
    //         claimTypeCode: "",
    //         value: "",
    //     },
    // ]);
};

// Handle change for each claim
const handleClaimChange = (id, field, value) => {
    // const updatedClaims = claims.map((claim) =>
    //     claim.id === id ? { ...claim, [field]: value } : claim
    // );
    // setClaims(updatedClaims);

    const updatedData = { ...Data };
    // const coverage = updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
    //     (coverage) => coverage.ProductElementCode == ProductElementCode
    // );
    const PolicyEntityList = updatedData.PolicyLobList[0].PolicyEntityList.find(item => item.id === id);
    PolicyEntityList[field] = value;
    // const claimIndex = coverage.PolicyEntityList.findIndex((claim) => claim.id === id);
    // if (claimIndex !== -1) {
    //     coverage.PolicyEntityList[claimIndex] = {
    //         ...coverage.PolicyEntityList[claimIndex],
    //         [field === "yearOfLoss" ? "DateOfLoss" : field === "claimType" ? "ClaimType_Name" : field === "claimTypeCode" ? "ClaimType" : "LossAmount"]: value,
    //     };
    // }
    setData(updatedData);
};

  // Handle deletion of a claim
const deleteClaim = (id) => {
    const updatedData = { ...Data };
    updatedData.PolicyLobList[0].PolicyEntityList = updatedData.PolicyLobList[0].PolicyEntityList.filter((claim) => claim.id !== id);
    
    setData(updatedData);

};



  // Get available claim types excluding already selected types
const getAvailableClaimTypes = (id) => {
    const updatedData = { ...Data };
    const PolicyEntityList = updatedData.PolicyLobList[0].PolicyEntityList.filter(item => item.ProductCoverageId === ProductElementCode);
    // const coverage = updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
    //     (coverage) => coverage.ProductElementCode == ProductElementCode
    // );
    const selectedTypes = PolicyEntityList.filter((claim) => claim.id !== id).map((c) => c.ClaimType);
    return claimTypes.filter((type) => !selectedTypes.includes(type.CodeValue));
};

  return (
    <Box>
      {/* /* Ask Claims In Last Five Years */}
      <Typography variant="h6" sx={{ fontFamily: "Outfit",
    fontSize: "16px",
    fontWeight: 500,
    color: "#000",
    textAlign: "left"}}>Claims In Last Five Years?</Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={getValue()}
          onChange={handleClaimsChange}
        >
          <FormControlLabel
            value="Y"
            control={<Radio sx={{ color: '#F55B1D', '&.Mui-checked': { color: '#F55B1D' } }} />}
            label="Yes"
          />
          <FormControlLabel
            value="N"
            control={<Radio sx={{ color: '#F55B1D', '&.Mui-checked': { color: '#F55B1D' } }} />}
            label="No"
          />
        </RadioGroup>
      </FormControl>

      {/* Display claim fields only if Yes is selected */}
      {getValue()==="Y" && (
        <Box mt={4}>
          {Data.PolicyLobList[0].PolicyEntityList.filter(
        (claim) => claim.ProductCoverageId === ProductElementCode
    ).map((claim) => (
            <Grid2 container spacing={2} alignItems="center" key={claim.id} mb={2}>
              {/* Year of Loss */}
              <Grid2 item size={{ sm: 3}}>
                <TextField
                  select
                  label="Year of Loss"
                  value={claim.DateOfLoss}
                  onChange={(e) => handleClaimChange(claim.id, "DateOfLoss", e.target.value)}
                  fullWidth
                  required
                >
                  {generateLastFiveYears().map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>

              {/* Claim Type */}
              <Grid2 item size={{ sm: 4}}>
                <TextField
                  select
                  label="Claim Type"
                  value={claim.ClaimType_Name}
                  onChange={(e) => {
                    const selectedClaim = claimTypes.find((type) => type.CodeDisplayValue === e.target.value);
                    handleClaimChange(claim.id, "ClaimType_Name", selectedClaim.CodeDisplayValue);
                    handleClaimChange(claim.id, "ClaimType", selectedClaim.CodeValue);
                  }}
                  fullWidth
                  required
                >
                  {getAvailableClaimTypes(claim.id).map((type) => (
                    <MenuItem key={type.CodeValue} value={type.CodeDisplayValue}>
                      {type.CodeDisplayValue}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>

              {/* Value Field */}
              <Grid2 item size={{ sm: 4}}>
                <TextField
                  label="Claim Value"
                  value={claim.LossAmount}
                  onChange={(e) => handleClaimChange(claim.id, "LossAmount", e.target.value)}
                  InputProps={{
                    startAdornment: <Typography>$</Typography>,
                  }}
                  fullWidth
                  required
                  type="number"
                />
              </Grid2>

              {/* Delete Button */}
              <Grid2 item size={{ sm: 1}}>
                <IconButton onClick={() => deleteClaim(claim.id)} aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid2>
            </Grid2>
          ))}

          {/* Add Claim Button aligned to the right */}
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={addNewClaim}
              
              startIcon={<AddIcon />}
              sx={{ backgroundColor: '#F55B1D' }}
            >
           
              Add Claim
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ClaimsComponent;