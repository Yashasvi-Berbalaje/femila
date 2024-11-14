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
  IconButton,
  Grid2,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const CATEGORY_OPTIONS = [
  { value: "ASASE", label: "Amplifiers, speakers and sound equipment" },
  { value: "CLEQU", label: "Cleaning equipment" },
  { value: "COAMA", label: "Compressors and machinery" },
  { value: "LNAT", label: "Laptops, notepads and tablet" },
  { value: "MOPHO", label: "Mobile phones" },
  { value: "OFEQU", label: "Office equipment" },
  { value: "PAVEQ", label: "Photography and video equipment" },
  { value: "RAEQU", label: "Radio equipment" },
  { value: "SUEQU", label: "Surveying equipment" },
  { value: "TOOLS", label: "Tools" },
];

const PortableBusinessContentsSpecifiedItems = ({
  Data,
  setData,
  ProductElementCode,
}) => {
  const [errors, setErrors] = useState([]);


    // Adding one row using setData
    const handleAddRow = (index) => {
        setData((prevData) => {
            const updatedData = { ...prevData }; // Create a shallow copy of prevData

            const coverage = updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
                (coverage) => coverage.ProductElementCode === ProductElementCode
            );

            if (coverage) {
                // Check if the index already exists
                const existingItem = coverage.PolicyEntityList.find((item) => item.index === index);

                if (!existingItem) {
                    // If the index does not exist, push the new entity to PolicyEntityList
                    coverage.PolicyEntityList.push({
                        index: index,
                        ProductElementCode: "PROPERTYBUSINESSCONTENTSPECIFIEDITEMS",
                        Category: "LNAT",
                        Category_Name: "",
                        ItemsDescription: "",
                        ReplacementValue: "",
                    });
                }
            }

            console.log("updatedData", updatedData);

            // React will detect changes if new reference of `updatedData` is returned
            return { ...updatedData }; // Return a new reference to trigger React update
        });
    };


  const handleDeleteRow = (index) => {
    // Delete row using setData
    console.log("index", index);
    setData((prevData) => {
      const updatedData = { ...prevData };
      const coverage =
        updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
          (coverage) => coverage.ProductElementCode === ProductElementCode
        );

      if (coverage) {
        coverage.PolicyEntityList = coverage.PolicyEntityList.filter(
          (item, i) => item.index !== index
        );
      }

      console.log("updatedData", updatedData);

      return updatedData;
    });
  };

  const handleChange = (index, field, value) => {
    // Update row using setData
    setData((prevData) => {
      const updatedData = { ...prevData };
      const coverage =
        updatedData.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
          (coverage) => coverage.ProductElementCode === ProductElementCode
        );

      if (coverage) {
        coverage.PolicyEntityList[index][field] = value;
      }

      return updatedData;
    });
  };

  const validateForm = () => {
    const newErrors =
      Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode === ProductElementCode
      ).PolicyEntityList.map((item) => ({
        category: item.Category ? "" : "Category is required",
        description: item.ItemsDescription ? "" : "Description is required",
        replacementValue: item.ReplacementValue
          ? ""
          : "Replacement Value is required",
      }));
    setErrors(newErrors);
    return newErrors.every((error) => Object.values(error).every((e) => !e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", Data);
    }
  };

  return (
    <Box backgroundColor="#FFF">
      {Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode === ProductElementCode
      ).PolicyEntityList.map((item, index) => (
        <Grid2
          container
          spacing={2}
          mb={2}
          key={index}
          alignItems="center"
          justifyContent={"center"}
        >
          {/* Category Field */}
          <Grid2 item size={{ sm: 4 }}>
            <FormControl fullWidth>
              <FormLabel sx={styles.formLabel}>Category</FormLabel>
              <Select
                value={item.Category_Name}
                onChange={(e) => {
                  const selectedCategory = CATEGORY_OPTIONS.find(
                    (option) => option.label === e.target.value
                  );
                  handleChange(index, "Category_Name", e.target.value);
                  handleChange(index, "Category", selectedCategory.value);
                }}
                displayEmpty
                error={!!errors[index]?.category}
                sx={styles.textField()}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors[index]?.category && (
                <Typography color="error" sx={styles.errorText}>
                  {errors[index].category}
                </Typography>
              )}
            </FormControl>
          </Grid2>

          {/* Description Field */}
          <Grid2 item size={{ sm: 4 }}>
            <FormControl fullWidth>
              <FormLabel sx={styles.formLabel}>Description</FormLabel>
              <TextField
                fullWidth
                value={item.ItemsDescription}
                onChange={(e) =>
                  handleChange(index, "ItemsDescription", e.target.value)
                }
                error={!!errors[index]?.description}
                helperText={errors[index]?.description}
                sx={styles.textField()}
                placeholder="Enter Description"
              />
            </FormControl>
          </Grid2>

          {/* Replacement Value Field */}
          <Grid2 item size={{ sm: 3 }}>
            <FormControl fullWidth>
              <FormLabel sx={styles.formLabel}>Replacement Value</FormLabel>
              <TextField
                fullWidth
                value={item.ReplacementValue}
                onChange={(e) =>
                  handleChange(index, "ReplacementValue", e.target.value)
                }
                error={!!errors[index]?.replacementValue}
                helperText={errors[index]?.replacementValue}
                sx={styles.textField()}
                placeholder="Enter Value"
                InputProps={{
                  startAdornment: <span style={{ marginRight: "4px" }}>$</span>,
                }}
              />
            </FormControl>
          </Grid2>

          {/* Delete Icon */}
          <Grid2 item size={{ sm: 1 }}>
            <IconButton
              onClick={() => handleDeleteRow(item.index)}
              aria-label="delete"
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      ))}

      {/* Add Another Button */}
      <Box mt={4} sx={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={() => handleAddRow(Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
        (coverage) => coverage.ProductElementCode === ProductElementCode
      ).PolicyEntityList.at(-1)?.index+1 || 0)} sx={styles.addButton}>
          <AddIcon sx={{ marginRight: "8px" }} /> Add Another
        </Button>
      </Box>

      {/* Submit Button */}
      {/* <Box mt={4} sx={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={handleSubmit} sx={styles.proceedButton}>
          Submit
        </Button>
      </Box> */}
    </Box>
  );
};

export default PortableBusinessContentsSpecifiedItems;

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
  addButton: {
    backgroundColor: "#452262",
    color: "#FFF",
    fontWeight: 400,
    fontSize: 16,
    fontFamily: "Arboria-Medium",
    lineHeight: "19.16px",
    padding: "10px 20px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#6c4598",
    },
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
