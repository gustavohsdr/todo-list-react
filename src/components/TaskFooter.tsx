import React from "react";
import { Stack, Chip } from "@mui/material";

import { type Prioridade, PrioridadeConfig } from "../utils/PrioridadeConfig";
import { type Categoria, getCategoriaStyles } from "../utils/CategoriaConfig";
import CreatedAt from "./CreatedAt";

type TaskFooterProps = {
  prioridade: Prioridade;
  categoria: Categoria;
  data: Date | string;
};

const TaskFooter: React.FC<TaskFooterProps> = ({
  prioridade,
  categoria,
  data,
}) => {
  const prioridadeData = PrioridadeConfig[prioridade] ?? {
    label: prioridade,
    color: "default" as const,
  };

  // Obter estilos de cor para a categoria (com cores dinâmicas)
  const categoriaStyles = getCategoriaStyles(categoria);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip
        label={prioridadeData.label}
        color={prioridadeData.color}
        size="small"
      />
      <Chip
        label={categoria}
        size="small"
        variant="outlined"
        sx={{
          borderColor: categoriaStyles.bg,
          color: categoriaStyles.text,
          backgroundColor: `${categoriaStyles.bg}20`, // 20 = ~12% opacity
          "&:hover": {
            backgroundColor: `${categoriaStyles.bg}40`,
          },
        }}
      />
      <CreatedAt date={data} />
    </Stack>
  );
};

export default TaskFooter;
