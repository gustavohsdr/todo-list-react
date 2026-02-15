import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import BasicInput from "./BasicInput";
import BasicTextarea from "./BasicTextarea";
import BaseSelect from "./BasicSelect";
import type { SelectChangeEvent } from "@mui/material/Select";

import type { Prioridade } from "../utils/PrioridadeConfig";

export type NewTaskDialogData = {
  titulo: string;
  detalhes: string;
  prioridade: Prioridade;
  categoria: string;
};

type NewTaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: NewTaskDialogData) => void;
  onEdit?: (data: NewTaskDialogData, id: number) => void;
  taskToEdit?: (NewTaskDialogData & { id: number }) | null;
};

export function NewTaskDialog({
  open,
  onClose,
  onCreate,
  onEdit,
  taskToEdit,
}: NewTaskDialogProps) {
  const isEditing = taskToEdit !== null && taskToEdit !== undefined;

  const [form, setForm] = useState<NewTaskDialogData>({
    titulo: "",
    detalhes: "",
    prioridade: "Média",
    categoria: "",
  });

  // Inicializar formulário com dados da tarefa quando em modo de edição
  useEffect(() => {
    if (taskToEdit) {
      setForm({
        titulo: taskToEdit.titulo,
        detalhes: taskToEdit.detalhes,
        prioridade: taskToEdit.prioridade,
        categoria: taskToEdit.categoria,
      });
    } else {
      // Resetar formulário quando não estiver editando
      setForm({
        titulo: "",
        detalhes: "",
        prioridade: "Média",
        categoria: "",
      });
    }
  }, [taskToEdit, open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name as keyof NewTaskDialogData]: value as Prioridade,
    }));
  };

  const handleSave = () => {
    if (isEditing && onEdit && taskToEdit) {
      onEdit(form, taskToEdit.id);
    } else {
      onCreate(form);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { background: "#121212" },
      }}
    >
      <DialogTitle sx={{ color: "white" }}>
        {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="#bbb" mb={2}>
          {isEditing
            ? "Edite os campos abaixo para atualizar a tarefa."
            : "Preencha os campos abaixo para criar uma nova tarefa."}
        </Typography>

        <Stack spacing={2}>
          <BasicInput
            label="Título"
            name="titulo"
            placeholder="Ex: Estudar React Hooks..."
            value={form.titulo}
            onChange={handleInputChange}
          />

          <BasicTextarea
            label="Detalhes"
            name="detalhes"
            placeholder="Adicione mais detalhes..."
            minRows={3}
            value={form.detalhes}
            onChange={handleInputChange}
          />

          <BaseSelect
            name="prioridade"
            value={form.prioridade}
            onChange={handleSelectChange}
            fullWidth
          >
            <MenuItem value="Baixa">Baixa</MenuItem>
            <MenuItem value="Média">Média</MenuItem>
            <MenuItem value="Alta">Alta</MenuItem>
          </BaseSelect>

          <BasicInput
            label="Categoria"
            name="categoria"
            placeholder="Ex: Trabalho, Pessoal..."
            value={form.categoria}
            onChange={handleInputChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          {isEditing ? "Salvar Alterações" : "Criar Tarefa"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default NewTaskDialog;
