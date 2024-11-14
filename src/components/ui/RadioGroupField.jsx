import {
  Box,
  FormControl,
  FormLabel,
  Grid2,
  Radio,
  Typography,
} from "@mui/material";

export const RadioGroupField = ({
  question,
  field,
  formState,
  handleChange,
  error,
}) => (
  <Grid2 size={{ xs: 12, lg: 8 }}>
    <Box sx={styles.labelBox}>
      <Typography sx={styles.itemLabel}>{question}</Typography>
    </Box>
    <Box sx={styles.furtherQBox}>
      <FormLabel sx={{ ...styles.formLabel, marginRight: "1rem" }}>
        {question}
      </FormLabel>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              checked={formState[field] === option}
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
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
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
};
