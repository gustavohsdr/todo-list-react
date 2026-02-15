export type Prioridade = "Alta" | "Média" | "Baixa";

export const PrioridadeConfig: Record<
  Prioridade,
  { label: string; color: "error" | "warning" | "success" }
> = {
  Alta: {
    label: "Alta",
    color: "error",
  },
  Média: {
    label: "Média",
    color: "warning",
  },
  Baixa: {
    label: "Baixa",
    color: "success",
  },
};
