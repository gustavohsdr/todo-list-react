import React from "react";
import { Stack, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

type CreatedAtProps = {
  date: Date | string;
};

const formatDate = (date: Date) =>
  `Criada em ${date.toLocaleDateString("pt-BR")}, ${date.toLocaleTimeString(
    "pt-BR",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  )}`;

const CreatedAt: React.FC<CreatedAtProps> = ({ date }) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <CalendarTodayIcon sx={{ fontSize: 14, color: "#bbb" }} />
      <Typography variant="caption" color="#bbb">
        {formatDate(dateObj)}
      </Typography>
    </Stack>
  );
};

export default CreatedAt;
