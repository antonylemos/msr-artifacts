import type { Config } from "tailwindcss";

const sharedConfig = {
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#000000",
          hover: "#0B2A4A",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        background: {
          tinted: "rgba(11, 42, 74, 0.18)",
          primary: "#D9E4F2",
        },
      },
    },
  },
  plugins: [],
} satisfies Omit<Config, "content">;

export default sharedConfig;
