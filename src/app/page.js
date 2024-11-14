"use client";
import React, { useEffect, useState } from "react";
import logo from "../../public/assets/img/logo.svg";
import mailIcon from "../../public/assets/img/mail.svg";
import profileSvg from "../../public/assets/img/profile.svg";
import buttonBack from "../../public/assets/img/buttonBack.svg";
import Image from "next/image";
import LocalizationSection from "@/components/Localization";
import QuoteSummary from "@/components/QuoteSummary";
import PremiumSummary from "@/components/PremiumSummary";
import CoveregeSelection from "@/components/CoveregeSelection";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CoveregeForm from "@/components/CoveregeForm";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  Box,
  Container,
  Grid2,
  Button,
  Avatar,
  Badge,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/system"; // Import keyframes
import { motion } from "framer-motion";
import ButtonProceed from "@/components/ButtonProceed";
import dayjs from "dayjs";

export default function Home() {
  const echoAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;
  const tapAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
  const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;
  const shapeStyles = {
    bgcolor: "#FFFFFF",
    width: 40,
    height: 40,
    "&:hover": {
      background: "#f5f5f5",
    },
  };
  const shapeCircleStyles = { borderRadius: "50%" };
  const circle = (
    <Box
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={mailIcon}
        alt="Globe Icon"
        style={{ width: "17px", height: "15px" }}
      />
    </Box>
  );

  const InitialData = {
    "LibCommission":"20",
    "PropCommission":"20",
    "selectedCoverages": [],
    "ProductCode": "BPIP01",
    "ProductVersion": "1.0",
    "EffectiveDate": dayjs().add(1,'day'),
    "ExpiryDate": dayjs().add(366, 'day'), // Add 365 days to the current date
    "PolicyTerm": "",
    "LineOfBusinessCode": "VAR",
    "CarrierReferenceNumber": "",
    "CarrierQuoteNumber": "",
    "CarrierPolicyNo": "",
    "AgencyCode": "",
    "PolicyStage": "",
    "CarrierPolicyStatus": "",
    "CarrierProductCode": "OBP1",
    "TrackingNumber": "",
    "ABN": "",
    "Turnover": "",
    "BusinessName": "",
    "NumberofEmployees": 0,
    "JobDescription": 0,
    "YearBusinessStarted": null,
    "ANZSICCode": "",
    "YearsInBusiness": "",
    "PolicyCustomerList": [
        {
            "CustomerName": "",
            "CustomerType": "organization",
            "JobDescription": "",
            "ANZSICCode": "",
            "AddressLine1": "",
            "AddressLine2": "",
            "StreetName": "",
            "City": "",
            "StateOrProvinceCode": "",
            "PostalCode": "",
            "CountryCode": "",
            "IsPrimaryAddress": "false",
            "AddressTypeCode": "",
            "Territory": "",
            "Latitude": "",
            "Longitude": "",
            "GnafPID": "",
            "IsManualAddress": "false",
            "FullAddress": ""
        }
    ],
    "PolicyLobList": [
        {
            "ProductCode": "BPIP01",
            "PolicyRiskList": [
                {
                    "ProductElementCode": "R00005",
                    "AddressLine1": "",
                    "AddressLine2": "",
                    "City": "",
                    "StateOrProvinceCode": "",
                    "PostalCode": "",
                    "CountryCode": "",
                    "IsPrimaryAddress": "false",
                    "AddressTypeCode": "",
                    "Territory": "",
                    "LocationType": "",
                    "TypeOfBusiness": "",
                    "YearBuilt": "",
                    "FloorConstruction": "",
                    "RoofConstruction": "",
                    "WallConstruction": "",
                    "SandwichPanelorEPS": "",
                    "NumberOfStoriesInTheBuilding": "",
                    "AreAnyOfTheBuildingsHeritageListed": "",
                    "LocatedFloor": "",
                    "RiskInterestedParty": "",
                    "Latitude": "",
                    "Longitude": "",
                    "GnafPID": "",
                    "IsManualAddress": "false",
                    "TypeOfBusiness_Name": "",
                    "LocationType_Name": "",
                    "Flood_FL_rate_SME_Cts": "",
                    "Flood_FL_rate_SME_Bld": "",
                    "Bushfire_risk_score": "",
                    "Cyclone_risk_score": "",
                    "NoOfLevel": "",
                    "Storm_risk_score_SME_Bld": "",
                    "Storm_risk_score_SME_Cts": "",
                    "Bld_elevation": "",
                    "Flood_FL_ARI_GL": "",
                    "SecurityFeatures": "NOSEC",
                    "RoofMaterial": "Metal",
                    "RuralMetro": "Metro",
                    "TerrorLevyTier": "B",
                    "FullAddress": "",
                    "JobDescription": "",
                    "IsTheftCoverage": "true",
                    "IsMoneyCoverage": "true",
                    "IsGlassCoverage": "true",
                    "FloorConstruction_Name": "",
                    "WallConstruction_Name": "",
                    "LowestFloorYouOccupy_Name": "",
                    "RoofConstruction_Name": "",
                    "PolicyCoverageList": [],
                    "PolicyEntityList": [
                        {
                            "ProductElementCode": "BLENDORSEMENT",
                            "EndorsementType": "PreBind",
                            "EndorsementNo": "ENDO_012",
                            "EndorsementName": "Commercial Cooking Clause",
                            "ProductCoverageId": "C0001788",
                            "IsMandatory": "true",
                            "GrossPremium": "100.0",
                            "ValueType": "amount",
                            "SequenceNumber": "1",
                            "PolicyRiskId": "R00005",
                            "PolicyEntityList": [
                                {
                                    "ProductElementCode": "BLQUESTIONANSWER",
                                    "QuestionCode": "ENDO_012_Q1",
                                    "QuestionAnswer": "Does the business employ a professional cleaner to clean the exhaust or extraction system ducting annually?",
                                    "AnswerCode": "yes"
                                }
                            ]
                        },
                        {
                            "ProductElementCode": "BLENDORSEMENT",
                            "EndorsementType": "PreBind",
                            "EndorsementNo": "ENDO_008",
                            "EndorsementName": "Flood Cover",
                            "ProductCoverageId": "C0001788",
                            "IsMandatory": "true",
                            "GrossPremium": "800.0",
                            "ValueType": "amount",
                            "SequenceNumber": "2",
                            "PolicyRiskId": "R00005",
                            "PolicyEntityList": [
                                {
                                    "ProductElementCode": "BLQUESTIONANSWER",
                                    "QuestionCode": "ENDO_008_Q1",
                                    "QuestionAnswer": "Do you require flood cover?",
                                    "AnswerCode": "no"
                                }
                            ]
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "1",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "2",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "3",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "4",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "5",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "6",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "7",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "8",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "9",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "10",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "11",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "12",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "13",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "14",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "15",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "16",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "17",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "18",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "19",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "20",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "21",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "22",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "23",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "24",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "25",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "26",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "27",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "28",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "29",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "30",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "31",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "32",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "33",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "34",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "35",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "36",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "37",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "38",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "39",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "40",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "41",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "42",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "43",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "44",
                            "AnswerCode": "N"
                        },
                        {
                            "ProductElementCode": "OCCUPATIONCLAUSEQA",
                            "QuestionId": "45",
                            "AnswerCode": "N"
                        }
                    ]
                }
            ],
            "PolicyEntityList": [
                
            ]
        }
    ],
    "PolicyPaymentInfoList": [
        {
            "BillingType": "ABI",
            "PaymentPlan": "PPC001",
            "IsInstallment": "N"
        }
    ]
  }

  const steps = ["Coverage selection", "Premium Summary", "Quote Summary"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CoveregeForm Data={Data} setData={setData} handleNext={handleNext} setQuote={setQuote} />;
      case 1:
        return <PremiumSummary handleNext={handleNext} Quote={Quote} Data={Data}  setQuote={setQuote}/>;
      case 2:
        return <QuoteSummary handleNext={handleNext} Quote={Quote} Data={Data} setQuote={setQuote} />;
      default:
        return <CoveregeForm handleNext={handleNext} />;
    }
  }

  const [Data, setData] = useState(InitialData)
  const [activeStep, setActiveStep] = useState(0);
  const [isTapped, setIsTapped] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const [Quote,setQuote] = useState({})

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    console.log(Data)
  }, [Data]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleStepClick = (index) => {
    setIsTapped(true);
    // if(index<activeStep){
    //   setActiveStep(index);
    // }
    
    setIsDropdown(false); // Close dropdown when a step is clicked
    setTimeout(() => setIsTapped(false), 300);
  };
  const handleDropdown = () => {
    if (isDropdown === true) {
      setIsDropdown(false);
    } else {
      setIsDropdown(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdown && !event.target.closest(".dropdown-container")) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdown]);

  return (
    <Box
      sx={{
        height: "100vh",
        background: "#F2F3F5",
        width: "100%",
      }}
    >
      <Grid2
        width={"100%"}
        display={{ sm: "none", xs: "flex" }}
        flexDirection={"column"}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 0%",
            backgroundColor: "rgb(255, 255, 255)",
            justifyContent: "space-between",
            gap: "8px",
            alignItems: "center",
            padding: "16px 20px",

            borderRadius: isDropdown ? "0px" : "0px 0px 12px 12px",
            boxShadow: "rgba(9, 30, 66, 0.03) 0px 4px 10px",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"start"}
            gap="4px"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              cursor: "pointer",
              borderRight: "1px solid rgb(217, 220, 225)",
            }}
          >
            <Box
              sx={{ flexDirection: "column", display: "flex", flex: "1 1 0%" }}
              onClick={() =>
                (isDropdown && setIsDropdown(false)) ||
                (!isDropdown && setIsDropdown(true))
              }
            >
              <Box
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: "15px",
                  textAlign: "left",
                  color: "#000",
                }}
              >
                My Bussiness Insurance -{" "}
                {activeStep === steps.length ? 1 : activeStep + 1} of{" "}
                {steps.length} {/* Updated to show current step */}
              </Box>
              <Box
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "15px",
                  textAlign: "left",
                  color: "#455560",
                }}
              >
                {steps[activeStep]} {/* Display the current step */}
              </Box>
            </Box>
            <Box px={1}>
              {!isDropdown ? (
                <Box onClick={() => setIsDropdown(true)}>
                  <ExpandMoreIcon
                    sx={{
                      color: "#452262",
                    }}
                  />
                </Box>
              ) : (
                <Box onClick={() => setIsDropdown(false)}>
                  <ExpandLessIcon
                    sx={{
                      color: "#452262",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={
              {
                // borderLeft: "1px solid #A5A5A5",
              }
            }
          >
            <LocalizationSection />
          </Box>
        </Box>
        {isDropdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} // Initial state
            animate={{ opacity: 1, height: "auto" }} // Animate to full height
            exit={{ opacity: 0, height: 0 }} // Exit state
            transition={{ duration: 0.3 }} // Duration of the animation
            style={{
              display: "flex",
              position: "absolute",
              zIndex: 1000,
              width: "100%",
              marginTop: "-3px",
              top: "4rem",
              background: "white",
              borderTop: "1px solid #D6D6D6",
              borderRadius: "0px 0px 12px 12px",
              overflow: "hidden", // Prevent overflow when collapsed
            }}
            className="dropdown-container"
          >
            <Timeline position={"right"} sx={{ p: 0, mx: 4 }}>
              {steps.map((label, index) => (
                <TimelineItem
                  key={label}
                  onClick={() => handleStepClick(index)}
                  sx={{
                    cursor: "pointer",
                    "&:before": { flex: 0, padding: 0 },
                  }}
                >
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        boxShadow: "none",

                        background:
                          index === activeStep ? "#F55B1D" : "#A5A5A5",
                        marginTop: "12px",
                        animation: isTapped && `${tapAnimation} 0.3s`,
                        animation:
                          index === activeStep &&
                          `${pulseAnimation} 1.5s infinite, ${echoAnimation} 1.5s infinite`,
                        transition: "transform 0.3s ease, background 0.3s ease",
                        transform:
                          index === activeStep ? "scale(1.2)" : "scale(1)",
                      }}
                    >
                      {index === activeStep && (
                        <Box
                          sx={{
                            position: "absolute",
                            width: "60%",
                            height: "60%",
                            borderRadius: "50%",
                            background: "#fff",
                            top: "20%",
                            right: "20%",
                          }}
                        />
                      )}
                    </TimelineDot>
                    {index < steps.length - 1 && (
                      <TimelineConnector
                        sx={{
                          backgroundColor: "transparent",
                          borderRight:
                            "2px solid " +
                            (index === activeStep ? "#F55B1D" : "#A5A5A5"),
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography
                      sx={{
                        fontFamily: "Arboria-Medium",
                        fontSize: "14px",
                        mt: "-12px",
                        padding: "12px 5px",
                        color: index === activeStep ? "primary" : "inherit",
                        // background:
                        //   index === activeStep
                        //     ? "linear-gradient(to right, rgba(245, 91, 29, 0), rgba(245, 91, 29, 0.3))"
                        //     : "transparent",
                        borderRadius: "6px",
                      }}
                    >
                      {label}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </motion.div>
        )}
      </Grid2>
      <Container
        maxWidth="lg"
        sx={{
          paddingY: { xs: "15px", sm: "35px" },
          opacity: isDropdown ? "30%" : "100%",
        }}
      >
        <Grid2 container spacing={4}>
          <Grid2
            size={12}
            gap={4}
            display={{ sm: "flex", xs: "none" }}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid2>
              <Box>
                <Image src={logo} alt="Logo" />{" "}
                <span
                  style={{
                    borderRight: "1px solid #A5A5A5",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "arboria-book",
                    textTransform: "uppercase",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "17px",
                    color: "#452262",
                  }}
                >
                  Business Insurance
                </span>
              </Box>
            </Grid2>
            <Grid2 display={"flex"} alignItems={"center"} gap={3}>
              <Box>
                <LocalizationSection />
              </Box>
              <Box>
                <Badge
                  sx={{
                    cursor: "pointer",
                  }}
                  color="secondary"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                >
                  {circle}
                </Badge>
              </Box>
              <Box width={"125px"} display={"flex"} flexDirection={"column"}>
                <Button
                  sx={{
                    background: "white",

                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px",
                    "&:hover": {
                      background: "#f5f5f5",
                    },
                  }}
                >
                  <Image
                    src={profileSvg}
                    alt="Profile"
                    style={{ width: "19px", height: "19px" }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Arboria-Medium",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "12.43px",
                      textAlign: "left",
                      color: "#452262",
                    }}
                  >
                    MY ACCOUNT
                  </Typography>
                </Button>
                <Typography
                  sx={{
                    fontFamily: "Arboria-Book",
                    fontSize: "9px",
                    fontWeight: 400,
                    lineHeight: "9.76px",
                    textAlign: "center",
                    mt: "4px",
                    color: "#452262",
                  }}
                >
                  Claim, renew, manage & more
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
          <Grid2 size={12} container mt={{ xs: 0, sm: 6 }}>
            <Grid2
              size={{ xs: 12, md: 4, lg: 3 }}
              display={{ sm: "flex", xs: "none" }}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Box>
                <Timeline
                  position={"right"}
                  sx={{ p: 0, mt: { xs: 0, sm: 4 } }}
                >
                  {steps.map((label, index) => (
                    <TimelineItem
                      key={label}
                      // onClick={handleIconClick} // Add click handler
                      onClick={() => handleStepClick(index)}
                      sx={{
                        cursor: "pointer",
                        "&:before": { flex: 0, padding: 0 },
                      }}
                    >
                      <TimelineSeparator>
                        <TimelineDot
                          sx={{
                            boxShadow: "none",

                            background:
                              index === activeStep ? "#F55B1D" : "#A5A5A5",
                            marginTop: "12px",
                            animation: isTapped && `${tapAnimation} 0.3s`, // Apply animation conditionally
                            animation:
                              index === activeStep &&
                              `${pulseAnimation} 1.5s infinite, ${echoAnimation} 1.5s infinite`, // Apply both animations
                            transition:
                              "transform 0.3s ease, background 0.3s ease", // Added transition for animation
                            transform:
                              index === activeStep ? "scale(1.2)" : "scale(1)", // Scale effect on active step
                          }}
                        >
                          {index === activeStep && (
                            <Box
                              sx={{
                                position: "absolute",
                                width: "60%",
                                height: "60%",
                                borderRadius: "50%",
                                background: "#fff",
                                top: "20%",
                                right: "20%",
                              }}
                            />
                          )}
                        </TimelineDot>
                        {index < steps.length - 1 && (
                          <TimelineConnector
                            sx={{
                              backgroundColor: "transparent",
                              borderRight:
                                "2px solid " +
                                (index === activeStep ? "#F55B1D" : "#A5A5A5"),
                            }}
                          />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography
                          sx={{
                            fontFamily: "Arboria-Medium",
                            fontSize: "16px",
                            mt: "-12px",
                            padding: "12px 5px",
                            color: index === activeStep ? "primary" : "inherit",
                            background:
                              index === activeStep
                                ? "linear-gradient(to right, rgba(245, 91, 29, 0), rgba(245, 91, 29, 0.3))"
                                : "transparent",
                            borderImage:
                              index === activeStep
                                ? "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(245, 91, 29, 1))"
                                : "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(126, 126, 126, 1))",
                            borderRadius: "6px",
                          }}
                        >
                          {label}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                sx={{
                  borderTop: "1px solid #D6D6D6",
                  paddingY: "20px",
                }}
              >
                <Box
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "19px",
                    textAlign: { xs: "center", md: "left" },
                    color: "#000",
                    marginTop: "10px",
                  }}
                >
                  Copyright &copy; IAMI 2024
                  <br />
                  All rights reserved
                </Box>
                <Box
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                  mt={"10px"}
                  textAlign={{ xs: "center", md: "left" }}
                >
                  <Box>Terms and Conditions</Box>
                  <Box>Privacy Policy</Box>
                  <Box>Cookie Policy</Box>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8, lg: 9 }}>
              {getStepContent(activeStep)}
            </Grid2>
          </Grid2>
        </Grid2>
        <Box
          display={{ xs: "flex", sm: "none" }}
          flexDirection={"column"}
          mt={{ xs: 4, sm: 0 }}
          gap={2}
          sx={{
            borderTop: "1px solid #D6D6D6",
            paddingY: "20px",
          }}
        >
          <Box
            sx={{
              fontFamily: "Arboria-Medium",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "19px",
              textAlign: { xs: "center", md: "left" },
              color: "#000",
              marginTop: "10px",
            }}
          >
            Copyright &copy; IAMI 2024
            <br />
            All rights reserved
          </Box>
          <Box
            display={"flex"}
            gap={1}
            flexDirection={"column"}
            mt={"10px"}
            textAlign={{ xs: "center", md: "left" }}
          >
            <Box>Terms and Conditions</Box>
            <Box>Privacy Policy</Box>
            <Box>Cookie Policy</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
