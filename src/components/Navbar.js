"use client";

import { getAuthToken, removeAuthToken } from "@/lib/auth";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());

    const handleAuthChange = () => setIsLoggedIn(!!getAuthToken());
    window.addEventListener("authChange", handleAuthChange);

    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    handleMenuClose();
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

          {isLoggedIn && (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ color: "white" }}
                aria-label="User menu"
              >
                <AccountCircle sx={{ fontSize: 32 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    backgroundColor: "rgb(21, 18, 43)",
                    border: "1px solid rgb(34, 31, 52)",
                    color: "white",
                  },
                }}
              >
                <MenuItem
                  onClick={handleLogout}
                  sx={{ "&:hover": { backgroundColor: "rgb(34, 31, 52)" } }}
                >
                  Create
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{color: "grey", "&:hover": { backgroundColor: "rgb(34, 31, 52)" } }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
