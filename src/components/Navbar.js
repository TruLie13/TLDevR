"use client"; // If you plan to add interactivity later

import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "rgb(21, 18, 43)", zIndex: 1300 }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TLDevR
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
