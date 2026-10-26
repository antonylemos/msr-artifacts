import { Modal, Box, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export interface Filters {
  species: string[];
  gender: string[];
  status: string[];
}

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  initialFilters: Filters;
}

export const FilterModal = ({ open, onClose, onApply, initialFilters }: FilterModalProps) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const speciesOptions = ["Human", "Alien", "Humanoid", "unknown"];
  const genderOptions = ["Male", "Female", "Genderless", "unknown"];
  const statusOptions = ["Alive", "Dead", "unknown"];

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: "16px",
          p: 3,
          minWidth: 400,
          maxWidth: 500,
          outline: "none",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <span style={{ fontWeight: 700, fontSize: "18px" }}>Filtros avanzados</span>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Especie */}
        <Box sx={{ mb: 3 }}>
          <span style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px", display: "block" }}>
            Especie
          </span>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {speciesOptions.map((species) => (
              <Chip
                key={species}
                label={species}
                onClick={() => toggleFilter("species", species)}
                sx={{
                  backgroundColor: filters.species.includes(species) ? "#B6DA8B" : "#F3F4F6",
                  color: "#354E18",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: filters.species.includes(species) ? "#a5c97b" : "#e8e9ea",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Género */}
        <Box sx={{ mb: 3 }}>
          <span style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px", display: "block" }}>
            Género
          </span>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {genderOptions.map((gender) => (
              <Chip
                key={gender}
                label={gender}
                onClick={() => toggleFilter("gender", gender)}
                sx={{
                  backgroundColor: filters.gender.includes(gender) ? "#B6DA8B" : "#F3F4F6",
                  color: "#354E18",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: filters.gender.includes(gender) ? "#a5c97b" : "#e8e9ea",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Estado */}
        <Box sx={{ mb: 3 }}>
          <span style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px", display: "block" }}>
            Estado
          </span>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {statusOptions.map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => toggleFilter("status", status)}
                sx={{
                  backgroundColor: filters.status.includes(status) ? "#B6DA8B" : "#F3F4F6",
                  color: "#354E18",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: filters.status.includes(status) ? "#a5c97b" : "#e8e9ea",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <button
            onClick={handleApply}
            style={{
              backgroundColor: "#B6DA8B",
              color: "#354E18",
              fontWeight: 700,
              padding: "12px 22px",
              borderRadius: "40px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Aplicar filtros
          </button>
        </Box>
      </Box>
    </Modal>
  );
};