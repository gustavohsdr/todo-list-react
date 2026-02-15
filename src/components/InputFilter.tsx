import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type InputFilterProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const InputFilter = ({ value, onChange }: InputFilterProps) => {
  return (
    <TextField
      id="outlined-basic"
      label="Buscar tarefa"
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#fff" }} />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width: "100%",
        backgroundColor: "#121212",
        borderRadius: 1,

        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#bbb",
          },
          "&:hover fieldset": {
            borderColor: "#2196f3",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#2196f3",
          },
        },

        "& .MuiInputAdornment-root svg": {
          color: "#bbb",
        },

        "& .MuiOutlinedInput-root:hover .MuiInputAdornment-root svg": {
          color: "#2196f3",
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root svg": {
          color: "#2196f3",
        },

        "& .MuiInputBase-input": {
          color: "#bbb",
        },

        /* label normal */
        "& .MuiInputLabel-root": {
          color: "#bbb",
        },

        /* label hover (CORRETO) */
        "&:hover .MuiInputLabel-root": {
          color: "#2196f3",
        },

        /* label focus */
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#2196f3",
        },

        input: { color: "#bbb" },
        label: { color: "#bbb" },
        borderColor: "#bbb",
      }}
    />
  );
};

export default InputFilter;
