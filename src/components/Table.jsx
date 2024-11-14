import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Radio,
  Typography,
  Grid,
  Grid2,
  Button,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  Paper,
} from "@mui/material";



const TableSummary = ({Data,Quote}) => {

  const [data,setData] = React.useState([])
  const [total, setTotal] = React.useState({
    basePremium: 0,
    emergencyServiceLevy: 0,
    gst: 0,
    stampDuty: 0,
    agentAndGst: 0,
    total: 0,
  });

    const getValue = (code, field, ProductElementCode) => {
        const data = Quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.find(
            (coverage) => coverage.ProductElementCode == ProductElementCode
        );

        if (!data) {
            return 0;  // Return 0 if no matching coverage found
        }

        if (code === "") {
            return data[field] || 0;  // Return 0 if the field is undefined
        } else {
            const currentObject = data.PolicyBenefitList.find(
                (benefit) => benefit.ProductElementCode == code
            );
            return currentObject ? (currentObject[field] || 0) : 0;  // Return 0 if currentObject is not found
        }
    };


    useEffect(() => {
        let tempdata = [];
        let tempTotal = {
            basePremium: 0,
            emergencyServiceLevy: 0,
            gst: 0,
            stampDuty: 0,
            agentAndGst: 0,
            total: 0,
        };

        const coverageDetails = [
            { label: "Business Liability", code: "C0001785" },
            { label: "Business Interruption", code: "C0001786" },
            { label: "Portable Business Content", code: "C0001787" },
            { label: "Business Building and Contents", code: "C0001788" },
            { label: "Equipment Breakdown", code: "C0001790" },
            { label: "Theft, Money and Glass", code: "C0001789" }
        ];

        coverageDetails.forEach((coverage, index) => {
            if (Data.includes(index)) {
                const basePremium = parseFloat(getValue("", "StandardNetPremium", coverage.code)) || 0;
                const emergencyServiceLevy = parseFloat(getValue("", "EmergencyServiceLevy", coverage.code)) || 0;
                const gst = parseFloat(getValue("", "GST", coverage.code)) || 0;
                const stampDuty = parseFloat(getValue("", "StampDuty", coverage.code)) || 0;
                const agent = Quote.AgentFees || 0;
                const agentGst = Quote.GSTAgentFee || 0;

                const agentAndGst = (agent + agentGst);
                const total = (basePremium + emergencyServiceLevy + gst + stampDuty + agentAndGst);

                tempdata.push({
                    coverage: coverage.label,
                    borderRight: "1px solid rgba(245, 91, 29, 0.2)",
                    basePremium: `$${basePremium.toFixed(2)}`,
                    emergencyServiceLevy: `$${emergencyServiceLevy.toFixed(2)}`,
                    gst: `$${gst.toFixed(2)}`,
                    stampDuty: `$${stampDuty.toFixed(2)}`,
                    agentAndGst: `$${agentAndGst.toFixed(2)}`,
                    total: `$${total.toFixed(2)}`,
                });

                tempTotal.basePremium += basePremium;
                tempTotal.emergencyServiceLevy += emergencyServiceLevy;
                tempTotal.gst += gst;
                tempTotal.stampDuty += stampDuty;
                tempTotal.agentAndGst += agentAndGst;
                tempTotal.total += total;
            }
        });

        setData(tempdata);

        setTotal({
            basePremium: `$${(tempTotal.basePremium || 0).toFixed(2)}`,
            emergencyServiceLevy: `$${(tempTotal.emergencyServiceLevy || 0).toFixed(2)}`,
            gst: `$${(tempTotal.gst || 0).toFixed(2)}`,
            stampDuty: `$${(tempTotal.stampDuty || 0).toFixed(2)}`,
            agentAndGst: `$${(tempTotal.agentAndGst || 0).toFixed(2)}`,
            total: `$${(tempTotal.total || 0).toFixed(2)}`,
        });

    }, [Quote, Data]);

    // const data = [
  //   {
  //     coverage: "Business Liability",
  //     borderRight: "1px solid rgba(245, 91, 29, 0.2)",
  //     basePremium: "$1,011.81",
  //     emergencyServiceLevy: "$0.00",
  //     gst: "$101.18",
  //     stampDuty: "$100.17",
  //     total: "$1,213.16",
  //   },
  //   {
  //     coverage: "Policy Level Sub Total",
  //     borderRight: "1px solid rgba(245, 91, 29, 0.45)",
  //     basePremium: "$1,011.81",
  //     emergencyServiceLevy: "$0.00",
  //     gst: "$101.18",
  //     stampDuty: "$100.17",
  //     total: "$1,213.16",
  //   },
  //   {
  //     coverage: "Business Building and Contents",
  //     borderRight: "1px solid rgba(245, 91, 29, 0.55)",
  //     basePremium: "$250.00",
  //     emergencyServiceLevy: "$72.50",
  //     gst: "$32.25",
  //     stampDuty: "$31.93",
  //     total: "$386.68",
  //   },
  //   {
  //     coverage: "Property 1 Sub Total",
  //     borderRight: "1px solid rgba(245, 91, 29, 0.77)",
  //     basePremium: "$250.00",
  //     emergencyServiceLevy: "$72.50",
  //     gst: "$32.25",
  //     stampDuty: "$31.93",
  //     total: "$386.68",
  //   },
  // ];


  return (
    <Box mt={3}>
      <TableContainer
        //   component={Paper}
        sx={{ border: "1px solid rgba(69, 34, 98, 0.1)", borderRadius: "15px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(69, 34, 98, 0.1)", // Updated border color
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",

                  textAlign: "center",
                  color: "rgba(69, 34, 98, 1)",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                COVERAGE
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(69, 34, 98, 0.1)", // Updated border color
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(69, 34, 98, 1)",
                  textTransform: "uppercase",
                }}
              >
                BASE PREMIUM
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(69, 34, 98, 0.1)", // Updated border color
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(69, 34, 98, 1)",
                  textTransform: "uppercase",
                }}
              >
                EMERGENCY SERVICE LEVY
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(69, 34, 98, 0.1)", // Updated border color
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(69, 34, 98, 1)",
                  textTransform: "uppercase",
                }}
              >
                GST
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(69, 34, 98, 0.1)", // Updated border color
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(69, 34, 98, 1)",
                  textTransform: "uppercase",
                }}
              >
                STAMP DUTY
              </TableCell>
                <TableCell
                    sx={{
                        borderRight: "1px solid rgba(69, 34, 98, 0.1)", // Updated border color
                        fontFamily: "Arboria-Medium",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "17.4px",
                        textAlign: "center",
                        color: "rgba(69, 34, 98, 1)",
                        textTransform: "uppercase",
                    }}
                >
                    AGENT + GST FEE
                </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(69, 34, 98, 1)",
                  textTransform: "uppercase",
                }}
              >
                TOTAL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  background:
                    index % 2 === 0 ? "rgba(69, 34, 98, 0.1)" : "transparent",
                }}
              >
                <TableCell
                  sx={{
                    borderRight: row.borderRight, // Updated border color
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17.4px",
                    textAlign: "left",
                    color: "rgba(51, 51, 51, 1)",
                  }}
                >
                  {row.coverage}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: row.borderRight,
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17.4px",
                    textAlign: "center",
                    color: "rgba(51, 51, 51, 1)",
                  }}
                >
                  {row.basePremium}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: row.borderRight,
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17.4px",
                    textAlign: "center",
                    color: "rgba(51, 51, 51, 1)",
                  }}
                >
                  {row.emergencyServiceLevy}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: row.borderRight,
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17.4px",
                    textAlign: "center",
                    color: "rgba(51, 51, 51, 1)",
                  }}
                >
                  {row.gst}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: row.borderRight,
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17.4px",
                    textAlign: "center",
                    color: "rgba(51, 51, 51, 1)",
                  }}
                >
                  {row.stampDuty}
                </TableCell>
                  <TableCell
                      sx={{
                          fontFamily: "Arboria-Medium",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "17.4px",
                          textAlign: "center",
                          color: "rgba(51, 51, 51, 1)",
                      }}
                  >
                      {row.agentAndGst}
                  </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Arboria-Medium",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "17.4px",
                    textAlign: "center",
                    color: "rgba(51, 51, 51, 1)",
                  }}
                >
                  {row.total}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ background: "rgba(245, 91, 29, 0.2)" }}>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(245, 91, 29, 1)", // Updated border color
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(245, 91, 29, 1)",
                }}
              >
                Subtotal
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(245, 91, 29, 1)",
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(245, 91, 29, 1)",
                }}
              >
                {total.basePremium}
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(245, 91, 29, 1)",
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(245, 91, 29, 1)",
                }}
              >
                {total.emergencyServiceLevy}
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(245, 91, 29, 1)",
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(245, 91, 29, 1)",
                }}
              >
                {total.gst}
              </TableCell>
              <TableCell
                sx={{
                  borderRight: "1px solid rgba(245, 91, 29, 1)",
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(245, 91, 29, 1)",
                }}
              >
                {total.stampDuty}
              </TableCell>
                <TableCell
                    sx={{
                        fontFamily: "Arboria-Medium",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "17.4px",
                        textAlign: "center",
                        color: "rgba(245, 91, 29, 1)",
                    }}
                >
                    {total.agentAndGst}
                </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Arboria-Medium",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17.4px",
                  textAlign: "center",
                  color: "rgba(245, 91, 29, 1)",
                }}
              >
                {total.total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box
        sx={{
          background: "rgba(69, 34, 98, 0.1)",
          borderRadius: "5px",
          padding: "10px",
          textAlign: "center",
        }}
        mt={2}
      >
        <Typography
          sx={{
            fontFamily: "Arboria-Medium",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "17.4px",
            textAlign: "center",
            color: "rgba(69, 34, 98, 1)",
          }}
        >
          ( Total Payable includes commission of{" "}
          <span
            style={{
              fontFamily: "Outfit",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "17.43px",
              color: "rgba(69, 34, 98, 1)",
            }}
          >
            $252.36
          </span>{" "}
          and GST on commission{" "}
          <span
            style={{
              fontFamily: "Outfit",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "17.43px",
              color: "rgba(69, 34, 98, 1)",
            }}
          >
            $25.23
          </span>{" "}
          )
        </Typography>
        
      </Box> */}
    </Box>
  );
};

export default TableSummary;
