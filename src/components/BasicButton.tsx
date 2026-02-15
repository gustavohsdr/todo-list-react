import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type BasicButtonsProps = {
  texto: string;
  active?: boolean;
  onClick?: () => void;
};

export default function BasicButton({
  texto,
  active,
  onClick,
}: BasicButtonsProps) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        size="small"
        variant={active ? "contained" : "outlined"}
        onClick={onClick}
        sx={{
          background: active ? "#1976d2" : "#f5f5f5",
          color: active ? "#fff" : "#000",
          textTransform: "none",
          "&:hover": {
            background: active ? "#1565c0" : "#DCDCDC",
          },
        }}
      >
        {texto}
      </Button>
    </Stack>
  );
}
