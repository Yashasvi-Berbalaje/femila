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
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// Constants for form fields

const FLOOR_CONSTRUCTION_TYPES = {
    "CONCRETE": "CONC",
    "MIXED": "MIXD",
    "STONE": "STON",
    "TILE": "TILE",
    "WOOD": "WOOD"
  }


const ROOF_CONSTRUCTION_TYPES = {
    "ASBESTOS": "ASBES",
    "CLAY TILE": "CLATI",
    "CONCRETE SLAB": "CONSL",
    "FIBRO": "FIBRO",
    "GLASS": "GLASS",
    "MEMBRANE ROOFING": "MEMRO",
    "METAL (ALUMINUM, COLOURBOND, IRON)": "METAL",
    "OTHERS": "OTHER",
    "SANDWICH PANEL / EPS": "SANEP",
    "SLATE TILE": "SLATE",
    "TERRACOTTA": "TERRA",
    "TIMBER": "TIMBA"
  }

  const WALL_CONSTRUCTION_TYPES = {
    "ASBESTOS": "ASBES",
    "BRICK": "BRICK",
    "BRICK VENEER": "BRIVE",
    "CONCRETE": "CONCR",
    "CURTAIN WALL": "CURWA",
    "FIBRO": "FIBRO",
    "MASONRY": "MASON",
    "METAL": "METAL",
    "OTHER SHEET PANEL CLADDING": "OTSPC",
    "OTHERS": "OTHER",
    "STONE": "STONE",
    "TIMBER": "TIMBE"
  }

  const FlOOR_TYPES = {
    "GROUND FLOOR": "GROFL",
    "1ST FLOOR": "1STFL",
    "2ND FLOOR OR ABOVE": "2NDFL"
  }

const CONSTRUCTION_FIELDS = [
    {
        id: "YearBuilt",
        label: "Year Built",
        type: "text",
        placeholder: "",
    },
    {
        id: "FloorConstruction_Name",
        label: "Floor Construction",
        type: "dropdown",
        options: ["CONCRETE", "MIXED", "STONE", "TILE", "WOOD"],
        placeholder: "Select Floor Construction",
    },
    {
        id: "RoofConstruction_Name",
        label: "Roof Construction",
        type: "dropdown",
        options: [
            "ASBESTOS",
            "CLAY TILE",
            "CONCRETE SLAB",
            "FIBRO",
            "GLASS",
            "MEMBRANE ROOFING",
            "METAL (ALUMINUM, COLOURBOND, IRON)",
            "OTHERS",
            "SANDWICH PANEL/EPS",
            "SLATE TILE",
            "TERRACOTTA",
            "TIMBER",
        ],
        placeholder: "Select Roof Construction",
    },
    {
        id: "WallConstruction_Name",
        label: "Wall Construction",
        type: "dropdown",
        options: [
            "ASBESTOS",
            "BRICK",
            "BRICK VENEER",
            "CONCRETE",
            "CURTAIN WALL",
            "FIBRO",
            "MASONRY",
            "METAL",
            "OTHER SHEET PANEL CLADDING",
            "OTHERS",
            "STONE",
            "TIMBER",
        ],
        placeholder: "Select Wall Construction",
    },
    {
        id: "SandwichPanelorEPS",
        label: "Sandwich Panel or EPS (%)",
        type: "text",
        placeholder: "Enter percentage",
    },
    {
        id: "NumberOfStoriesInTheBuilding",
        label: "Number of Stories",
        type: "dropdown",
        options: [...Array(20).keys()].map((i) => (i + 1).toString()), // Dropdown for 1 to 20
        placeholder: "Select Number of Stories",
    },
    {
        id: "AreAnyOfTheBuildingsHeritageListed",
        label: "Heritage Listing",
        type: "dropdown",
        options: ["yes", "no"],
        placeholder: "Select Heritage Listing",
    },
    {
        id: "LowestFloorYouOccupy_Name",
        label: "Lowest Floor You Occupy",
        type: "dropdown",
        options: ["GROUND FLOOR", "1ST FLOOR", "2ND FLOOR OR ABOVE"],
        placeholder: "Select Lowest Floor",
    },
    {
        id: "RiskInterestedParty",
        label: "Interested Party",
        type: "text",
        placeholder: "Enter Interested Party",
    },
];

