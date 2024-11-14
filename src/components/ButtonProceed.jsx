import { Button } from "@mui/material";
import React from "react";
import buttonBack from "../../public/assets/img/buttonBack.svg";

const ButtonProceed = ({ handleSubmit, handleNext }) => {
  return (
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
  );
};

export default ButtonProceed;
