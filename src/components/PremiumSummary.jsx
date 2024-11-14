import {
    Box,
    FormControl,
    FormLabel,
    Radio,
    Typography,
    Grid2,
    Button, Backdrop, CircularProgress, TextField
} from "@mui/material";
import React, { useState } from "react";
import buttonBack from "../../public/assets/img/buttonBack.svg";
import Image from "next/image";
import TableSummary from "./Table";
import { Liability, Property } from "./Liability";
import axiosInstance from "./axiosInstance";

const declarationQuestions = [
  {
    questionSM: "Had any insurance declined or cancelled?",
    questionXS: "Had any insurance declined or cancelled?",
  },
  {
    questionSM: "Been convicted of any criminal offence?",
    questionXS: "Been convicted of any criminal offence?",
  },
  {
    questionSM: (
      <>
        Been declared bankrupt or involved in a business
        <br />
        which became insolvent or is subject to any form <br />
        of insolvency administration?
      </>
    ),
    questionXS: (
      <>
        Been declared bankrupt or involved in a business which became insolvent
        or is subject to any form of insolvency administration?
      </>
    ),
  },
  {
    questionSM: (
      <>
        Suffered any loss or damage which would have <br />
        been covered by the proposed insurance policy?
      </>
    ),
    questionXS: (
      <>
        Suffered any loss or damage which would have been covered by the
        proposed insurance policy?
      </>
    ),
  },
];

const RadioGroupField = ({ question, field, value, handleChange, error }) => (
  <Grid2 size={{ xs: 12, lg: 8 }}>
    <Box sx={styles.furtherQBox}>
      <FormLabel sx={{ ...styles.formLabel, marginRight: "1.75rem" }}>
        {question}
      </FormLabel>
      <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
        {["Yes", "No"].map((option) => (
          <FormControl
            key={option}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Radio
              checked={value === option}
              onChange={() => handleChange(field, option)}
              value={option}
              name={field}
              sx={styles.radioButton}
              inputProps={{ "aria-label": option }}
            />
            <FormLabel sx={styles.formLabel}>{option}</FormLabel>
          </FormControl>
        ))}
      </Box>
    </Box>
    {error && <Typography color="error">{error}</Typography>}
  </Grid2>
);

