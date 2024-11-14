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
import buttonBack from "../../public/assets/img/buttonBack.svg";
import Image from "next/image";
import axiosInstance from "./axiosInstance";
import dayjs from "dayjs";
import AddressSearch from "./AddressSeach";
import { px } from "framer-motion";
import Codes from "./Codes.json"

// Business Description Options
const businessDescriptions = [...Object.keys(Codes)
  // { value: "retail", label: "Retail" },
  // { value: "technology", label: "Technology" },
  // { value: "manufacturing", label: "Manufacturing" },
  // Add more business descriptions as needed
];



const coverageOptions = [
  { id: 0, label: "Business Liability" },
  { id: 1, label: "Business Interruption" },
  { id: 2, label: "Portable Business Content" },
  { id: 3, label: "Business Building and Contents" },
  { id: 4, label: "Equipment Breakdown" },
  { id: 5, label: "Theft, Money and Glass" },
];

// ANZIC Code Options
const anzicCodes = [
  ...Object.values(Codes)
];

const CalendarIcon = () => (
  <div
    style={{
      marginRight: "4px",
    }}
  >
    <Image src={Calendar} alt="Calendar" />
  </div>
);

const styles = {
  coverageBox: (isSelected) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    // padding: "10px",
    px:3,
    border: `2px solid ${isSelected ? "rgba(245, 91, 29, 0.3)" : "rgba(174, 173, 172, 0.2)"}`,
    backgroundColor: isSelected ? "rgba(245, 91, 29, 0.3)" : "rgba(174, 173, 172, 0.2)",
    color: isSelected ? "#000" : "#000",
    cursor: "pointer",
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: 500,
    fontSize: "16px",
    minHeight: "40px",
    
  }),
  textField: (error) => ({
    "& .MuiFormLabel-root": {
      color: error ? "rgb(255, 65, 54)" : "#8a8a8a",
    },
    "& .MuiInputBase-root": {
      borderRadius: "12px",
      backgroundColor: error ? "rgb(255, 242, 241)" : "#fff",
    },
    "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba  (245, 91, 29, 1)",
      borderRadius: "12px",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.6)",
    },
    fontFamily: "Outfit",
    fontSize: "16px",
    letterSpacing: "0.00938em",
    fontWeight: 400,
    lineHeight: "1.4375em",
  }),
  selectField: (error) => ({
    ".MuiInputLabel-root": {
      fontFamily: "Outfit",
      fontSize: "16px",
      letterSpacing: "0.00938em",
      fontWeight: 400,
      lineHeight: "1.4375em",
      color: error ? "rgb(255, 65, 54)" : "#8a8a8a",
    },
    "&.MuiInputBase-root": {
      borderRadius: "12px",
      backgroundColor: error ? "rgb(255, 242, 241)" : "#fff",
    },
    ".MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(245, 91, 29, 1) !important",
      borderRadius: "12px",
    },
    ".MuiFormLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.6) !important",
    },
    ".MuiMenuItem-root": {
      fontFamily: "Outfit !important",
    },
    fontFamily: "Outfit",
    fontSize: "16px",
    letterSpacing: "0.00938em",
    fontWeight: 400,
    lineHeight: "1.4375em",
  }),
};

