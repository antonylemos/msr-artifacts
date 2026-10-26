import { Tabs as MuiTabs, Tab, Box, IconButton } from "@mui/material";
import filterIcon from "../../../assets/filterIcon.svg";

interface CustomTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  onFilterClick: () => void;
}

export const CustomTabs = ({ value, onChange, onFilterClick }: CustomTabsProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1040,
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <MuiTabs
        value={value}
        onChange={onChange}
        slotProps={{ indicator: { style: { display: "none" } } }}
        sx={{
          backgroundColor: "#FAFAFA",
          borderRadius: "32px",
          maxWidth: "189px",
          padding: "4px",
          "&.MuiTabs-root": {
            minHeight: "44px",
          },
        }}
      >
        <Tab
          label="Todos"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            maxWidth: "72px",
            borderRadius: "32px",
            backgroundColor: value === 0 ? "#B6DA8B" : "transparent",
            color: "#354E18",
            marginRight: "4px",
            "&.Mui-selected": {
              backgroundColor: "#B6DA8B",
              color: "#354E18",
            },
            "&.MuiTab-root": {
              minHeight: "36px",
            },
            "&:hover, &:focus, &:active": {
              backgroundColor: value === 0 ? "#B6DA8B" : "transparent",
            },
          }}
        />
        <Tab
          label="Favoritos"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            maxWidth: "72px",
            borderRadius: "32px",
            backgroundColor: value === 1 ? "#B6DA8B" : "transparent",
            color: "#354E18",
            "&.Mui-selected": {
              backgroundColor: "#B6DA8B",
              color: "#354E18",
            },
            "&.MuiTab-root": {
              minHeight: "36px",
            },
            "&:hover, &:focus, &:active": {
              backgroundColor: value === 1 ? "#B6DA8B" : "transparent",
            },
          }}
        />
      </MuiTabs>
      <IconButton 
        onClick={onFilterClick}
        sx={{
          width: "44px",
          height: "44px",
          backgroundColor: "#FAFAFA",
          borderRadius: "32px",
          "&:hover": {
            backgroundColor: "#e8e9ea",
          },
        }}
      >
        <img src={filterIcon} alt="Filtros" />
      </IconButton>
    </Box>
  );
};