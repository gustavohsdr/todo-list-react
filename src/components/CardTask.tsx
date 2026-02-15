import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import type { CardTaskProps } from "../data/DataTask";
import TaskFooter from "./TaskFooter"; // ← Importar o TaskFooter

type Props = {
  tasks: CardTaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<CardTaskProps[]>>;
  onEditTask: (task: CardTaskProps) => void;
};

export default function CardTask({ tasks, setTasks, onEditTask }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, concluida: !task.concluida } : task,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    handleCloseMenu();
  };

  const handleEdit = (task: CardTaskProps) => {
    onEditTask(task);
    handleCloseMenu();
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    taskId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {tasks.map((task) => (
          <Grid size={{ xs: 12 }} key={task.id}>
            <Card
              sx={{
                bgcolor: "#121212",
                border: "1px solid rgba(255,255,255,0.08)",
                opacity: task.concluida ? 0.6 : 1,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  {/* Checkbox à esquerda */}
                  <IconButton
                    onClick={() => handleToggle(task.id)}
                    sx={{
                      color: "#80DE95",
                      mt: -0.5,
                    }}
                  >
                    {task.concluida ? (
                      <CheckCircleIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>

                  {/* Conteúdo central */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fff",
                        textDecoration: task.concluida
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        mt: 1,
                      }}
                    >
                      {task.descricao}
                    </Typography>

                    {/* TaskFooter com prioridade, categoria e data */}
                    <Box sx={{ mt: 2 }}>
                      <TaskFooter
                        prioridade={task.prioridade}
                        categoria={task.categoria}
                        data={task.data}
                      />
                    </Box>
                  </Box>

                  {/* Menu de 3 pontos à direita */}
                  <IconButton
                    onClick={(e) => handleOpenMenu(e, task.id)}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      mt: -0.5,
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Menu dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            const task = tasks.find((t) => t.id === selectedTaskId);
            if (task) handleEdit(task);
          }}
          sx={{ color: "#fff" }}
        >
          <ListItemIcon>
            <EditIcon sx={{ color: "#1e88e5" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => selectedTaskId && handleDelete(selectedTaskId)}
          sx={{ color: "#fff" }}
        >
          <ListItemIcon>
            <DeleteIcon sx={{ color: "#FF6F61" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
