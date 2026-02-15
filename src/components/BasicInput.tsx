import { TextField, type TextFieldProps } from "@mui/material";

type BasicInputProps = TextFieldProps;

const BasicInput = (props: BasicInputProps) => {
  return (
    <TextField
      {...props}
      size="small"
      variant="outlined"
      fullWidth
      sx={{
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

        "& .MuiInputBase-input": {
          color: "#bbb",
        },

        "& .MuiInputLabel-root": {
          color: "#bbb",
        },

        "&:hover .MuiInputLabel-root": {
          color: "#2196f3",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "#2196f3",
        },
      }}
    />
  );
};

export default BasicInput;
