import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid2,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // MUI Search Icon

import axiosInstance from "./axiosInstance";

// Address fields
const addressFields = {
  streetNumber: "",
  streetName: "",
  streetType: "",
  townSuburb: "",
  stateTerritory: "",
  postcode: "",
  locationType: "",
  businessType: "",
};

const locationTypes = [
  { value: "Modern Office Block", label: "Modern Office Block" },
  { value: "Normal Property", label: "Normal Property" },
  { value: "Secured Shopping Center", label: "Secured Shopping Center" },
];

const businessTypes = [
  { value: "Business operations only", label: "Business operations only" },
  { value: "Property owner only", label: "Property owner only" },
  { value: "Property owner and business operation", label: "Property owner and business operation" },
];

const AddressSearch = ({ Data, setData, errors, setErrors, styles }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isManualEntry, setIsManualEntry] = useState(false);

  // Handle address search API
  const handleSearch = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axiosInstance.post(`/address`, 
            {
                "address": {
                    "freeFormAddress": query,
                },
            }
           // You can replace this with the actual API you're using
        );
        setSearchResults(response.data.quote.providerResponse); // Replace with actual API structure
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
  };

  const ReturnFieldValue = (field,Elements) => {
      // Elememts is an list with objects containg the Product , Field , Value  if field matches return value
      
        for (let i = 0; i < Elements.length; i++) {
            if(Elements[i].Field === field){
                return Elements[i].Value;
            }
        }
  }

  useEffect(() => {

    console.log("Data Cahnged",Data);
  }, [Data]);

  const GetAddress = async (gnafPid) => {
    try {
        const response = await axiosInstance.post(`/address`, 
            {
                "address": {
                    "gnafPid": gnafPid,
                },
                "typeOfRequest": "GNF_TOKEN",
            }
           // You can replace this with the actual API you're using
        );
        if(response.data.success){
            const Elememts = response.data.quote.providerResponse.Elements
            console.log("Elements",Elememts);
            console.log("Response",response.data.quote.addressInfo)
            setData({ 
              ...Data, 
              PolicyCustomerList: [
                {
                   ...Data.PolicyCustomerList[0],
                    "AddressLine1": response.data.quote.addressInfo[0].addressLine1,
                    "AddressLine2": response.data.quote.addressInfo[0].addressLine2,
                    "StreetName": response.data.quote.addressInfo[0].street,
                    "City": response.data.quote.addressInfo[0].city,
                    "StateOrProvinceCode": ReturnFieldValue("State", Elememts),
                    "PostalCode": response.data.quote.addressInfo[0].postalCode,
                    "CountryCode": response.data.quote.addressInfo[0].countryCode,
                    "AddressTypeCode": ReturnFieldValue("address_type", Elememts),
                    "Territory": response.data.quote.addressInfo[0].countryCode + "-" + ReturnFieldValue("State", Elememts),
                    "Latitude": response.data.quote.addressInfo[0].latitude,
                    "Longitude": response.data.quote.addressInfo[0].longitude,
                    "GnafPID": gnafPid,
                    "IsManualAddress": "false",
                    "FullAddress": response.data.quote.providerResponse.GNAF_Address,
                },
              ],
              PolicyLobList: [
                {
                    ...Data.PolicyLobList[0],
                    PolicyRiskList: [{
                        ...Data.PolicyLobList[0].PolicyRiskList[0],
                        "AddressLine1": response.data.quote.addressInfo[0].addressLine1,
                        "AddressLine2": response.data.quote.addressInfo[0].addressLine2,
                        "City": response.data.quote.addressInfo[0].city,
                        "StateOrProvinceCode": ReturnFieldValue("State", Elememts),
                        "PostalCode": response.data.quote.addressInfo[0].postalCode,
                        "CountryCode": response.data.quote.addressInfo[0].countryCode,
                        "AddressTypeCode": ReturnFieldValue("address_type", Elememts),
                        "Territory": response.data.quote.addressInfo[0].countryCode + "-" + ReturnFieldValue("State", Elememts),
                        "Latitude": response.data.quote.addressInfo[0].latitude,
                        "Longitude": response.data.quote.addressInfo[0].longitude,
                        "GnafPID": gnafPid,
                        "IsManualAddress": "false",
                        "Flood_FL_rate_SME_Cts": ReturnFieldValue("Flood_rate_Res_Cts", Elememts),
                        "Flood_FL_rate_SME_Bld": ReturnFieldValue("Flood_rate_Res_Bld", Elememts),
                        "Bushfire_risk_score": ReturnFieldValue("bushfire_risk_score", Elememts),
                        "Cyclone_risk_score": ReturnFieldValue("cyclone_risk_score", Elememts),
                        "NoOfLevel": ReturnFieldValue("no_levels", Elememts),
                        "Storm_risk_score_SME_Bld": ReturnFieldValue("storm_risk_score_SME_Bld", Elememts),
                        "Storm_risk_score_SME_Cts": ReturnFieldValue("storm_risk_score_SME_Cts", Elememts),
                        "Bld_elevation": ReturnFieldValue("bld_elevation", Elememts),
                        "Flood_FL_ARI_GL": ReturnFieldValue("flood_FL_ARI_GL", Elememts),
                    }]
                }
            ]
            })
        }
        // setSearchResults(response.data.quote.providerResponse); // Replace with actual API structure
      } catch (error) {
        console.error("Error fetching address:", error);
      }
  }

  // Toggle manual address entry
  const toggleManualEntry = () => {

    const manualAddress = Data.PolicyCustomerList[0].IsManualAddress==="false"?"true":"false";

    console.log("came to manual entry")
    setData({ ...Data, PolicyCustomerList:[{
        ...Data.PolicyCustomerList[0],
        "IsManualAddress":manualAddress
    }],
    PolicyLobList: [
        {
            ...Data.PolicyLobList[0],
            PolicyRiskList: [{
                ...Data.PolicyLobList[0].PolicyRiskList[0],
                "IsManualAddress":manualAddress
            }]
        }
    ]
});
    // if (!isManualEntry) {
    //   // Reset address fields when switching to manual entry
    //   setData({ ...Data, ...addressFields });
    // }
  };

  return (
    <>
      <Grid2 size={{ xs: 12, lg: 12 }} sx={{mt:3}}>
        <TextField
          required={!isManualEntry}
          id="searchAddress"
          label="Search Address"
          fullWidth
          value={Data.PolicyCustomerList[0].FullAddress}
          onChange={(e) => {
            setData({ ...Data, PolicyCustomerList:[{
                ...Data.PolicyCustomerList[0],
                "FullAddress": e.target.value
            }],
            });
            handleSearch(e.target.value);
          }}
          error={!!errors.addressSearch }
          helperText={ errors.addressSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon style={{ color: "#8a8a8a" }} />
              </InputAdornment>
            ),
          }}
          sx={styles.textField(!!errors.addressSearch)}
        />

        {/* Show dropdown results */}
        {searchResults.length > 0 && (
          <Box>
            {searchResults.map((result) => (
              <MenuItem
                key={result.place_id}
                onClick={() => {
                    GetAddress(result.GNAF_PID);
                //   setData({ ...Data, addressSearch: result.formatted_address });
                  setSearchResults([]);
                }}
              >
                {result.Address}
              </MenuItem>
            ))}
          </Box>
        )}
      </Grid2>

      {/* Manual Address Entry */}
      {/* <FormControlLabel
        control={
          <Checkbox checked={Data.PolicyCustomerList[0].IsManualAddress!=="false"} onChange={toggleManualEntry} />
        }
        label="Enter address manually"
        sx={{ marginTop: "0.2rem" }}
      />

      {Data.PolicyCustomerList[0].IsManualAddress==="true" && (
        <>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                required={isManualEntry}
                id="streetNumber"
                name="streetNumber"
                label="Street Number"
                fullWidth
                value={Data.streetNumber}
                onChange={(e) =>
                  setData({ ...Data, streetNumber: e.target.value })
                }
                error={!!errors.streetNumber && isManualEntry}
                helperText={isManualEntry ? errors.streetNumber : ""}
                sx={styles.textField(!!errors.streetNumber)}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                required={isManualEntry}
                id="streetName"
                name="streetName"
                label="Street Name"
                fullWidth
                value={Data.streetName}
                onChange={(e) =>
                  setData({ ...Data, streetName: e.target.value })
                }
                error={!!errors.streetName && isManualEntry}
                helperText={isManualEntry ? errors.streetName : ""}
                sx={styles.textField(!!errors.streetName)}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                required={isManualEntry}
                id="streetType"
                name="streetType"
                label="Street Type"
                fullWidth
                value={Data.streetType}
                onChange={(e) =>
                  setData({ ...Data, streetType: e.target.value })
                }
                error={!!errors.streetType && isManualEntry}
                helperText={isManualEntry ? errors.streetType : ""}
                sx={styles.textField(!!errors.streetType)}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                required={isManualEntry}
                id="townSuburb"
                name="townSuburb"
                label="Town/Suburb"
                fullWidth
                value={Data.townSuburb}
                onChange={(e) =>
                  setData({ ...Data, townSuburb: e.target.value })
                }
                error={!!errors.townSuburb && isManualEntry}
                helperText={isManualEntry ? errors.townSuburb : ""}
                sx={styles.textField(!!errors.townSuburb)}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                required={isManualEntry}
                id="stateTerritory"
                name="stateTerritory"
                label="State/Territory"
                fullWidth
                value={Data.stateTerritory}
                onChange={(e) =>
                  setData({ ...Data, stateTerritory: e.target.value })
                }
                error={!!errors.stateTerritory && isManualEntry}
                helperText={isManualEntry ? errors.stateTerritory : ""}
                sx={styles.textField(!!errors.stateTerritory)}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                required={isManualEntry}
                id="postcode"
                name="postcode"
                label="Postcode"
                fullWidth
                value={Data.postcode}
                onChange={(e) => setData({ ...Data, postcode: e.target.value })}
                error={!!errors.postcode && isManualEntry}
                helperText={isManualEntry ? errors.postcode : ""}
                sx={styles.textField(!!errors.postcode)}
              />
            </Grid2>

            
          </Grid2>
        </>
      )} */}
       <Grid2 container spacing={3} marginTop={3}>
      <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                select
                required={isManualEntry}
                id="locationType"
                name="locationType"
                label="Location Type*"
                fullWidth
                value={Data.PolicyLobList[0].PolicyRiskList[0].LocationType_Name}
                onChange={(e) =>{
                  let type = ''
                    if(e.target.value === "Modern Office Block"){
                        type = "MODOB"
                    }else if(e.target.value === "Normal Property"){
                        type = "NORPR"
                    }else{
                        type = "SECSC"
                    }
                  setData({ ...Data,PolicyLobList: [
                    {
                        ...Data.PolicyLobList[0],
                        PolicyRiskList: [{
                            ...Data.PolicyLobList[0].PolicyRiskList[0],
                            "LocationType_Name": e.target.value,
                            "LocationType": type,
                        }]
                    }
                  ]})
                }}
                error={!!errors.locationType }
                helperText={ errors.locationType }
                sx={styles.textField(!!errors.locationType)}
              >
                {locationTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                select
                required={isManualEntry}
                id="businessType"
                name="businessType"
                label="Type of Business*"
                fullWidth
                value={Data.PolicyLobList[0].PolicyRiskList[0].TypeOfBusiness_Name}
                onChange={(e) =>
                  {
                    let type = ''
                    if(e.target.value === "Business operations only"){
                        type = "BOO"
                    }else if(e.target.value === "Property owner only"){
                        type = "POO"
                    }else{
                        type = "POBO"
                    }
                    setData({ ...Data,PolicyLobList: [
                        {
                            ...Data.PolicyLobList[0],
                            PolicyRiskList: [{
                                ...Data.PolicyLobList[0].PolicyRiskList[0],
                                "TypeOfBusiness": type,
                                "TypeOfBusiness_Name": e.target.value,
                            }]
                        }
                    ]})
                  }
                }
                error={!!errors.businessType}
                helperText={ errors.businessType }
                sx={styles.textField(!!errors.businessType)}
              >
                {businessTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            </Grid2>
    </>
  );
};

export default AddressSearch;