const SectionOneCoverge = ({ handlenext, Data, setData }) => {
  const [errors, setErrors] = useState({});
  // const [selectedCoverages, setSelectedCoverages] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (Data.selectedCoverages.length === 0) newErrors.coverages = "Please select at least one coverage.";
    if(Data.selectedCoverages.includes(0) && Data.selectedCoverages.includes(1)) {
      if(!Data.selectedCoverages.includes(3)) {
          newErrors.coverages = "Please select Business Building and Contents"
      }
    }
    else if(Data.selectedCoverages.includes(2) ){
      if(!Data.selectedCoverages.includes(3) && !Data.selectedCoverages.includes(0)) {
          newErrors.coverages = "Please select Business Building and Contents or Business Liability"
      }   
    }
    else if(Data.selectedCoverages.includes(1) ){
      if(!Data.selectedCoverages.includes(3)) {
          newErrors.coverages = "Please select Business Building and Contents"
    }
    else if(Data.selectedCoverages.includes(4) ){

      if(!Data.selectedCoverages.includes(0) && !Data.selectedCoverages.includes(3)) {
          newErrors.coverages = "Please select Business Building and Contents or Business Liability"
      }

    }else if(Data.selectedCoverages.includes(5) ){

      if(!Data.selectedCoverages.includes(0) && !Data.selectedCoverages.includes(3)) {
          newErrors.coverages = "Please select Business Building and Contents or Business Liability"
      }

    }
  }

    if(Data.ABN && Data.ABN.length!==11){
      newErrors.abn = "ABN should be 11 digits";
    }
    if (!Data.EffectiveDate)
      newErrors.effectiveDate = "Effective Date is required";
    if (!Data.ExpiryDate) newErrors.expiryDate = "Expiry Date is required";
    if (!Data.BusinessName)
      newErrors.businessName = "Business Name is required";
    if (!Data.JobDescription)
      newErrors.businessDescription = "Business Description is required";
    if (!Data.ANZSICCode) newErrors.anzicCode = "ANZIC Code is required";
    if (!Data.Turnover)
      newErrors.annualTurnover = "Annual Turnover is required";
    if (!Data.NumberofEmployees)
      newErrors.numEmployees = "Number of Employees is required";
    if (!Data.YearBusinessStarted)
      newErrors.yearBusinessStarted = "Year Business Started is required";
    if(!Data.PolicyCustomerList[0].FullAddress)
      newErrors.addressSearch = "Full Address is required";
    if(!Data.PolicyLobList[0].PolicyRiskList[0].LocationType_Name)
      newErrors.locationType = "Location Type is required";
    if(!Data.PolicyLobList[0].PolicyRiskList[0].TypeOfBusiness_Name)
      newErrors.businessType = "businessType";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      handlenext();
    } else {
      console.log("Form has errors.");
    }
  };
  const handleCoverageSelection = (id) => {
    console.log("Selected Coverage: ", id);
    if (Data.selectedCoverages.includes(id)) {
      setData({...Data,selectedCoverages:Data.selectedCoverages.filter((coverage) => coverage !== id)});
    } else {
      setData({ ...Data, selectedCoverages: [...Data.selectedCoverages, id] });
    }
  };
   
  const getABNDetails = async (abn) => {
    const response = await axiosInstance.post("/companyprofile", { abn: abn });

    if (response.data.success) {
      if (
        response.data.companyprofile?.providerResponse?.["soap:Envelope"]?.[
          "soap:Body"
        ]?.["RiskPlusResponseType"]
      ) {
        const RiskPlusResponseType =
          response.data.companyprofile.providerResponse["soap:Envelope"][
            "soap:Body"
          ]["RiskPlusResponseType"];
        setData({
          ...Data,
          ABN: abn,
          BusinessName: RiskPlusResponseType["Name"],
          JobDescription: RiskPlusResponseType["AnzSic"]["IndustryDescription"],
          ANZSICCode: RiskPlusResponseType["AnzSic"]["Industry"],
          Turnover: RiskPlusResponseType["Finance"]["Revenue"],
          NumberofEmployees:
            RiskPlusResponseType["Operations"]["NumberOfEmployees"],
          YearBusinessStarted: dayjs(
            RiskPlusResponseType["Age"]["YearStarted"]
          ),
          YearsInBusiness: RiskPlusResponseType["Age"]["EntityAge"],

          PolicyCustomerList:[
            {
              ...Data.PolicyCustomerList[0],
              "CustomerName":RiskPlusResponseType["Name"],
              "JobDescription":RiskPlusResponseType["AnzSic"]["IndustryDescription"],
              "ANZSICCode":RiskPlusResponseType["AnzSic"]["Industry"],

            }
          ]



        });
      }
    }
  };

  return (
    <>
      <Box backgroundColor={"#FFF"} borderRadius={"15px"} p={{ xs: 4, lg: 8 }}>
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "30.24px",
            textAlign: "left",
            color: "#452262",
          }}
        >
          Coverage Selection
        </Typography>
        <Box mt={4}>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              <Grid2 size={12}>
                <TextField
             
                  id="abn"
                  name="abn"
                  label="ABN"
                  type="number"
                  
                  fullWidth
                  error={!!errors.abn}
                  helpertext={errors.abn}
                  value={Data.ABN}
                  onChange={(e) => {
                    if(e.target.value.length<=11){
                    if (e.target.value.length === 11) {
                      getABNDetails(e.target.value);
                    }
                    setData({ ...Data, ABN: e.target.value });
                  }
                  }}
                  sx={styles.textField(!!errors.abn)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    required
                    label="Effective Date*"
                    value={Data.EffectiveDate}
                    onChange={(newValue) =>{
                      const effectiveDate = dayjs(newValue);
                      const expiryDate = effectiveDate.add(365, 'day');
                      setData({ ...Data, EffectiveDate: newValue, ExpiryDate:expiryDate})
                    }
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.effectiveDate}
                        helpertext={errors.effectiveDate}
                        sx={styles.textField(!!errors.effectiveDate)}
                      />
                    )}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disabled
                    required
                    label="Expiry Date*"
                    value={Data.ExpiryDate}
                    onChange={(newValue) =>
                      setData({ ...Data, ExpiryDate: newValue })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.expiryDate}
                        helpertext={errors.expiryDate}
                        sx  ={styles.textField(!!errors.expiryDate)}
                      />
                    )}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  required
                  id="businessName"
                  name="businessName"
                  label="Business Name"
                  fullWidth
                  value={Data.BusinessName}
                  onChange={(e) => {
                    setData((prev)=> {
                      let data = prev;
                      data["BusinessName"] = e.target.value;
                      data["PolicyCustomerList"][0].CustomerName = e.target.value;
                      return { ...data }
                    })
                  }}
                  error={!!errors.businessName}
                  helpertext={errors.businessName}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Image src={Bussiness} alt="Business" />
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField(!!errors.businessName)}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, lg: 6 }}>
                <FormControlSelect
                  options={businessDescriptions.map((description) => ({
                    value: description,
                    label: description,
                  }))}
                  label="Business Description*"
                  value={Data.JobDescription}
                  
                  onChange={(e) =>
                    setData({ ...Data, JobDescription: e.target.value,ANZSICCode:Codes[e.target.value],PolicyCustomerList:[{...Data.PolicyCustomerList[0],JobDescription:e.target.value,ANZSICCode:Codes[e.target.value]}] })
                  }
                  IconComponent={(_props) => (
                    <div
                      style={{
                        marginRight: "15px",
                      }}
                    >
                      <Image src={Dropdown} alt="Dropdown" />
                    </div>
                  )}
                  error={!!errors.businessDescription}
                  helpertext={errors.businessDescription}
                  sx={
                    (styles.selectField(!!errors.businessDescription),
                    {
                      fontFamily: "Outfit !important",
                    })
                  }
                />
              </Grid2>

              <Grid2 size={{ xs: 12, lg: 6 }}>
                <FormControlSelect
                  options={anzicCodes.map((code) => ({
                    value: code,
                    label: code,
                  }))}
                  disabled={true}
                  label="ANZIC Code*"
                  value={Data.ANZSICCode}
                  onChange={(e) =>
                    setData({ ...Data, ANZSICCode: e.target.value })
                  }
                  
                  IconComponent={(_props) => (
                    <div
                      style={{
                        marginRight: "15px",
                      }}
                    >
                      <Image src={Dropdown} alt="Dropdown" />
                    </div>
                  )}
                  error={!!errors.anzicCode}
                  helpertext={errors.anzicCode}
                  sx={styles.selectField(!!errors.anzicCode)}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  required
                  id="annualTurnover"
                  name="annualTurnover"
                  label="Annual Turnover"
                  fullWidth
                  value={Data.Turnover}
                  onChange={(e) =>
                    setData({ ...Data, Turnover: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Image src={Price} alt="Price" />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.annualTurnover}
                  helpertext={errors.annualTurnover}
                  sx={styles.textField(!!errors.annualTurnover)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <TextField
                  required
                  id="numEmployees"
                  name="numEmployees"
                  label="Number of Employees"
                  fullWidth
                  value={Data.NumberofEmployees}
                  onChange={(e) =>
                    setData({ ...Data, NumberofEmployees: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Image src={People} alt="People" />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.numEmployees}
                  helpertext={errors.numEmployees}
                  sx={styles.textField(!!errors.numEmployees)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, lg: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    view="year"
                    views={["year"]}
                    disableFuture
                    required
                    label="Year Business Started*"
                    value={Data.YearBusinessStarted}
                    onChange={(newValue) =>
                      setData({
                        ...Data,
                        YearBusinessStarted: newValue.startOf("year"),
                      })
                    }
                    error={!!errors.yearBusinessStarted}
                    helpertext={errors.yearBusinessStarted}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={styles.textField(!!errors.yearBusinessStarted)}
                      />
                    )}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid2>
            </Grid2>
            <AddressSearch
              Data={Data}
              setData={setData}
              errors={errors}
              setErrors={setErrors}
              styles={styles}
            />
          </form>
        </Box>

        <Typography
          sx={{
            fontFamily: "Outfit",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "30.24px",
            textAlign: "left",
            color: "#452262",
            mt:3
          }}
        >
          Coverage Selection
        </Typography>

        {/* Coverage Boxes */}
        <Box mt={2}>
          <Grid2 container spacing={1}>
            {coverageOptions.map((coverage) => (
              <Grid2 key={coverage.id} xs={12} sm={4} lg={4} >
                <Box
                  sx={styles.coverageBox(Data.selectedCoverages.includes(coverage.id))}
                  onClick={() => handleCoverageSelection(coverage.id)}
                >
                  {coverage.label}
                </Box>
              </Grid2>
            ))}
          </Grid2>
          {errors.coverages && (
            <Typography color="error" variant="body2" mt={2}>
              {errors.coverages}
            </Typography>
          )}
        </Box>
      </Box>
      <Box>
        <Button
          className="button"
          onClick={handleSubmit}
          style={{
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
          }}
        >
          Proceed
        </Button>
      </Box>
    </>
  );
};

export default SectionOneCoverge;
