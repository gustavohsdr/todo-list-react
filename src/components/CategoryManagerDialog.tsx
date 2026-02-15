import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Chip,
  Box,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useCategorias } from "../hooks/useCategorias";
import type { CardTaskProps } from "../data/DataTask";

const STORAGE_KEY = "todolist_categorias";

type CategoryManagerDialogProps = {
  open: boolean;
  onClose: () => void;
  tasks: CardTaskProps[];
};

export default function CategoryManagerDialog({
  open,
  onClose,
  tasks,
}: CategoryManagerDialogProps) {
  const { categorias, categoriasPadrao } = useCategorias();
  const [categoriaToDelete, setCategoriaToDelete] = useState<string | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Obter contagem de tarefas por categoria
  const getTaskCount = (categoria: string): number => {
    return tasks.filter((t) => t.categoria === categoria).length;
  };

  // Verificar se categoria é padrão
  const isPadrao = (categoria: string): boolean => {
    return categoriasPadrao.includes(categoria);
  };

  // Obter cor da categoria
  const getCategoriaColor = (categoria: string): string => {
    // Cores para categorias padrão
    const colors: Record<string, string> = {
      Geral: "#1e88e5",
      Pessoal: "#43a047",
      Casa: "#fb8c00",
      Trabalho: "#3949ab",
      Estudo: "#8e24aa",
      Saúde: "#00acc1",
      Financeiro: "#d81b60",
    };
    return colors[categoria] || "#546e7a";
  };

  // Confirmar exclusão
  const handleConfirmDelete = (categoria: string) => {
    const taskCount = getTaskCount(categoria);

    if (taskCount > 0) {
      setErrorMessage(
        `Não é possível excluir "${categoria}" porque ${taskCount} tarefa(s) estão vinculadas a ela.`,
      );
      setCategoriaToDelete(null);
      return;
    }

    setCategoriaToDelete(categoria);
    setErrorMessage(null);
  };

  // Executar exclusão
  const handleDelete = () => {
    if (categoriaToDelete) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const filtered = parsed.filter(
            (c: string) => c !== categoriaToDelete,
          );
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          // Recarregar página para atualizar
          window.location.reload();
        } catch (e) {
          console.error("Erro ao excluir categoria:", e);
        }
      }
    }
    setCategoriaToDelete(null);
  };

  // Cancelar exclusão
  const handleCancelDelete = () => {
    setCategoriaToDelete(null);
    setErrorMessage(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Gerenciar Categorias
        <IconButton onClick={onClose} sx={{ color: "#bbb" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="#bbb" mb={2}>
          Exclua categorias que não estão sendo usadas. Categorias padrão não
          podem ser excluídas.
        </Typography>

        {errorMessage && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <List>
          {categorias.map((categoria) => {
            const taskCount = getTaskCount(categoria);
            const isDefault = isPadrao(categoria);
            const color = getCategoriaColor(categoria);

            return (
              <ListItem
                key={categoria}
                sx={{
                  bgcolor: "#1e1e1e",
                  borderRadius: 1,
                  mb: 1,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip
                        label={categoria}
                        size="small"
                        sx={{
                          bgcolor: color,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                      {isDefault && (
                        <Typography variant="caption" sx={{ color: "#888" }}>
                          (Padrão)
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={`${taskCount} tarefa(s) vinculada(s)`}
                />
                <ListItemSecondaryAction>
                  {isDefault ? (
                    <Typography variant="caption" sx={{ color: "#555" }}>
                      Não excluível
                    </Typography>
                  ) : (
                    <IconButton
                      edge="end"
                      onClick={() => handleConfirmDelete(categoria)}
                      sx={{ color: "#FF6F61" }}
                      disabled={taskCount > 0}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>

      {/* Dialog de confirmação */}
      <Dialog open={!!categoriaToDelete} onClose={handleCancelDelete}>
        <DialogTitle sx={{ color: "white" }}>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a categoria "{categoriaToDelete}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
