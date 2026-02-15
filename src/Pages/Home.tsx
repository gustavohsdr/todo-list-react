import { Box, Container, Grid } from "@mui/material";
import { useMemo, useState } from "react";

import Header from "../components/Header";
import BasicButton from "../components/BasicButton";
import Indicador from "../components/Indicador";
import InputFilter from "../components/InputFilter";
import OrderFilter, { type OrderOption } from "../components/OrderFilter";
import CardTask from "../components/CardTask";
import EmptyTasksByFilter from "../components/EmptyTasksByFilter";
import { NewTaskDialog } from "../components/NewTaskDialog";

import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ScheduleIcon from "@mui/icons-material/Schedule";

import type { CardTaskProps } from "../data/DataTask";
import type { NewTaskDialogData } from "../components/NewTaskDialog";

// Tipo para tarefa sendo editada (formato compatível com NewTaskDialog)
type TaskToEdit = NewTaskDialogData & { id: number };

const Home = () => {
  type Filtro = "Todas" | "Ativas" | "Concluídas";

  const [tasks, setTasks] = useState<CardTaskProps[]>([]);
  const [filterActive, setFilterActive] = useState<Filtro>("Todas");
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskToEdit | null>(null);
  const [order, setOrder] = useState<OrderOption>("recent");

  // Criar nova task
  const handleCreateTask = (data: NewTaskDialogData) => {
    const newTask: CardTaskProps = {
      id: Date.now(),
      titulo: data.titulo,
      descricao: data.detalhes,
      prioridade: data.prioridade,
      categoria: data.categoria,
      data: new Date().toISOString(),
      concluida: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Função para iniciar edição de uma tarefa
  const handleStartEdit = (task: CardTaskProps) => {
    setTaskToEdit({
      id: task.id,
      titulo: task.titulo,
      detalhes: task.descricao,
      prioridade: task.prioridade,
      categoria: task.categoria,
    });
    setOpen(true);
  };

  // Filtro e ordenação
  const filteredTasks = useMemo(() => {
    let result = tasks
      .filter((task) => {
        if (filterActive === "Ativas") return !task.concluida;
        if (filterActive === "Concluídas") return task.concluida;
        return true;
      })
      .filter((task) =>
        task.titulo.toLowerCase().includes(searchText.toLowerCase()),
      );

    // Ordenação
    result.sort((a, b) => {
      switch (order) {
        case "recent":
          return new Date(b.data).getTime() - new Date(a.data).getTime();
        case "old":
          return new Date(a.data).getTime() - new Date(b.data).getTime();
        case "priority":
          // Alta > Média > Baixa
          const priorityOrder = { Alta: 3, Média: 2, Baixa: 1 };
          return priorityOrder[b.prioridade] - priorityOrder[a.prioridade];
        case "az":
          return a.titulo.localeCompare(b.titulo);
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, filterActive, searchText, order]);

  // Indicadores
  const total = tasks.length;
  const ativas = tasks.filter((t) => !t.concluida).length;
  const concluidas = tasks.filter((t) => t.concluida).length;
  const taxa = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <Header
            titulo="Lista de Tarefas"
            subtitulo="Organize suas tarefas e aumente sua produtividade"
          />
        </Grid>

        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <NewTaskDialog
            open={open}
            onClose={() => setOpen(false)}
            onCreate={handleCreateTask}
            taskToEdit={taskToEdit}
            onEdit={(data: NewTaskDialogData, id: number) => {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id
                    ? {
                        ...task,
                        titulo: data.titulo,
                        descricao: data.detalhes,
                        prioridade: data.prioridade,
                        categoria: data.categoria,
                      }
                    : task,
                ),
              );
              setTaskToEdit(null);
            }}
          />

          <BasicButton
            texto="+ Nova Tarefa"
            onClick={() => {
              setTaskToEdit(null);
              setOpen(true);
            }}
          />
        </Grid>
      </Grid>

      {/* Indicadores */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Indicador
            icone={
              <AssignmentSharpIcon sx={{ fontSize: 20, color: "#1e88e5" }} />
            }
            titulo="Total de Tarefas"
            contador={total}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Indicador
            icone={<ScheduleIcon sx={{ fontSize: 20, color: "#FF6F61" }} />}
            titulo="Ativas"
            contador={ativas}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Indicador
            icone={<TaskAltIcon sx={{ fontSize: 20, color: "#80DE95" }} />}
            titulo="Concluídas"
            contador={concluidas}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Indicador
            icone={<TrendingUpIcon sx={{ fontSize: 20, color: "#6a1b9a" }} />}
            titulo="Taxa de Conclusão"
            contador={`${taxa}%`}
          />
        </Grid>
      </Grid>

      {/* Filtros */}
      <Grid container sx={{ background: "#121212", mt: 3, borderRadius: 2 }}>
        <Grid size={{ xs: 12 }} sx={{ p: 2 }}>
          <InputFilter value={searchText} onChange={setSearchText} />

          <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
            <BasicButton
              texto="Todas"
              active={filterActive === "Todas"}
              onClick={() => setFilterActive("Todas")}
            />

            <BasicButton
              texto="Ativas"
              active={filterActive === "Ativas"}
              onClick={() => setFilterActive("Ativas")}
            />

            <BasicButton
              texto="Concluídas"
              active={filterActive === "Concluídas"}
              onClick={() => setFilterActive("Concluídas")}
            />

            <OrderFilter order={order} onOrderChange={setOrder} />
          </Box>
        </Grid>
      </Grid>

      {/* Lista */}
      <Box sx={{ mt: 3 }}>
        {filteredTasks.length === 0 ? (
          <EmptyTasksByFilter
            filtro={filterActive}
            temTarefasNoSistema={tasks.length > 0}
            onCreateClick={() => setOpen(true)}
            onShowAtivas={() => setFilterActive("Ativas")}
          />
        ) : (
          <CardTask
            tasks={filteredTasks}
            setTasks={setTasks}
            onEditTask={handleStartEdit}
          />
        )}
      </Box>
    </Container>
  );
};

export default Home;
