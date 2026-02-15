import { useCallback, useState } from "react";
import {
  Autocomplete,
  TextField,
  IconButton,
  ListItemText,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCategorias } from "../hooks/useCategorias";
import type { CardTaskProps } from "../data/DataTask";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1e88e5",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "#bbb",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1e88e5",
  },
});

type CategoryAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  tasks?: CardTaskProps[];
};

const STORAGE_KEY = "todolist_categorias";

export default function CategoryAutocomplete({
  value,
  onChange,
  label = "Categoria",
  placeholder = "Ex: Trabalho, Pessoal...",
  tasks = [],
}: CategoryAutocompleteProps) {
  const { categorias, adicionarCategoria, categoriasPadrao } = useCategorias();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Usar categorias do localStorage ou padrão
  const options = categorias.length > 0 ? categorias : categoriasPadrao;

  // Verificar se categoria é padrão
  const isPadrao = (categoria: string): boolean => {
    return categoriasPadrao.includes(categoria);
  };

  // Verificar quantas tarefas usam esta categoria
  const getTaskCount = (categoria: string): number => {
    return tasks.filter((t) => t.categoria === categoria).length;
  };

  // Excluir categoria
  const handleDelete = (categoria: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const taskCount = getTaskCount(categoria);

    if (taskCount > 0) {
      setSnackbarMessage(
        `Não é possível excluir "${categoria}" porque ${taskCount} tarefa(s) estão vinculadas.`,
      );
      setSnackbarOpen(true);
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const filtered = parsed.filter((c: string) => c !== categoria);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        // Atualizar estado local
        onChange("");
        setSnackbarMessage(`Categoria "${categoria}" excluída!`);
        setSnackbarOpen(true);
        // Disparar evento para atualizar outros componentes
        window.dispatchEvent(new Event("categoriasAtualizadas"));
      } catch (e) {
        console.error("Erro ao excluir categoria:", e);
      }
    }
  };

  const handleSelect = useCallback(
    (newValue: string | null) => {
      if (newValue && typeof newValue === "string") {
        const trimmed = newValue.trim();
        if (trimmed.length >= 2) {
          adicionarCategoria(trimmed);
          onChange(trimmed);
        } else {
          onChange("");
        }
      } else {
        onChange("");
      }
    },
    [adicionarCategoria, onChange],
  );

  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        value={value || null}
        onChange={(_, newValue) => handleSelect(newValue)}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const inputValue = (e.target as HTMLInputElement).value;
                if (inputValue && inputValue.trim().length >= 2) {
                  adicionarCategoria(inputValue.trim());
                }
              }
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          const defaultCategory = isPadrao(option);
          const taskCount = getTaskCount(option);
          const canDelete = !defaultCategory && taskCount === 0;

          return (
            <MenuItem
              key={key}
              {...optionProps}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pr: 1,
                color: "#bbb",
                "&:hover": {
                  backgroundColor: "#1e88e5",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemText
                primary={option}
                primaryTypographyProps={{
                  sx: { color: "inherit" },
                }}
              />
              {canDelete && (
                <IconButton
                  edge="end"
                  onClick={(e) => handleDelete(option, e)}
                  sx={{
                    color: "inherit",
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </MenuItem>
          );
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        sx={{
          "& .MuiAutocomplete-popupIndicator": {
            color: "#bbb",
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "#bbb",
          },
          "& .MuiPaper-root": {
            bgcolor: "#1e1e1e",
          },
        }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        ContentProps={{
          sx: {
            bgcolor: "#1e88e5",
            color: "white",
          },
        }}
      />
    </>
  );
}
