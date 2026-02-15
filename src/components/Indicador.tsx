import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type IndicadorProps = {
  icone?: ReactNode;
  titulo: string;
  contador: string | number;
};

const Indicador = ({ icone, titulo, contador }: IndicadorProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#121212",
        padding: 2,
        borderRadius: 2,
      }}
    >
      {icone && icone}

      <Box>
        <Typography variant="body2" color="#bbb">
          {titulo}
        </Typography>

        <Typography variant="h4" fontWeight="bold" color="#FFFF">
          {contador}
        </Typography>
      </Box>
    </Box>
  );
};

export default Indicador;
