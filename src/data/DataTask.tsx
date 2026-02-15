import type { Prioridade } from "../utils/PrioridadeConfig";
import type { Categoria } from "../utils/CategoriaConfig";

export type CardTaskProps = {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  categoria: Categoria;
  data: string;
  concluida: boolean;
};

export const DataTask: CardTaskProps[] = [];
