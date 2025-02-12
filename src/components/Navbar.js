"use client"; // If you plan to add interactivity later

import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