const PremiumSummary = ({ handleNext,Quote,Data,setQuote}) => {

  console.log("Data Premium summary",Data)
  const [formState, setFormState] = useState({
    declarations: Array(declarationQuestions.length).fill("No"),
    exemption: "No",
    limitsOfLiability: "No",
  });

  const [errors, setErrors] = useState({});
  const [premiumCalculate, setPremiumCalculate] = useState(false);
  const [loader,setLoader]=useState({
    loader:false,
    msg:''
  })

  const handleDeclarationChange = (field, value) => {
    const index = parseInt(field.replace("declaration", ""), 10);
    const newDeclarations = [...formState.declarations];
    newDeclarations[index] = value;
    setFormState((prev) => ({ ...prev, declarations: newDeclarations }));
  };
  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    formState.declarations.forEach((value, index) => {
      if (!value) {
        newErrors[`declaration${index}`] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setLoader({
      loader:true,
      msg:"Calculating Premium....."
    })
    e.preventDefault();
    if (validateForm()) {
      let data = {
        "LibCommission": 20,
        "PropCommission": 20,
        "Hadanyinsurdeclinedorcancelled": formState.declarations[0]==="Yes"?"Y":"N",
        "ConvictedCriminalOffence": formState.declarations[1]==="Yes"?"Y":"N",
        "BankruptorInsolvencyBusiness": formState.declarations[2]==="Yes"?"Y":"N",
        "Sufferedlossordamagecovbyinspol": formState.declarations[3]==="Yes"?"Y":"N",
        "NSWstampDutyExemption": formState.exemption==="Yes"?"Y":"N",
        ...Quote,
      }

      const response = await axiosInstance.post('/fullquote',data);

      if(response.data.fullquote){
        setPremiumCalculate(true)
      }


      // handleNext()



    } else {
      console.log("Validation Failed", errors);
    }
    setLoader({
      loader:false,
      msg:""
    })
  };

  const handleBlockQuote = async () => {
    setLoader({
      loader:true,
      msg:"Blocking Quote ....."
    })
    if (validateForm()) {
      console.log("Form Submitted", formState);
      let data = { ProposalNo:Quote.ProposalNo }
      const response = await axiosInstance.post('/blockquote',data);

      if(response.data.blockquote){
        setQuote(response.data.blockquote)
        handleNext()
      }
      setLoader({
        loader:false,
        msg:"Blocking Quote ....."
      })
  }
}

  const handleNoToAll = () => {
    const newDeclarations = declarationQuestions.map(() => "No");
    setFormState((prev) => ({ ...prev, declarations: newDeclarations }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems={{ md: "end" }}>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>Premium Breakdown</Typography>
        <Grid2 container spacing={2} px={4}>
          <Grid2 size={{ lg: 12, xs: 12 }} mt={4}>
            <Box sx={styles.declarationSection}>
              <Box>
                <Typography sx={styles.description}>
                  Declaration Questions
                </Typography>
                <Typography sx={styles.caption}>
                  In the last 5 years, has your business or you or any partner
                  or director:
                </Typography>
              </Box>
              <FormControl
                sx={styles.noToAllFormControl}
                onClick={handleNoToAll}
              >
                <Radio
                  checked={formState.declarations.every(
                    (state) => state === "No"
                  )}
                  onChange={handleNoToAll}
                  value="No to All"
                  name="noToAll"
                  sx={styles.radio}
                  inputProps={{ "aria-label": "No to All" }}
                />
                <FormLabel sx={styles.formLabel}>No to All</FormLabel>
              </FormControl>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
            >
              {declarationQuestions.map((question, index) => (
                <RadioGroupField
                  question={question.questionSM}
                  field={`declaration${index}`}
                  value={formState.declarations[index]}
                  handleChange={handleDeclarationChange}
                  error={errors[`declaration${index}`]}
                  key={index}
                />
              ))}
            </Box>
          </Grid2>

          <Grid2 container size={{ lg: 12, xs: 12 }} mt={4}>
            <Typography sx={styles.commissionTitle}>Commission</Typography>

            <Grid2 size={12}>
              <TextField
                label="Liability"
                placeholder="Liability"
                onChange={(e) => setQuote((prev)=>({...prev,["LibCommission"]: e.target.value}))}
                sx={{
                  ...styles.feeValue,
                  color: "rgba(69, 34, 98, 1)",
                  fontSize: "18px",
                }}
                value={Quote.LibCommission}
              />
            </Grid2>
            <Grid2 size={12}>
                <TextField
                    label="Property"
                    placeholder="Property"
                    onChange={(e) => setQuote((prev)=>({...prev,["PropCommission"]: e.target.value}))}
                    sx={{
                        ...styles.feeValue,
                        color: "rgba(69, 34, 98, 1)",
                        fontSize: "18px",
                    }}
                    value={Quote.PropCommission}
                />
            </Grid2>
            <Grid2 size={12} mt={2}>
              <Box width="100%">
                <Typography sx={styles.exemptionTitle}>Exemption</Typography>
                <Typography sx={styles.exemptionSubtitle}>
                  Any exemption:
                </Typography>
                <Box
                  position="relative"
                  mt={3}
                  display={{ xs: "none", sm: "flex" }}
                  maxWidth={"369px"}
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
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "15px",
                        color: "#452262",
                      }}
                    >
                      Are you claiming NSW stamp duty exemption?
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid rgba(69, 34, 98, 0.1)",
                      borderRadius: "10px",
                      padding: "20px 0px 10px 20px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                    }}
                  >
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        ".MuiFormLabel-root.Mui-focused": {
                          color: "#F55B1D",
                        },
                      }}
                    >
                      <Radio
                        checked={formState.exemption === "Yes"}
                        onChange={() => handleChange("exemption", "Yes")}
                        value="Yes"
                        name="exemption"
                        sx={{
                          color: "rgba(69, 34, 98, 0.2)",
                          "&.Mui-checked": {
                            color: "#F55B1D",
                          },
                        }}
                        inputProps={{ "aria-label": "Yes" }}
                      />
                      <FormLabel
                        sx={{
                          fontFamily: "Arboria-Medium",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "19.89px",
                          textAlign: "left",
                          color: "rgba(69, 34, 98, 1)",
                        }}
                      >
                        Yes
                      </FormLabel>
                    </FormControl>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        ".MuiFormLabel-root.Mui-focused": {
                          color: "#F55B1D",
                        },
                      }}
                    >
                      <Radio
                        checked={formState.exemption === "No"}
                        onChange={() => handleChange("exemption", "No")}
                        value="No"
                        name="exemption"
                        inputProps={{ "aria-label": "No" }}
                        sx={{
                          color: "rgba(69, 34, 98, 0.2)",
                          "&.Mui-checked": {
                            color: "#F55B1D",
                          },
                        }}
                      />
                      <FormLabel
                        sx={{
                          fontFamily: "Arboria-Medium",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "19.89px",
                          textAlign: "left",
                          color: "rgba(69, 34, 98, 1)",
                        }}
                      >
                        No
                      </FormLabel>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box sx={styles.exemptionMobileBox}>
                <Box sx={styles.exemptionMobileContent}>
                  <Typography sx={styles.exemptionLabel}>
                    Are you claiming NSW stamp duty exemption?
                  </Typography>
                  <Box sx={styles.radioGroup}>
                    <FormControl sx={styles.radioControl}>
                      <Radio
                        checked={formState.exemption === "Yes"}
                        onChange={() => handleChange("exemption", "Yes")}
                        value="Yes"
                        name="exemptionMobile"
                        sx={styles.radio}
                        inputProps={{ "aria-label": "Yes" }}
                      />
                      <FormLabel sx={styles.formLabel}>Yes</FormLabel>
                    </FormControl>
                    <FormControl sx={styles.radioControl}>
                      <Radio
                        checked={formState.exemption === "No"}
                        onChange={() => handleChange("exemption", "No")}
                        value="No"
                        name="exemptionMobile"
                        sx={styles.radio}
                        inputProps={{ "aria-label": "No" }}
                      />
                      <FormLabel sx={styles.formLabel}>No</FormLabel>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container>
          <Grid2 size={{ lg: 12, xs: 12 }} mt={8} px={4}>
            <Typography sx={styles.summaryTitle}>Premium Summary</Typography>
            <TableSummary Data={Data.selectedCoverages}  Quote={Quote} />
          </Grid2>
          {/* <Grid2
            size={{ lg: 4, xs: 12 }}
            mt={{ xl: 14, xs: 4 }}
            display="flex"
            flexDirection="column"
            alignItems="end"
          >
            <Box sx={styles.feesBox}>
              <Box sx={styles.feeItem}>
                <Typography sx={styles.feeLabel}>Agent Fees</Typography>
                <Typography sx={styles.feeValue}>$100.00</Typography>
              </Box>
              <Box sx={styles.feeItem}>
                <Typography sx={styles.feeLabel}>GST on Agent Fees</Typography>
                <Typography sx={styles.feeValue}>$10.00</Typography>
              </Box>
              <Box sx={styles.feeItem}>
                <Typography sx={styles.feeLabel}>Broker Fees</Typography>
                <Typography sx={styles.feeValue}>$0.00</Typography>
              </Box>
              <Box sx={styles.feeItem}>
                <Typography sx={styles.feeLabel}>GST on Broker Fees</Typography>
                <Typography sx={styles.feeValue}>$0.00</Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={styles.totalPayable}>$1,709.84</Typography>
              <Typography sx={styles.totalLabel}>Total Payable</Typography>
            </Box>
          </Grid2> */}
        </Grid2>
      </Box>
      <Box sx={{display:'flex'}}> 
      <Button
          className="button"
          onClick={handleSubmit}
          variant="outlined"
          sx={{
          
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
            marginRight: "1rem",
            height: "40px",
            textAlign: "left",
            // color: "",
            transition: "transform 0.3s ease-in-out"
          }}
          // sx={styles.proceedButton}
        >
          calculate Premium
        </Button>
        <Button
          disabled={!premiumCalculate}
          className="button"
          onClick={handleBlockQuote}
          sx={styles.proceedButton}
        >
          Proceed
        </Button>
      </Box>
      <Backdrop
        open={loader.loader} // Control when the loader is shown
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures it covers everything
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent grey background
        }}
      >
        <CircularProgress
          size={25}
          sx={{
            color: "#F55B1D", // Set the loader color here
          }}
        />
        <Typography sx={{ ml: 1 }}>{loader.msg}</Typography>
      </Backdrop>
    </Box>
  );
};
export default PremiumSummary;
const styles = {
  labelBox: {
    backgroundColor: "#FFF",
    borderBottom: "1px solid rgba(69, 34, 98, 0.2)",
    position: "absolute",
    borderRadius: "0px 0px 4px 4px",
    marginLeft: "20px",
    marginTop: "-10px",
    padding: "4px 8px",
  },
  itemLabel: {
    fontFamily: "Arboria-Book",
    fontSize: "12px",
    color: "#452262",
  },
  furtherQBox: {
    border: "1px solid rgba(69, 34, 98, 0.2)",
    backgroundColor: "rgba(178, 178, 178, 0.15)",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
  },
  radioButton: {
    color: "rgba(69, 34, 98, 0.2)",
    "&.Mui-checked": {
      color: "#F55B1D",
    },
  },
  formLabel: {
    fontFamily: "Arboria-Medium",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19.89px",
    color: "rgba(69, 34, 98, 1)",
  },

  container: {
    backgroundColor: "#FFF",
    borderRadius: "15px",
    py: { xs: 4, lg: 8 },
    px: { xs: 0, md: 2 },
  },
  title: {
    fontFamily: "Outfit",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "30.24px",
    textAlign: "left",
    px: 4,
    color: "#452262",
  },
  declarationSection: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 4,
    alignItems: { sm: "flex-end", xs: "center" },
    justifyContent: { sm: "space-between", xs: "center" },
  },
  description: {
    fontFamily: "Arboria-Medium",
    fontSize: "21px",
    fontWeight: 400,
    lineHeight: "26.1px",
    textAlign: "left",
    color: "#000000",
  },
  caption: {
    fontFamily: "Arboria-Book",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "14.64px",
    textAlign: "left",
    color: "#000000",
  },
  noToAllFormControl: {
    display: "flex",
    flexDirection: "row",
    padding: "0px 20px",
    color: "#F55B1D",
    cursor: "pointer",
    borderRadius: "10px",
    background:
      "linear-gradient(to right, rgba(245, 91, 29, 0), rgba(245, 91, 29, 0.3))",
    alignItems: "center",
    ".MuiFormLabel-root.Mui-focused": {
      color: "#F55B1D",
    },
  },
  radio: {
    color: "rgba(69, 34, 98, 0.2)",
    "&.Mui-checked": {
      color: "#F55B1D",
    },
  },
  questionBox: {
    mt: 4,
  },
  questionContainer: {
    border: "1px solid rgba(69, 34, 98, 0.1)",
    backgroundColor: "rgba(178, 178, 178, 0.15)",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    gap: 2,
    width: { md: "60%", xs: "100%" },
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
  },
  questionContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  questionLabel: {
    fontFamily: "Arboria-Medium",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19.89px",
    color: "#452262",
    marginRight: { xs: 0, sm: "1rem" },
  },
  radioGroup: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  radioControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ".MuiFormLabel-root.Mui-focused": {
      color: "#F55B1D",
    },
  },
  commissionTitle: {
    fontFamily: "Arboria-Medium",
    fontSize: "21px",
    fontWeight: 400,
    lineHeight: "26.1px",
    textAlign: "left",
    color: "#000000",
  },
  subTitle: {
    position: "relative",
    marginLeft: "1.75rem",
    fontFamily: "Arboria-Book",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "6px",
    color: "#452262",
  },
  svgBox: {
    pointerEvents: "none",
    width: "100%",
    height: "auto",
    mt: 1,
  },
  exemptionContainer: {
    width: "100%",
  },
  exemptionTitle: {
    fontFamily: "Arboria-Medium",
    fontSize: "21px",
    fontWeight: 400,
    lineHeight: "26.1px",
    textAlign: "left",
    color: "#000000",
  },
  exemptionSubtitle: {
    fontFamily: "Arboria-Book",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "14.64px",
    mt: 0.5,
    textAlign: "left",
    color: "#000000",
  },
  exemptionBox: {
    position: "relative",
    mt: 3,
    display: { xs: "none", sm: "flex" },
    maxWidth: "369px",
  },
  exemptionLabelBox: {
    backgroundColor: "#FFF",
    borderBottom: "1px solid rgba(69, 34, 98, 0.2)",
    position: "absolute",
    borderRadius: "0px 0px 4px 4px",
    marginLeft: "20px",
    marginTop: "-10px",
    padding: "4px 8px",
  },
  exemptionLabel: {
    fontFamily: "Arboria-Book",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "15px",
    color: "#452262",
  },
  exemptionRadioGroup: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  exemptionMobileBox: {
    display: { xs: "flex", sm: "none" },
    mt: 4,
    width: "100%",
  },
  exemptionMobileContent: {
    border: "1px solid rgba(69, 34, 98, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    gap: 2,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryTitle: {
    fontFamily: "Arboria-Medium",
    fontSize: "21px",
    fontWeight: 400,
    lineHeight: "26.1px",
    textAlign: "left",
    color: "#000000",
  },
  feesBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
  },
  feeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 4,
  },
  feeLabel: {
    fontFamily: "Arboria-Medium",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "14.64px",
    color: "rgba(61, 61, 61, 1)",
  },
  feeValue: {
    fontFamily: "Outfit",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "14.64px",
    color: "rgba(61, 61, 61, 1)",
  },
  totalPayable: {
    marginTop: "1.5rem",
    background: "rgba(245, 91, 29, 0.25)",
    width: "130px",
    borderRadius: "5px 0px 0px 5px",
    textAlign: "center",
    padding: "10px",
    fontFamily: "Outfit",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "19.76px",
    color: "rgba(245, 91, 29, 1)",
  },
  totalLabel: {
    marginTop: "1px",
    width: "130px",
    borderRadius: "5px 0px 0px 5px",
    textAlign: "center",
    padding: "10px",
    fontFamily: "Outfit",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "19.76px",
    color: "rgba(69, 34, 98, 1)",
  },
  proceedButton: {
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
};
