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
        gap: 1.5,
        backgroundColor: "#121212",
        padding: 1.5,
        borderRadius: 2,
        minHeight: 70,
        flexDirection: { xs: "column", sm: "row" },
        textAlign: { xs: "center", sm: "left" },
        justifyContent: { xs: "center", sm: "flex-start" },
      }}
    >
      {icone && icone}

      <Box>
        <Typography
          variant="body2"
          color="#bbb"
          sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
        >
          {titulo}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="#FFFF"
          sx={{
            fontSize: {
              xs: "1.25rem",
              sm: "1.5rem",
              md: "1.75rem",
              lg: "2rem",
            },
          }}
        >
          {contador}
        </Typography>
      </Box>
    </Box>
  );
};

export default Indicador;
