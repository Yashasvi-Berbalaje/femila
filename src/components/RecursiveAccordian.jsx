import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; // Import MUI Button component
import Image from "next/image"; // Assuming you're using Next.js for image optimization
import FurtherQuestion from "./FurtherQuestions.json";
// Import your custom icons
import CrossBtn from "../../public/assets/img/crossbtn.svg";
import PlusBtn from "../../public/assets/img/plusButton.svg";
import PropertyDetails from "./PropertyDetails";
import BuildingAndContentsLimits from "./BuildingAndContentsLimits";
import QuestionsComponent from "./Questions";
import ClaimsComponent from "./Claims";
import PortableBusinessContentsLimits from "./PortableBusinessContentsLimits";
import PortableBusinessContentsSpecifiedItems from "./PortableBusinessContentsSpecifiedItems";
import BusinessInterruptionLimitsAndExcess from "./BusinessInterruptionLimitsAndExcess";
import BusinessLiabilityCoverage from "./BusinessLiabilityCoverage";
import EquipmentBreakdownLimitsAndExcess from "./EquipmentBreakdownLimitsAndExcess";

// Example of a custom component to pass to Accordion
const CustomComponent = () => {
  return (
    <Box
      sx={{
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
        marginTop: "10px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        This is a custom component!
      </Typography>
      <Typography variant="body1" sx={{ color: "#4B4B4B" }}>
        You can pass any component to the accordion and render it here.
      </Typography>
    </Box>
  );
};

// Sample JSON data for accordion structure

// Recursive Accordion Component
const RecursiveAccordion = ({ data, level = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Only one accordion can be open at a time

  const handleChange = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle current accordion
  };

  const handleNextSection = (currentIndex) => {
    if (currentIndex < data.length - 1) {
      setActiveIndex(currentIndex + 1); // Open next accordion and close current one
    }
  };

  return (
    <>
      {data.map((item, index) => (
        <Accordion
          key={index}
          expanded={activeIndex === index}
          onChange={() => handleChange(index)}
          sx={{
            marginBottom: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:before": { display: "none" }, // Remove the default MUI border effect
          }}
        >
          <AccordionSummary
            sx={{
              backgroundColor: activeIndex === index ? "#f0f0f0" : "#fafafa",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background-color 0.3s ease",
            }}
          >
            {/* Container to center icon and text horizontally */}
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              {/* Custom Icon at the beginning */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "8px",
                }}
              >
                <Image
                  src={activeIndex === index ? CrossBtn : PlusBtn}
                  alt={activeIndex === index ? "Close" : "Open"}
                  style={{
                    cursor: "pointer",
                  }}
                  width={24}
                  height={24}
                />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontFamily: "Arboria-Medium",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "19.89px",
                  color: activeIndex === index ? "#4B4B4B" : "#F55B1D",
                  flexGrow: 1,
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            {item.details && item.details.length > 0 ? (
              <RecursiveAccordion data={item.details} level={level + 1} />
            ) : (
              <>
                {/* Render the component if it's provided */}
                {item.component && item.component}
              </>
            )}

            {/* Render Next Section button only if a component is provided */}
            {/* {item.component && index < data.length - 1 && (
              <Box sx={{ textAlign: "right", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNextSection(index)}
                >
                  Next Section
                </Button>
              </Box>
            )} */}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

const App = ({ Data, setData }) => {
  //check whether the project element code is availble or not in a array of objects

  const CheckExists = (array, element) => {
    return array.find((el) => el.ProductElementCode === element) || {};
  };

  useEffect(() => {
    console.log("Data", Data);

  }, [Data]);

  const selected = Data.selectedCoverages;

  useEffect(() => {
    const coveragelist = [];

    if (selected.includes(0)) {
      const result = CheckExists(
        Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList,
        "C0001785"
      );
      if (Object.keys(result).length) {
        coveragelist.push(result);
      } else {
        coveragelist.push({
          ProductElementCode: "C0001785",
          LineOfBusinessCode: "GELI",
          BLCovFurtherQuestion1: "N",
          BLCovFurtherQuestion2: "N",
          BLCovFurtherQuestion3: "N",
          BLCovFurtherQuestion4: "N",
          BLInterestedParty: "",
          DirectorHistory: "DH3",
          CreditScore: "CS1",
          Import: "N",
          AnnualWages: "85000",
          Turnover: "450000",
          NumberofEmployees: "2",
          PropertyUnderYourCareorCustody: "6700",
          ConctororLabourHirePaynts: "7000",
          ClaimsInLastFiveYears: "N",
          PolicyBenefitList: [
            {
              ProductElementCode: "B00863",
              LimitOfLiability: "5000000",
              TaxAuditSI: "20000",
              Excess: "750",
            },
          ],
        });
      }
    }
    if (selected.includes(1)) {
      const result = CheckExists(
        Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList,
        "C0001786"
      );
      console.log("result", result.length);
      if (Object.keys(result).length) {
        coveragelist.push(result);
      } else {
        coveragelist.push({
          ProductElementCode: "C0001786",
          LineOfBusinessCode: "PRP",
          IndemnityPeriod: "9M",
          IndemnityPeriod_Name: "9 Months",
          GrossProfit: "283095",
          AdditionIncreaseCostOfWorking: "2000",
          ClaimPreparationCost: "1000",
          BIInterestedParty: "",
          ClaimsInLastFiveYears: "N",
          PolicyBenefitList: [
            {
              ProductElementCode: "B00864",
              Excess: "1000",
              Turnover: "450000",
            },
          ],
        });
      }
    }
    if (selected.includes(2)) {
      const result = CheckExists(
        Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList,
        "C0001787"
      );
      if (Object.keys(result).length) {
        coveragelist.push(result);
      } else {
        coveragelist.push({
          ProductElementCode: "C0001787",
          LineOfBusinessCode: "PRP",
          PBCInterestedParty: "",
          ClaimsInLastFiveYears: "N",
          PolicyBenefitList: [
            {
              ProductElementCode: "B00865",
              BlanketCoverContent: "1800",
            },
            {
              ProductElementCode: "B00866",
              BlanketCoverStock: "1500",
              Excess: "2500",
            },
          ],
          PolicyEntityList: [
          ],
        });
      }
    }
    if (selected.includes(3)) {
      const result = CheckExists(
        Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList,
        "C0001788"
      );
      if (Object.keys(result).length) {
        coveragelist.push(result);
      } else {
        coveragelist.push({
          ProductElementCode: "C0001788",
          LineOfBusinessCode: "PRP",
          BNCFurtherQuestion1: "N",
          BNCFurtherQuestion2: "Y",
          BNCFurtherQuestion3: "N",
          BNCFurtherQuestion4: "Y",
          BNCFurtherQuestion5: "",
          CommercialCookingClauseQuestion: "Y",
          FloodCoverQuestion: "N",
          ClaimsInLastFiveYears: "N",
          PolicyBenefitList: [
            {
              ProductElementCode: "B00868",
              SumInsured: "200000",
              Excess: "1000",
            },
            {
              ProductElementCode: "B00869",
              SumInsured: "250000",
              Excess: "1000",
            },
            {
              ProductElementCode: "B00870",
              SumInsured: "300000",
              Excess: "1000",
            },
          ],
        });
      }
    }

    if (selected.includes(4)) {
      const result = CheckExists(
        Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList,
        "C0001790"
      );
      if (Object.keys(result).length) {
        coveragelist.push(result);
      } else {
        coveragelist.push({
          ProductElementCode: "C0001790",
          LineOfBusinessCode: "PRP",
          ClaimsInLastFiveYears: "N",
          PolicyBenefitList: [
            {
              ProductElementCode: "B00874",
              BlanketCover: "20000",
              Excess: "500",
              DeteriorationOfStock: "2000",
              ICOWIncreasedCostofWorking: "3000",
              NumberofMachines: "10",
            },
            {
              ProductElementCode: "B00875",
              Excess: "750",
              ComputerLimit: "1800",
              PortableElectronicEquipment: "2000",
              OtherElectronicEquipment: "300",
            },
          ],
        });
      }
    }
    if (selected.includes(5)) {
      const result = CheckExists(
        Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList,
        "C0001789"
      );
      if (Object.keys(result).length) {
        coveragelist.push(result);
      } else {
        coveragelist.push({
          ProductElementCode: "C0001789",
          LineOfBusinessCode: "PRP",
          TMGFurtherQuestion1: "",
          ClaimsInLastFiveYears: "Y",
          PolicyBenefitList: [
            {
              ProductElementCode: "B00871",
              TheftExcludingTobacco: "2100",
              TheftTobacco: "8000",
              Excess: "500",
              SecurityAlarm: "monitoredAlarm",
              DeadlocksonallExternalDoors: "true",
              KeyOpredLocksonallExterWins: "false",
              Barsecurscreensonallexternwins: "true",
            },
            {
              ProductElementCode: "B00872",
              MoneyInPremisesDuringBuSInessSI: "5000",
              Moneyonpremoutsidebusinesshrs: "2000",
              Moneyonpremlockedsafe: "8000",
              MoneyInTranSItSI: "1000",
              Moneyinapvtresidence: "1200",
              Excess: "750",
            },
            {
              ProductElementCode: "B00873",
              GlassSumInsured: "Replacement Value",
              SumInsured: "2000",
              TypeofGlass: "external",
              PercentageGlassAbvGrndFlr: "18",
              PlateTypeGlass: "plate",
              Excess: "500",
              GlassInterestedParty: "",
            },
          ],
        });
      }
    }

    console.log("coveragelist", coveragelist);
    setData({
      ...Data,
      PolicyLobList: [
        {
          ...Data.PolicyLobList[0],
          PolicyRiskList: [
            {
              ...Data.PolicyLobList[0].PolicyRiskList[0],
              PolicyCoverageList: coveragelist,
            },
          ],
        },
      ],
    });
  }, []);

  console.log(FurtherQuestion, FurtherQuestion);

  const accordionData = {
    accordions: [
      ...(selected.includes(3) || selected.includes(4) || selected.includes(5)
        ? [
            {
              title: "PROPERTY COVERS",
              details: [
                {
                  title: "Property 1 details",
                  details: [
                    {
                      title: "Property 1 Details",
                      details: [],
                      component: (
                        <PropertyDetails Data={Data} setData={setData} />
                      ), // Passing Custom Component here
                    },
                    ...(selected.includes(3)
                      ? [
                          {
                            title: "Building and contents",
                            details: [
                              {
                                title:
                                  "Building and Contents Limits and Excess",
                                details: [],
                                component: (
                                  <BuildingAndContentsLimits
                                    Data={Data}
                                    setData={setData}
                                    ProductElementCode="C0001788"
                                  />
                                ), // Passing Custom Component here
                              },
                              ...([
                                ...(Array.isArray(
                                  FurtherQuestion[
                                    "Business Building and Contents"
                                  ]["All"]
                                )
                                  ? FurtherQuestion[
                                      "Business Building and Contents"
                                    ]["All"]
                                  : []),
                                ...(Array.isArray(
                                  FurtherQuestion[
                                    "Business Building and Contents"
                                  ][Data.ANZSICCode]
                                )
                                  ? FurtherQuestion[
                                      "Business Building and Contents"
                                    ][Data.ANZSICCode]
                                  : []),
                              ].length
                                ? [
                                    {
                                      title:
                                        "Building and Contents Further Questions",
                                      details: [],
                                      component: (
                                        <QuestionsComponent
                                          Data={Data}
                                          setData={setData}
                                          questionsData={[
                                            ...(Array.isArray(
                                              FurtherQuestion[
                                                "Business Building and Contents"
                                              ]["All"]
                                            )
                                              ? FurtherQuestion[
                                                  "Business Building and Contents"
                                                ]["All"]
                                              : []),
                                            ...(Array.isArray(
                                              FurtherQuestion[
                                                "Business Building and Contents"
                                              ][Data.ANZSICCode]
                                            )
                                              ? FurtherQuestion[
                                                  "Business Building and Contents"
                                                ][Data.ANZSICCode]
                                              : []),
                                          ]}
                                        />
                                      ),
                                    },
                                  ]
                                : []),
                              {
                                title: "Building and Contents Claims History",
                                details: [],
                                component: (
                                  <ClaimsComponent
                                    Data={Data}
                                    setData={setData}
                                    ProductElementCode="C0001788"
                                  />
                                ),
                              }
                            ],
                          },
                        ]
                      : []),
                    ...(selected.includes(4)
                      ? [
                          {
                            title: "Equipment breakdown",
                            details: [
                              {
                                title: "Equipment Breakdown Limits and Excess",
                                details: [],
                                component: <EquipmentBreakdownLimitsAndExcess Data={Data} setData={setData}  ProductElementCode="C0001790"/>, // Passing Custom Component here
                              },
                              ...([
                                ...(Array.isArray(
                                  FurtherQuestion["Equipment Breakdown"]["All"]
                                )
                                  ? FurtherQuestion["Equipment Breakdown"][
                                      "All"
                                    ]
                                  : []),
                                ...(Array.isArray(
                                  FurtherQuestion["Equipment Breakdown"][
                                    Data.ANZSICCode
                                  ]
                                )
                                  ? FurtherQuestion["Equipment Breakdown"][
                                      Data.ANZSICCode
                                    ]
                                  : []),
                              ].length
                                ? [
                                    {
                                      title:
                                        "Equipment Breakdown Further Questions",
                                      details: [],
                                      component: (
                                        <QuestionsComponent
                                          Data={Data}
                                          setData={setData}
                                          questionsData={[
                                            ...(Array.isArray(
                                              FurtherQuestion[
                                                "Equipment Breakdown"
                                              ]["All"]
                                            )
                                              ? FurtherQuestion[
                                                  "Equipment Breakdown"
                                                ]["All"]
                                              : []),
                                            ...(Array.isArray(
                                              FurtherQuestion[
                                                "Equipment Breakdown"
                                              ][Data.ANZSICCode]
                                            )
                                              ? FurtherQuestion[
                                                  "Equipment Breakdown"
                                                ][Data.ANZSICCode]
                                              : []),
                                          ]}
                                        />
                                      ),
                                    },
                                  ]
                                : []),
                              {
                                title: "Equipment Breakdown Claims History",
                                details: [],
                                component: (
                                  <ClaimsComponent
                                    Data={Data}
                                    setData={setData}
                                    ProductElementCode="C0001790"
                                  />
                                ),
                              }
                              
                            ],
                          },
                        ]
                      : []),
                    ...(selected.includes(5)
                      ? [
                          {
                            title: "Theft, money, and glass",
                            details: [
                              {
                                title:
                                  "Theft, Money, and Glass Limits and Excess",
                                details: [],
                              },
                              {
                                title:
                                  "Theft, Money, and Glass Further Questions",
                                details: [],
                              },
                              {
                                title: "Theft, Money, and Glass Claims History",
                                details: [],
                                component: (
                                  <ClaimsComponent
                                    Data={Data}
                                    setData={setData}
                                    ProductElementCode="C0001789"
                                  />
                                ),
                              }
                              
                            ],
                          },
                        ]
                      : []),
                  ],
                },
              ],
            },
          ]
        : []),

      ...(selected.includes(0) || selected.includes(1) || selected.includes(2)
        ? [
            {
              title: "Policy Covers",
              details: [
                ...(selected.includes(0)
                  ? [
                      {
                        title: "Business Liability Coverage",
                        details: [
                          {
                            title:
                              "Business Liability Coverage Limit and Excess",
                            details: [],
                            component: <BusinessLiabilityCoverage Data={Data} setData={setData} ProductElementCode="C0001785" />, // Passing Custom Component here
                          },
                          ...([
                            ...(Array.isArray(
                              FurtherQuestion["Business Liability"]["All"]
                            )
                              ? FurtherQuestion["Business Liability"]["All"]
                              : []),
                            ...(Array.isArray(
                              FurtherQuestion["Business Liability"][
                                Data.ANZSICCode
                              ]
                            )
                              ? FurtherQuestion["Business Liability"][
                                  Data.ANZSICCode
                                ]
                              : []),
                          ].length
                            ? [
                                {
                                  title:
                                    " Business Liability Coverage Further Questions",
                                  details: [],
                                  component: (
                                    <QuestionsComponent
                                      Data={Data}
                                      setData={setData}
                                      questionsData={[
                                        ...(Array.isArray(
                                          FurtherQuestion["Business Liability"][
                                            "All"
                                          ]
                                        )
                                          ? FurtherQuestion[
                                              "Business Liability"
                                            ]["All"]
                                          : []),
                                        ...(Array.isArray(
                                          FurtherQuestion["Business Liability"][
                                            Data.ANZSICCode
                                          ]
                                        )
                                          ? FurtherQuestion[
                                              "Business Liability"
                                            ][Data.ANZSICCode]
                                          : []),
                                      ]}
                                    />
                                  ),
                                },
                              ]
                            : []),
                          {
                            title: "Business Liability Coverage Loss History",
                            details: [],
                            component: (
                              <ClaimsComponent
                                Data={Data}
                                setData={setData}
                                ProductElementCode="C0001785"
                              />
                            ),
                          }
                          
                        ],
                      },
                    ]
                  : []),
                ...(selected.includes(1)
                  ? [
                      {
                        title: "Business Interruption Coverage",
                        details: [
                          {
                            title: "Business Interruption Limits and Excess",
                            details: [],
                            component: <BusinessInterruptionLimitsAndExcess Data={Data} setData={setData} ProductElementCode={"C0001786"}/>,
                          },
                          {
                            title: "Business Interruption Claims History",
                            details: [],
                            component: (
                              <ClaimsComponent
                                Data={Data}
                                setData={setData}
                                ProductElementCode="C0001786"
                              />
                            ),
                          }
                          
                        ],
                      },
                    ]
                  : []),
                ...(selected.includes(2)
                  ? [
                      {
                        title: "Portable Business Contents Coverage",
                        details: [
                          {
                            title:
                              "Portable Business Contents Limit and Excess",
                              details: [],
                              component:<PortableBusinessContentsLimits Data={Data} setData={setData} ProductElementCode={"C0001787"}/>
                          },
                          {
                            title:
                              "Portable Business Contents Specified Items",
                               details: [],
                               component:<PortableBusinessContentsSpecifiedItems Data={Data} setData={setData} ProductElementCode={"C0001787"} />
                          },
                          {
                            title: "Portable Business Contents Claims History",
                            details: [],
                            component: (
                              <ClaimsComponent
                                Data={Data}
                                setData={setData}
                                ProductElementCode="C0001787"
                              />
                            ),
                          }
                        ],
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
    ],
  };
  return (
    <>
      {Data.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.length > 0 && (
        <RecursiveAccordion
          data={accordionData.accordions}
          Data={Data}
          setData={setData}
        />
      )}
    </>
  );
};

export default App;
