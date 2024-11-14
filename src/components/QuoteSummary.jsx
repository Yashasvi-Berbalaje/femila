import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TableSummary from "./Table";
import buttonBack from "../../public/assets/img/buttonBack.svg";
import { DocumentHolder } from "./Liability";
import axiosInstance from "./axiosInstance";
import PaymentPage from "./PaymentPage";
import ErrorModal from "./ErrorModels";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const initialDocuments = [
  { name: "Quote Schedule.pdf", timestamp: "", size: "372" },
  { name: "", timestamp: "", size: "" },
  { name: "", timestamp: "", size: "" },
];

const QuoteSummary = ({ handleNext, Quote, Data, setQuote }) => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(0);

  const getValue = (code, field, ProductElementCode) => {
    const data =
      Quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
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

  useEffect(() => {
    let tempTotal = {
      basePremium: 0,
      emergencyServiceLevy: 0,
      gst: 0,
      stampDuty: 0,
      total: 0,
    };
    const data = Data.selectedCoverages;

    if (data.includes(0)) {
      const basePremium = parseFloat(
        getValue("", "StandardNetPremium", "C0001785")
      );
      const emergencyServiceLevy = parseFloat(
        getValue("", "EmergencyServiceLevy", "C0001785")
      );
      const gst = parseFloat(getValue("", "GST", "C0001785"));
      const stampDuty = parseFloat(getValue("", "StampDuty", "C0001785"));
      const total = parseFloat(
        basePremium + emergencyServiceLevy + gst + stampDuty
      );

      tempTotal.total += total;
    }
    if (data.includes(1)) {
      const basePremium = parseFloat(
        getValue("", "StandardNetPremium", "C0001786")
      );
      const emergencyServiceLevy = parseFloat(
        getValue("", "EmergencyServiceLevy", "C0001786")
      );
      const gst = parseFloat(getValue("", "GST", "C0001786"));
      const stampDuty = parseFloat(getValue("", "StampDuty", "C0001786"));
      const total = parseFloat(
        basePremium + emergencyServiceLevy + gst + stampDuty
      );

      tempTotal.total += total;
    }
    if (data.includes(2)) {
      const basePremium = parseFloat(
        getValue("", "StandardNetPremium", "C0001787")
      );
      const emergencyServiceLevy = parseFloat(
        getValue("", "EmergencyServiceLevy", "C0001787")
      );
      const gst = parseFloat(getValue("", "GST", "C0001787"));
      const stampDuty = parseFloat(getValue("", "StampDuty", "C0001787"));
      const total = parseFloat(
        basePremium + emergencyServiceLevy + gst + stampDuty
      );

      tempTotal.total += total;
    }
    if (data.includes(3)) {
      const basePremium = parseFloat(
        getValue("", "StandardNetPremium", "C0001788")
      );
      const emergencyServiceLevy = parseFloat(
        getValue("", "EmergencyServiceLevy", "C0001788")
      );
      const gst = parseFloat(getValue("", "GST", "C0001788"));
      const stampDuty = parseFloat(getValue("", "StampDuty", "C0001788"));
      const total = parseFloat(
        basePremium + emergencyServiceLevy + gst + stampDuty
      );

      tempTotal.total += total;
    }

    if (data.includes(4)) {
      const basePremium = parseFloat(
        getValue("", "StandardNetPremium", "C0001790")
      );
      const emergencyServiceLevy = parseFloat(
        getValue("", "EmergencyServiceLevy", "C0001790")
      );
      const gst = parseFloat(getValue("", "GST", "C0001790"));
      const stampDuty = parseFloat(getValue("", "StampDuty", "C0001790"));
      const total = parseFloat(
        basePremium + emergencyServiceLevy + gst + stampDuty
      );

      tempTotal.total += total;
    }

    if (data.includes(5)) {
      const basePremium = parseFloat(
        getValue("", "StandardNetPremium", "C0001789")
      );
      const emergencyServiceLevy = parseFloat(
        getValue("", "EmergencyServiceLevy", "C0001789")
      );
      const gst = parseFloat(getValue("", "GST", "C0001789"));
      const stampDuty = parseFloat(getValue("", "StampDuty", "C0001789"));
      const total = parseFloat(
        basePremium + emergencyServiceLevy + gst + stampDuty
      );

      tempTotal.total += total;
    }

    // setData(tempdata)
    setTotal(tempTotal.total);
  }, [Quote]);

  const summaryFields = [
    {
      title: "Quote No",
      xl: 3,
      md: 6,
      xs: 12,
      value: Quote.CarrierQuoteNumber,
    },
    {
      title: "Policy Effective Date",
      xl: 3,
      md: 6,
      xs: 12,
      value: Quote.EffectiveDate,
    },
    {
      title: "Policy Expiration Date",
      xl: 3,
      md: 6,
      xs: 12,
      value: Quote.ExpiryDate,
    },
    {
      title: "Quote Status",
      xl: 3,
      md: 6,
      xs: 12,
      value: Quote.CarrierPolicyStatus,
    },
    { title: "Insured Name", xl: 3, md: 6, xs: 12, value: Quote.BusinessName },
    { title: "Transaction Type", xl: 3, md: 6, xs: 12, value: "New Bussiness" },
    {
      title: "Primary Address",
      xl: 6,
      xs: 12,
      value: (Quote.PolicyCustomerList[0].FullAddress || ""),
    },
  ];

  useEffect(() => {
    if (loading) {
      axiosInstance
        .get("/fetchalldocs/proposalNo/" + Quote.ProposalNo)
        .then((response) => {
          // console.log(response.data.Docs);
          if (Array.isArray(response.data.Docs)) {
            setDocuments(response.data.Docs); // Set the array if it's valid
          } else {
            setDocuments([]); // Otherwise, set an empty array
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handleDocumentClick = async (value) => {
    try {
      // Step 1: Get Access Token
      const access_token = await axiosInstance.get("/getAccessToken");
      console.log("Access Token:", access_token.data.access_token);
    
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
    
      console.log("Response Headers:", response.headers);
      console.log("Blob size:", response.data.size); // Confirm Blob size
    
      // Step 3: Create a URL for the Blob and open it in a new tab
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

  const handleFileChange = (e) => {
    const files = e.target.files;
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];

    // Filter out non-image files
    const validFiles = Array.from(files).filter((file) =>
      acceptedImageTypes.includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setError("Only image files are allowed.");
      return;
    }

    // Check if adding these files exceeds the limit
    const existingFiles = documents.filter((doc) => doc.name !== "").length;
    if (existingFiles + validFiles.length > 3) {
      setError("You can only upload up to 3 images.");
      return;
    }

    const newDocuments = validFiles.map((file) => ({
      name: file.name,
      timestamp: new Date().toLocaleString(),
      size: Math.round(file.size / 1024),
    }));

    setDocuments((prev) => {
      const updatedDocuments = [...prev];
      let index = 0;
      for (
        let i = 0;
        i < updatedDocuments.length && index < newDocuments.length;
        i++
      ) {
        if (updatedDocuments[i].name === "") {
          updatedDocuments[i] = newDocuments[index];
          index++;
        }
      }
      return updatedDocuments;
    });

    setError(""); // Clear any existing errors
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={{ md: "end" }}>
      <Box backgroundColor={"#FFF"} borderRadius={"15px"} py={{ xs: 4, lg: 8 }}>
        {" "}
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "30.24px",
            textAlign: "left",
            color: "#452262",
            px: 4,
          }}
        >
          Quote Summary{" "}
        </Typography>
        <Grid2 container spacing={2} px={4}>
          {summaryFields.map((field) => (
            <Grid2
              size={{ xl: field.xl, md: field.md, xs: field.xs }}
              mt={2}
              key={field.title}
            >
              <Box
                style={{
                  backgroundColor: "#FFF",
                  borderBottom: "1px solid rgba(69, 34, 98, 0.2)",
                  position: "absolute",
                  borderRadius: "0px 0px 4px 4px",
                  marginLeft: "20px",
                  marginTop: "-10px",
                  padding: "4px 8px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: "14px",
                    fontWeight: 200,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                  }}
                >
                  {field.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "rgba(178, 178, 178, 0.15)",
                  border: "1px solid rgba(69, 34, 98, 0.1)",
                  borderRadius: "10px",
                  padding: "18px",
                  paddingLeft: "28px",
                }}
              >
                {field.value}
              </Box>
            </Grid2>
          ))}
        </Grid2>
        <Grid2 container>
          <Grid2 size={{ xl: 12, xs: 12 }} mt={8} px={4}>
            <Typography
              sx={{
                fontFamily: "Arboria-Medium",
                fontSize: "21px",
                fontWeight: 400,
                lineHeight: "26.1px",
                textAlign: "left",
                color: "#452262",
              }}
            >
              Premium Summary{" "}
            </Typography>
            <TableSummary Data={Data.selectedCoverages} Quote={Quote} />
          </Grid2>
          <Grid2
            size={{ xl: 12, xs: 12 }}
            mt={0}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={2}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              width={"100%"}
            >
              {/* <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={4}
              >
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                  }}
                >
                  Agent Fees
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                  }}
                >
                  $100.00
                </Typography>
              </Box> */}
              {/* <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={4}
              >
                {" "}
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                  }}
                >
                  GST on Agent Fees
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                  }}
                >
                  $10.00
                </Typography>
              </Box> */}
              {/* <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={4}
              >
                {" "}
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                  }}
                >
                  Broker Fees
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                  }}
                >
                  $0.00
                </Typography>
              </Box> */}
              {/* <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={4}
              >
                {" "}
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                  }}
                >
                  GST on Broker Fees
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                  }}
                >
                  $0.00
                </Typography>
              </Box> */}
            </Box>
            <Box>
              <Typography
                sx={{
                  marginTop: "1.5rem",
                  background: "rgba(245, 91, 29, 0.25)",

                  borderRadius: "5px 5px 5px 5px",
                  textAlign: "center",
                  padding: "10px",
                  fontFamily: "Outfit",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "19.76px",
                  color: "rgba(245, 91, 29, 1)",
                }}
              >
                {" "}
                ${total}
              </Typography>
              <Typography
                sx={{
                  marginTop: "1px",

                  borderRadius: "5px 0px 0px 5px",
                  textAlign: "center",
                  padding: "10px",
                  fontFamily: "Outfit",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "19.76px",
                  color: "rgba(69, 34, 98, 1)",
                }}
              >
                Total Payable{" "}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
        <Grid2
          container
          display={"flex"}
          flexDirection={"column"}
          gap={6}
          mt={8}
          px={{ sm: 4, xs: 2 }}
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
          {documents.map((doc, idx) => (
            <Grid2 size={{ lg: 8, xs: 12 }} key={idx}>
              {/* <Box
                sx={{
                  backgroundColor: "#FFF",
                  borderBottom: "1px solid rgba(69, 34, 98, 0.2)",
                  position: "absolute",
                  borderRadius: "0px 0px 8px 8px",
                  marginLeft: { xs: "0px", sm: "30px" },
                  display: "flex",
                  gap: { xs: "8px", sm: "4rem" },
                  marginTop: "-10px",
                  padding: "4px 10px",
                  width: "100%",
                 
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: "14px",
                    fontWeight: 200,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                    width:'80%'
                  }}
                >
                  Form Name{" "}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: "14px",
                    fontWeight: 200,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                  }}
                >
                  Timestamp{" "}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: "14px",
                    fontWeight: 200,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                  }}
                >
                  Form Size{" "}
                </Typography>
              </Box> */}
              <Box
                sx={{
                  backgroundColor: "rgba(178, 178, 178, 0.15)",
                  border: "1px solid rgba(69, 34, 98, 0.1)",
                  borderRadius: "10px",
                  padding: { sm: "24px", xs: "30px 8px" },
                  paddingLeft: "40px",
                  display: "flex",
                  gap: { xs: "1.5rem", sm: "3.5rem" },
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "#F55B1D",
                    width: "150px",
                  }}
                >
                  {doc.docName}
                </Typography>
                {/* <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    color: "rgba(61, 61, 61, 1)",
                    color: "#F55B1D",
                    width: "80px",
                  }}
                >
                  {doc.timestamp}
                </Typography> */}
                <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 400,
                    lineHeight: "14.64px",
                    width: "80px",
                    color: "#F55B1D",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{doc.docSize}</span>
                </Typography>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleDocumentClick(doc.docKey)}
                >
                  <DocumentHolder />
                </Box>
              </Box>
            </Grid2>
          ))}
          {documents.length === 0 && !loading ? (
            <Typography>Refresh to see the documents</Typography>
          ) : (
            <></>
          )}

          <input
            type="file"
            multiple
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Grid2>
      </Box>
      <PaymentPage amount={total} ProposalNo={Quote.ProposalNo} />
    </Box>
  );
};

export default QuoteSummary;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: { md: "end" },
  },
  summaryBox: {
    backgroundColor: "#FFF",
    borderRadius: "15px",
    py: { xs: 4, lg: 8 },
  },
  summaryTypography: {
    fontFamily: "Outfit",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "30.24px",
    textAlign: "left",
    color: "#452262",
    px: 4,
  },
  gridContainer: {
    container: true,
    spacing: 2,
    px: 4,
  },
  gridItem: {
    size: { xl: 3, md: 6, xs: 12 },
    mt: 2,
  },
  boxHeader: {
    backgroundColor: "#FFF",
    borderBottom: "1px solid rgba(69, 34, 98, 0.2)",
    position: "absolute",
    borderRadius: "0px 0px 4px 4px",
    marginLeft: "20px",
    marginTop: "-10px",
    padding: "4px 8px",
  },
  typographyHeader: {
    fontFamily: "Arboria-Book",
    fontSize: "14px",
    fontWeight: 200,
    lineHeight: "14.64px",
    color: "rgba(61, 61, 61, 1)",
  },
  boxContent: {
    backgroundColor: "rgba(178, 178, 178, 0.15)",
    border: "1px solid rgba(69, 34, 98, 0.1)",
    borderRadius: "10px",
    padding: "28px",
  },
  button: {
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
  },
  documentsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    mt: 8,
    px: { sm: 4, xs: 2 },
  },
  documentsTypography: {
    fontFamily: "Arboria-Medium",
    fontSize: "21px",
    fontWeight: 400,
    lineHeight: "0px",
    textAlign: "left",
    color: "#452262",
  },
  documentsHeaderBox: {
    backgroundColor: "#FFF",
    borderBottom: "1px solid rgba(69, 34, 98, 0.2)",
    position: "absolute",
    borderRadius: "0px 0px 8px 8px",
    marginLeft: { xs: "0px", sm: "30px" },
    display: "flex",
    gap: { xs: "8px", sm: "4rem" },
    marginTop: "-10px",
    padding: "4px 10px",
  },
  documentsHeaderTypography: {
    fontFamily: "Arboria-Book",
    fontSize: "14px",
    fontWeight: 200,
    lineHeight: "14.64px",
    color: "rgba(61, 61, 61, 1)",
  },
  documentsContentBox: {
    backgroundColor: "rgba(178, 178, 178, 0.15)",
    border: "1px solid rgba(69, 34, 98, 0.1)",
    borderRadius: "10px",
    padding: "24px",
    paddingLeft: "40px",
    display: "flex",
    gap: { xs: "1.5rem", sm: "4.5rem" },
  },
  documentName: {
    fontFamily: "Arboria-Book",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "14.64px",
    color: "#F55B1D",
    textAlign: "left",
  },
  svgIcon: {
    cursor: "pointer",
  },
};
