import { Chip, Box } from "@mui/material";
import type { Filters } from "./FilterModal";

interface AppliedFiltersProps {
  filters: Filters;
  onRemoveFilter: (category: keyof Filters, value: string) => void;
}

export const AppliedFilters = ({
  filters,
  onRemoveFilter,
}: AppliedFiltersProps) => {
  const allFilters = [
    ...filters.species.map((value) => ({
      category: "species" as const,
      value,
      label: value,
    })),
    ...filters.gender.map((value) => ({
      category: "gender" as const,
      value,
      label: value,
    })),
    ...filters.status.map((value) => ({
      category: "status" as const,
      value,
      label: value,
    })),
  ];

  if (allFilters.length === 0) return null;

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <span className="text-h4 text-neutral-600 mb-3">Filtros aplicados</span>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: "3px" }}>
        {allFilters.map((filter, index) => (
          <Chip
            key={`${filter.category}-${filter.value}-${index}`}
            label={filter.label}
            onDelete={() => onRemoveFilter(filter.category, filter.value)}
            sx={{
              backgroundColor: "#C7CBC2",
              color: "#333630",
              fontWeight: 600,
              "& .MuiChip-deleteIcon": {
                color: "#333630",
                "&:hover": {
                  color: "#333630",
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
