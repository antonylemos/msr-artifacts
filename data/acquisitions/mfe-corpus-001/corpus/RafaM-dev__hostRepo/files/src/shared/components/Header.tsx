import { TextField } from "@mui/material";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  return (
    <header className="relative flex flex-col items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/homeImage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 50%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <img
          src="/titleHome.png"
          alt="Rick and Morty"
          className="w-[500px] max-w-full mb-8"
        />
      </div>
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 py-16">
        <div className="w-full max-w-[1040px] max-h-14">
          <TextField
            fullWidth
            placeholder="Buscar personaje por nombre"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <img
                    src="/searchIcon.svg"
                    alt="Search"
                    className="m-2 w-5 h-5"
                  />
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                paddingLeft: "4px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: "8px",
                color: "white",
                "& fieldset": {
                  border: "1px solid #808c73",
                },
                "&:hover fieldset": {
                  border: "1px solid #9bab82",
                },
                "&.Mui-focused fieldset": {
                  border: "2px solid #9bab82",
                },
                "& .MuiInputBase-input": {
                  padding: "18px 16px 18px 0px",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#fafafa",
                opacity: 1,
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
