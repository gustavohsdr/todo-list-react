import { Box, Typography } from "@mui/material";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BasicButton from "../components/BasicButton";

type Filtro = "Todas" | "Ativas" | "Concluídas";

type EmptyTasksByFilterProps = {
  filtro: Filtro;
  temTarefasNoSistema: boolean;
  onCreateClick: () => void;
  onShowAtivas: () => void;
};

export default function EmptyTasksByFilter({
  filtro,
  temTarefasNoSistema,
  onCreateClick,
}: EmptyTasksByFilterProps) {
  // Estado 1: Nenhuma tarefa no sistema (qualquer filtro)
  if (!temTarefasNoSistema) {
    return (
      <Box
        sx={{
          bgcolor: "#121212",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <PlaylistAddOutlinedIcon sx={{ fontSize: 64, opacity: 0.9 }} />

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
          Nenhuma tarefa ainda
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "rgba(255,255,255,0.7)" }}
        >
          Comece criando sua primeira tarefa!
        </Typography>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <BasicButton
            texto="+ Criar primeira tarefa"
            onClick={onCreateClick}
          />
        </Box>
      </Box>
    );
  }

  // Estado 2: Filtro "Ativas" mas todas estão concluídas
  if (filtro === "Ativas") {
    return (
      <Box
        sx={{
          bgcolor: "#121212",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <CheckCircleOutlineOutlinedIcon
          sx={{ fontSize: 64, opacity: 0.9, color: "#80DE95" }}
        />

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
          Nenhuma tarefa ativa
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "rgba(255,255,255,0.7)" }}
        >
          Todas as suas tarefas estão concluídas!
        </Typography>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <BasicButton texto="+ Criar nova tarefa" onClick={onCreateClick} />
        </Box>
      </Box>
    );
  }

  // Estado 3: Filtro "Concluídas" mas nenhuma está concluída
  if (filtro === "Concluídas") {
    return (
      <Box
        sx={{
          bgcolor: "#121212",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <AssignmentOutlinedIcon
          sx={{ fontSize: 64, opacity: 0.9, color: "#FF6F61" }}
        />

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
          Nenhuma tarefa encontrada
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "rgba(255,255,255,0.7)" }}
        >
          Tente ajustar os filtros ou criar uma nova tarefa.
        </Typography>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <BasicButton texto="+ Criar nova tarefa" onClick={onCreateClick} />
        </Box>
      </Box>
    );
  }

  // Filtro "Todas" - nunca chega aqui se tem tarefas
  return null;
}
