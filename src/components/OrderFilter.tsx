import CheckIcon from "@mui/icons-material/Check";
import { MenuItem } from "@mui/material";

import BaseSelect from "../components/BasicSelect";
import type { SelectChangeEvent } from "@mui/material";

export type OrderOption = "recent" | "old" | "priority" | "az";

const options: { value: OrderOption; label: string }[] = [
  { value: "recent", label: "Mais recente" },
  { value: "old", label: "Mais antigo" },
  { value: "priority", label: "Prioridade" },
  { value: "az", label: "Alfabética (A–Z)" },
];

type OrderFilterProps = {
  order: OrderOption;
  onOrderChange: (order: OrderOption) => void;
};

export default function OrderFilter({
  order,
  onOrderChange,
}: OrderFilterProps) {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onOrderChange(e.target.value as OrderOption);
  };

  return (
    <BaseSelect
      value={order}
      onChange={handleChange}
      height={31}
      renderValue={(selected) =>
        options.find((o) => o.value === selected)?.label ?? ""
      }
    >
      {options.map((item) => (
        <MenuItem
          key={item.value}
          value={item.value}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3,
            gap: 1.5,
          }}
        >
          {item.label}
          {order === item.value && (
            <CheckIcon fontSize="small" sx={{ color: "#bbb" }} />
          )}
        </MenuItem>
      ))}
    </BaseSelect>
  );
}
