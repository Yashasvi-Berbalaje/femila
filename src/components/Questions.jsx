import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Typography,
  Button,
} from "@mui/material";

// Sample list of questions with ids, answer codes, and descriptions

const styles = {
  questionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e0e0e0",
  },
  questionText: {
    fontFamily: "Outfit",
    fontSize: "16px",
    fontWeight: 500,
    color: "#000",
    textAlign: "left",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
  },
};



const QuestionsComponent = ({Data,setData,questionsData}) => {


  const [errors, setErrors] = useState({});
  
  const updateAnswerCode = (questionId, newAnswerCode) => {
    console.log("came to updateAnswerCode")
    const updatedQuestions = Data.PolicyLobList[0].PolicyRiskList[0].PolicyEntityList.map((question) => {
        console.log("question",question)
        if (question?.QuestionId == questionId) {
            console.log("question",question)
            return { ...question, AnswerCode: newAnswerCode };
        }
        return question;
    });

    const updatedData = {
        ...Data,
        PolicyLobList: [
            {
                ...Data.PolicyLobList[0],
                PolicyRiskList: [
                    {
                        ...Data.PolicyLobList[0].PolicyRiskList[0],
                        PolicyEntityList: updatedQuestions,
                    },
                ],
            },
        ],
    };

    setData(updatedData); // Update the state with the modified data
  };

  // Function to get the AnswerCode of a specific QuestionId
const getAnswerCodeByQuestionId = (questionId) => {
    const foundQuestion = Data.PolicyLobList[0].PolicyRiskList[0].PolicyEntityList.find(
        (question) => question.QuestionId == questionId
    );

    return foundQuestion ? foundQuestion.AnswerCode : null;
};

  // Function to handle the radio button change
  const handleAnswerChange = (questionId, newAnswerCode) => {
    updateAnswerCode(questionId, newAnswerCode);
  };

  // Validate that all questions have an answer selected
  const validateAnswers = () => {
    const newErrors = {};
    questions.forEach((question) => {
      if (question.AnswerCode === "") {
        newErrors[question.QuestionId] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateAnswers()) {
      // All questions have an answer, proceed with submission logic
      console.log("Form submitted successfully", questions);
    } else {
      console.log("Validation failed, form has errors.");
    }
  };

  return (
    <Box  backgroundColor={"#FFF"} borderRadius={"12px"}>
      {questionsData.map((question) => (
        <Box key={question.QuestionId} sx={styles.questionContainer}>
          {/* Left side: Question description */}
          <Typography sx={styles.questionText}>
            {question.Description}
          </Typography>

          {/* Right side: Radio buttons */}
          <FormControl
            component="fieldset"
            error={!!errors[question.ID]} // Highlight as error if there's an error
          >
            <RadioGroup
              row
              aria-label={`question-${question.ID}`}
              value={getAnswerCodeByQuestionId(question.ID) || ""}
              onChange={(e) =>
                handleAnswerChange(question.ID, e.target.value)
              }
              sx={styles.radioGroup}
            >
              <FormControlLabel
                value="Y"
                control={<Radio sx={{ color: '#F55B1D', '&.Mui-checked': { color: '#F55B1D' } }} />}
                label="Yes"
                sx={{ marginRight: "16px" }}
              />
              <FormControlLabel value="N" control={<Radio  sx={{ color: '#F55B1D', '&.Mui-checked': { color: '#F55B1D' } }}/>} label="No" />
            </RadioGroup>

            {errors[question.QuestionId] && (
              <FormHelperText>{errors[question.QuestionId]}</FormHelperText>
            )}
          </FormControl>
        </Box>
      ))}

      {/* Submit button */}
      {/* <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box> */}
    </Box>
  );
};

export default QuestionsComponent;