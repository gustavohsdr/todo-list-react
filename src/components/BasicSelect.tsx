import { Select, MenuItem, type SelectProps } from "@mui/material";

type Option<Value = string> = {
  value: Value;
  label: string;
};

type BaseSelectProps<Value = unknown> = SelectProps<Value> & {
  options?: Option<Value>[];
  fullWidth?: boolean;
  height?: number | string;
};

function BaseSelect<Value = unknown>({
  options,
  children,
  fullWidth,
  height,
  ...props
}: BaseSelectProps<Value>) {
  return (
    <Select<Value>
      {...props}
      size="small"
      sx={{
        width: fullWidth ? "100%" : 200,
        backgroundColor: "#121212",
        borderRadius: 1,

        "& .MuiOutlinedInput-root": {
          height: height ?? 40,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#bbb",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#2196f3",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#2196f3",
        },

        "& .MuiSelect-select": {
          color: "#bbb",
          height: height ?? 40,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
        },

        "& .MuiSvgIcon-root": {
          color: "#bbb",
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "#121212",

            "& .MuiMenuItem-root": {
              color: "#bbb",
            },

            "& .MuiMenuItem-root:hover": {
              backgroundColor: "#2196f3",
            },

            "& .MuiMenuItem-root.Mui-selected": {
              backgroundColor: "#121212",
            },

            "& .MuiMenuItem-root.Mui-selected:hover": {
              backgroundColor: "#2196f3",
            },
          },
        },
      }}
    >
      {options
        ? options.map((item) => (
            <MenuItem key={String(item.value)} value={item.value as any}>
              {item.label}
            </MenuItem>
          ))
        : children}
    </Select>
  );
}

export default BaseSelect;
