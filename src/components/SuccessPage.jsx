"use client";
import React, { useEffect, useState } from "react";
import PaymentPage from "./PaymentPage";
import { Box, Card, Typography, Button, Grid, Divider } from "@mui/material";
import logo from "../../public/assets/img/logo.svg";
import success from "../../public/assets/img/success.svg";
import Background from "../../public/assets/img/background.svg";
import download from "../../public/assets/img/import.svg";
import axiosInstance from "./axiosInstance";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "lodash";
import axios from "axios";
const Item = ({ item, value }) => {
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "21px",
          fontWeight: "400",
          fontFamily: "Arboria-Medium",
          color: "#707070",
        }}
      >
        {item}
      </Typography>
      <Typography
        sx={{
          fontSize: "21px",
          fontWeight: "400",
          fontFamily: "Arboria-Medium",
          color: "#707070",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
const handleDocumentClick = async (value) => {
  try {
    // Step 1: Get Access Token
    const access_token = await axiosInstance.get("/getAccessToken");

    // Step 2: Make request to download PDF
    const response = await axios.get(
      "https://sandbox-in-gw.insuremo.com/sureinsureau/v1/appframework-bff-app/downloaddoc?entity=insuremoPolicy&value="+value,
      {
        responseType: 'blob', // Set responseType to 'blob' for binary data
        headers: {
          Authorization: `Bearer ${access_token.data.access_token}`, // Include Bearer token
        },
      }
    );
  

    const blob = response.data;
    const dataUrl = URL.createObjectURL(blob);
    window.open(dataUrl);

    // Step 4: Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "document.pdf"; // Specify a default filename
    document.body.appendChild(link);
    link.click();
  
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(dataUrl);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

const DownloadButton = ({ name, url }) => {
  return (
    <Button
      onClick={() => handleDocumentClick(url)}
      fullWidth
      variant="outlined"
      startIcon={<img src={download.src} alt="icon" width="20px" />} // Use the imported SVG as an icon
      sx={{
        color: "#F55B1D", // Text color
        borderColor: "#F55B1D", // Border color
        borderWidth: "1px", // Small border width
        textTransform: "none",
        "&:hover": {
          borderColor: "#F55B1D", // Keep the same border color on hover
          backgroundColor: "rgba(245, 91, 29, 0.1)", // Light background color on hover
        },
      }}
    >
      {name}
    </Button>
  );
};

const SuccessPage = ({ quote ,proposalNo }) => {
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);

  useEffect(() => {
    if (loading) {
      axiosInstance
        .get("/fetchalldocs/proposalNo/" + proposalNo)
        .then((response) => {
          if (Array.isArray(response.data.Docs)) {
            setdata(response.data.Docs); // Set the array if it's valid
          } else {
            setdata([]); // Otherwise, set an empty array
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loading]);
  const itemData = [
      { item: "RefNumber", value: quote ? quote.CarrierReferenceNumber : "" },
      { item: "QuoteNumber", value: quote ? quote.CarrierQuoteNumber : "" },
      { item: "EffectiveDate", value: quote ? quote.EffectiveDate : "" },
      { item: "ExpiryDate", value: quote ? quote.ExpiryDate : "" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh", // Full height of viewport
        backgroundImage: `url(${Background.src})`, // Use the imported SVG as background
        backgroundSize: "cover", // Ensure the background covers the entire container
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent the background from repeating
      }}
    >
      <Card
        sx={{
          width: "80vw",
          height: "80vh",
          display: "flex",
          p: 5,
          flexDirection: "column",
          // justifyContent: 'center',  // Center content horizontally inside the card
          // alignItems: 'center'       // Center content vertically inside the card
        }}
      >
        {/* Your card content here */}
        <img
          src={logo.src}
          alt="Top-left corner image"
          style={{
            width: "150px", // Adjust the size of the image as needed
            height: "100px", // Adjust the size of the image as needed
          }}
        />
        <Box
          sx={{
            display: "flex",
            // Center horizontally
            marginTop: "-70px",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <img
            src={success.src}
            alt="Top-left corner image"
            style={{
              width: "150px", // Adjust the size of the image as needed
              height: "100px", // Adjust the size of the image as needed
            }}
          />
          <Typography
            sx={{
              mt: 2,
              fontSize: "33px",
              fontWeight: "400",
              fontFamily: "Arboria-Medium",
            }}
          >
            Payment Success!
          </Typography>
          <Typography
            sx={{
              mt: 1,
              fontSize: "23px",
              fontWeight: "400",
              fontFamily: "Arboria-Medium",
              color: "#343434B8",
            }}
          >
            Your payment has been successfully done
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "45%", mt: 5, p: 3 }}>
            {itemData.map((item, index) => (
              <Item key={index} item={item.item} value={item.value}></Item>
            ))}
            <Grid item xs={12} sm={6}>
              <Divider
                sx={{
                  borderStyle: "dashed",
                  borderColor: "#EDEDED", // Dotted line color
                  borderWidth: "1px",
                  marginY: 4, // Adds vertical spacing
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "21px",
                    fontWeight: "400",
                    fontFamily: "Arboria-Medium",
                    color: "#707070",
                  }}
                >
                  Amount
                </Typography>
                <Typography
                  sx={{
                    fontSize: "21px",
                    fontWeight: "400",
                    fontFamily: "Arboria-Medium",
                    color: "#121212",
                  }}
                >
                  ${quote ? quote.DuePremium : ""}
                </Typography>
              </Box>
            </Grid>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "45%",
              mt: 5,
              p: 3,
              "&::before": {
                content: '""', // Empty content for the pseudo-element
                position: "absolute", // Position it relative to the box
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 10,
                border: "1px dotted black", // Dashed transparent border to create spacing effect
                borderImageSource:
                  "linear-gradient(180deg, #919191 0%, #FFFFFF 100%)", // Apply gradient to border
                borderImageSlice: 1, // Ensure gradient covers border
                pointerEvents: "none", // Prevent the border from affecting content inside the box
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Arboria-Medium",
                  fontSize: "21px",
                  fontWeight: 400,
                  lineHeight: "0px",
                  textAlign: "left",
                  color: "#452262",
                }}
              >
                Documents
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setLoading(true)}
                disabled={loading} // Disable button during loading
                startIcon={!loading ? <RefreshIcon /> : null} // Show icon only when not loading
                sx={{
                  padding: "10px 20px",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Reload"
                )}{" "}
                {/* Show loading spinner */}
              </Button>
            </Box>

            <Grid container spacing={2} marginTop={2}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  {/* Adjust size: xs=12 for small screens (full width), sm=6 for medium (half width) */}

                  <DownloadButton name={item.docName} url={item.docKey} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SuccessPage;
