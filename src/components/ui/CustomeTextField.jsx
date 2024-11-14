import { TextField } from "@mui/material";

export const renderTextField = (
  id,
  label,
  value,
  handleChangeField,
  errorKey,
  placeholder
) => (
  <TextField
    required
    id={id}
    name={id}
    label={label}
    fullWidth
    value={value}
    onChange={(e) => handleChangeField(id, e.target.value)}
    error={Boolean(errors[errorKey])}
    helperText={errors[errorKey]}
    placeholder={placeholder}
    sx={styles.textField(Boolean(errors[errorKey]))}
  />
);

const styles = {
  textField: (errorField) => ({
    "& .MuiInputBase-root": {
      borderRadius: "10px",
      backgroundColor: errorField ? "rgb(255, 242, 241)" : undefined,
    },
    "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(245, 91, 29, 1)",
      borderRadius: "10px",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.6)",
    },
    ".MuiFormLabel-root": {
      fontFamily: "Arboria-Book",
      fontSize: "16px",
      letterSpacing: "0.00938em",
      fontWeight: 400,
      lineHeight: "1.375em",
      color: "#8a8a8a",
    },
    "& .MuiFormLabel-root": {
      color: errorField ? "rgb(255, 65, 54)" : undefined,
    },
    "& .MuiOutlinedInput-input": {
      padding: "13px 16px",
    },
  }),
};
