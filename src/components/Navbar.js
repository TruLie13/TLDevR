"use client"; // If you plan to add interactivity later

import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/ThemeWrapper.js";

export default function Navbar() {
  const router = useRouter();

  const { currentTheme, toggleTheme } = useTheme();

  const handleHomeClick = () => {
    router.push("/");
  };
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "rgb(21, 18, 43)", zIndex: 1300 }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleHomeClick}
          >
            TLDevR
          </Typography>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 rounded"
          >
            Toggle Theme (Current: {currentTheme})
          </button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
