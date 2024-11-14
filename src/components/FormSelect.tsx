import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FormControlSelect = ({ options, label, ...rest }: any) => {
    return (
        <FormControl fullWidth>
            <InputLabel sx={{ fontSize: 16, color: '#8A8A8A' }}>{label}</InputLabel>
            <Select {...rest} label={label}>
                {options.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FormControlSelect;