const PropertyDetails = ({Data,setData}) => {
  const [formState, setFormState] = useState({
    addressLookup: "123 Main Street, Sydney",
    occupation: "Commercial Office",
    yearBuilt: "",
    floorConstruction: "",
    roofConstruction: "",
    wallConstruction: "",
    sandwichPanel: "",
    numberOfStories: "",
    heritageListing: "",
    lowestFloor: "",
    interestedParty: "",
  });
  const ADDRESS_FIELDS = [
    {
      id: "addressLookup",
      label: "Address Lookup",
      value: Data.PolicyCustomerList[0].FullAddress,
      readOnly: true,
    },
    {
      id: "occupation",
      label: "Occupation",
      value: Data.PolicyCustomerList[0].JobDescription,
      readOnly: true,
    },
  ];

  const [errors, setErrors] = useState({});

const handleChange = (field, value) => {
    let type_field = "";
    let type = "";

    if (field === "FloorConstruction_Name") {
        type_field = "FloorConstruction";
        type = FLOOR_CONSTRUCTION_TYPES[value];
    }
    if(field === "RoofConstruction_Name") {
        type_field = "RoofConstruction";
        type = ROOF_CONSTRUCTION_TYPES[value];
    }
    if(field === "WallConstruction_Name") {
        type_field = "WallConstruction";
        type = WALL_CONSTRUCTION_TYPES[value];
    }
    if(field === "LowestFloorYouOccupy_Name") {

        type_field = "LocatedFloor";
        type = FlOOR_TYPES[value];
    }

    setData((prevData) => {
        const updatedPolicyRisk = {
            ...prevData.PolicyLobList[0].PolicyRiskList[0],
            [field]: value,
        };

        if (type_field) {
            updatedPolicyRisk[type_field] = type;
        }

        return {
            ...prevData,
            PolicyLobList: [
                {
                    ...prevData.PolicyLobList[0],
                    PolicyRiskList: [updatedPolicyRisk],
                },
            ],
        };
    });
};

  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{4}$/.test(Data.PolicyLobList[0].PolicyRiskList[0].YearBuilt)) {
      newErrors["YearBuilt"] = "Year Built must be a 4-digit number";
    }

    if (!Data.PolicyLobList[0].PolicyRiskList[0].FloorConstruction_Name) {
      newErrors["FloorConstruction_Name"] = "Floor Construction is required";
    }

    if (!Data.PolicyLobList[0].PolicyRiskList[0].RoofConstruction_Name) {
      newErrors["RoofConstruction_Name"] = "Roof Construction is required";
    }

    if (!Data.PolicyLobList[0].PolicyRiskList[0].WallConstruction_Name) {
      newErrors["WallConstruction_Name"] = "Wall Construction is required";
    }

    if (!Data.PolicyLobList[0].PolicyRiskList[0].SandwichPanelorEPS) {
      newErrors["SandwichPanelorEPS"] = "Percentage for Sandwich Panel or EPS is required";
    }

    if (!Data.PolicyLobList[0].PolicyRiskList[0].NumberOfStoriesInTheBuilding) {
      newErrors["NumberOfStoriesInTheBuilding"] = "Number of Stories is required";
    }

    if (!Data.PolicyLobList[0].PolicyRiskList[0].AreAnyOfTheBuildingsHeritageListed) {
      newErrors["AreAnyOfTheBuildingsHeritageListed"] = "Heritage Listing is required";
    }

    if (!Data.PolicyLobList[0].PolicyRiskList[0].LowestFloorYouOccupy_Name) {
      newErrors["LowestFloorYouOccupy_Name"] = "Lowest Floor You Occupy is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <Box backgroundColor="#FFF">
      {/* Property Address Details */}
      <Typography sx={{ ...styles.title, mb: 3 }}>
        Property 1 Address Details
      </Typography>
      <Grid2 container spacing={3}>
        {ADDRESS_FIELDS.map((field, index) => (
          <Grid2 key={index} size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel sx={styles.formLabel}>{field.label}</FormLabel>
              <TextField
                fullWidth
                id={field.id}
                value={field.value}
                InputProps={{
                  readOnly: field.readOnly,
                }}
                sx={styles.textField()}
              />
            </FormControl>
          </Grid2>
        ))}
      </Grid2>

      {/* Property Construction Details */}
      <Typography sx={{ ...styles.title, mb: 3, mt: 4 }}>
        Property 1 Construction Details
      </Typography>
      <Grid2 container spacing={3}>
        {CONSTRUCTION_FIELDS.map((field, index) => (
          <Grid2 key={index} size={{ xs: 12, md: 6 }}>
            {field.type === "text" ? (
              <FormControl fullWidth>
                <FormLabel sx={styles.formLabel}>{field.label}</FormLabel>
                <TextField
                  fullWidth
                  id={field.id}
                  value={Data.PolicyLobList[0].PolicyRiskList[0][field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  error={!!errors[field.id]}
                  helperText={errors[field.id]}
                  sx={styles.textField()}
                  placeholder={field.placeholder}
                  InputProps={
                    field.id === "sandwichPanel" ? { endAdornment: <Typography>%</Typography> } : {}
                  }
                />
              </FormControl>
            ) : (
              <FormControl fullWidth>
                <FormLabel sx={styles.formLabel}>{field.label}</FormLabel>
                <Select
                  value={Data.PolicyLobList[0].PolicyRiskList[0][field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  displayEmpty
                  error={!!errors[field.id]}
                  sx={styles.textField()}
                >
                  <MenuItem value="" disabled>
                    {field.placeholder}
                  </MenuItem>
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors[field.id] && (
                  <Typography sx={{fontSize:'12px',marginLeft:2}} color="error">{errors[field.id]}</Typography>
                )}
              </FormControl>
            )}
          </Grid2>
        ))}
      </Grid2>

      {/* <Box mt={4} sx={{display:"flex",justifyContent:'end'}}>
        <Button
          onClick={handleSubmit}
          sx={styles.proceedButton}
        >
          Next
        </Button>
      </Box> */}
    </Box>
  );
};

export default PropertyDetails;

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