import { Box, Typography } from "@mui/material";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import BasicButton from "../components/BasicButton";

type EmptyTasksProps = {
  onCreateClick: () => void;
};

export default function EmptyTasks({ onCreateClick }: EmptyTasksProps) {
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
        <BasicButton texto="+ Criar primeira tarefa" onClick={onCreateClick} />
      </Box>
    </Box>
  );
}
