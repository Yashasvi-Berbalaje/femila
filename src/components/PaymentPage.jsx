"use client";
import { Box, Button, Grid2, Paper, Typography ,Backdrop,CircularProgress} from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import { useRouter } from "next/navigation";
import buttonBack from "../../public/assets/img/buttonBack.svg";

const PaymentPage = ({amount,ProposalNo}) => {

  const [loader,setLoader]=useState({
    loader:false,
    msg:''
  })

  const handelSubmit = async (e) => {
      try {
          setLoader({
              loader:true,
              msg:"Processing Payment..."
          })
          const response = await axiosInstance.post('/makePayment', {
              amount: Math.round(amount),
              proposal:ProposalNo
          });

          const data = response.data;
          if (data.url) {
              window.location.href = data.url;
          } else {
              setLoader({
                  loader:false,
                  msg:""
              })
          }
      } catch (error) {
          setLoader({
              loader:false,
              msg:""
          })
      }
  };
  return (
    <Box>
        <Button
          className="button"
          onClick={handelSubmit}
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
          Pay 
        </Button>
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

export default PaymentPage;
