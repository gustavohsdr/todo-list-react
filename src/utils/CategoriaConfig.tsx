export type Categoria = string;

// Cores predefinidas com texto claro (nunca preto)
const CATEGORIA_COLORS = [
  { bg: "#1e88e5", text: "#ffffff" }, // Azul
  { bg: "#43a047", text: "#ffffff" }, // Verde
  { bg: "#e53935", text: "#ffffff" }, // Vermelho
  { bg: "#fb8c00", text: "#ffffff" }, // Laranja
  { bg: "#8e24aa", text: "#ffffff" }, // Roxo
  { bg: "#00acc1", text: "#ffffff" }, // Ciano
  { bg: "#3949ab", text: "#ffffff" }, // Indigo
  { bg: "#d81b60", text: "#ffffff" }, // Rosa
  { bg: "#546e7a", text: "#ffffff" }, // Cinza azulado
  { bg: "#6d4c41", text: "#ffffff" }, // Marrom
];

// Gerar cor baseada no nome da categoria
const getCategoriaColor = (categoria: string): { bg: string; text: string } => {
  // Se categoria conhecida, retorna cor predefinida
  if (CategoriaConfig[categoria]) {
    return CategoriaConfig[categoria];
  }

  // Para categorias desconhecidas, gerar cor baseada no hash do nome
  let hash = 0;
  for (let i = 0; i < categoria.length; i++) {
    hash = categoria.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CATEGORIA_COLORS.length;
  return CATEGORIA_COLORS[index];
};

// Configuração de categorias predefinidas com cores claras
export const CategoriaConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  Geral: {
    label: "Geral",
    bg: "#1e88e5",
    text: "#ffffff",
  },
  Pessoal: {
    label: "Pessoal",
    bg: "#43a047",
    text: "#ffffff",
  },
  Casa: {
    label: "Casa",
    bg: "#fb8c00",
    text: "#ffffff",
  },
  Trabalho: {
    label: "Trabalho",
    bg: "#3949ab",
    text: "#ffffff",
  },
  Estudo: {
    label: "Estudo",
    bg: "#8e24aa",
    text: "#ffffff",
  },
  Saúde: {
    label: "Saúde",
    bg: "#00acc1",
    text: "#ffffff",
  },
  Financeiro: {
    label: "Financeiro",
    bg: "#d81b60",
    text: "#ffffff",
  },
};

// Função helper para obter cor da categoria (com fallback para cores dinâmicas)
export const getCategoriaStyles = (
  categoria: string,
): { bg: string; text: string } => {
  return CategoriaConfig[categoria] || getCategoriaColor(categoria);
};
