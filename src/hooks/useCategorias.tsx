import { useState, useEffect, useCallback } from "react";

// Categorias predefinidas
const CATEGORIAS_PADRAO = [
  "Geral",
  "Pessoal",
  "Casa",
  "Trabalho",
  "Estudo",
  "Saúde",
  "Financeiro",
];

const STORAGE_KEY = "todolist_categorias";

// Função para limpar e resetar categorias (chamar no console: clearCategoriasStorage())
export const clearCategoriasStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(CATEGORIAS_PADRAO));
  console.log("Categorias resetadas para o padrão!");
};

// Função para obter categorias do localStorage
const getCategoriasFromStorage = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Filtrar apenas categorias válidas (não vazias, não muito curtas)
      return parsed.filter((c: string) => c && c.trim().length >= 2);
    } catch {
      return CATEGORIAS_PADRAO;
    }
  }
  return CATEGORIAS_PADRAO;
};

export function useCategorias() {
  const [categorias, setCategorias] = useState<string[]>(() => {
    return getCategoriasFromStorage();
  });

  // Salvar no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categorias));
  }, [categorias]);

  // Adicionar nova categoria (se for válida e não existir)
  const adicionarCategoria = useCallback(
    (categoria: string) => {
      const trimmed = categoria.trim();
      // Validar: mínimo 2 caracteres
      if (trimmed.length < 2) {
        return false;
      }
      if (!categorias.includes(trimmed)) {
        setCategorias((prev) => [...prev, trimmed]);
        return true;
      }
      return false;
    },
    [categorias],
  );

  // Verificar se categoria existe
  const hasCategoria = useCallback(
    (categoria: string) => {
      return categorias.includes(categoria.trim());
    },
    [categorias],
  );

  return {
    categorias,
    adicionarCategoria,
    hasCategoria,
    categoriasPadrao: CATEGORIAS_PADRAO,
  };
}
