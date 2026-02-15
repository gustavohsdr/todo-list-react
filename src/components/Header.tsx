import { type ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  titulo: string;
  subtitulo?: ReactNode;
};

const Header = ({ titulo, subtitulo }: HeaderProps) => {
  return (
    <Box sx={{ pb: 4, pt: 4, color: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        {titulo}
      </Typography>
      {subtitulo && (
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#bbb" }}>
          {subtitulo}
        </Typography>
      )}
    </Box>
  );
};

export default Header;
