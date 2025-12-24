"use client";

import { getAuthToken, removeAuthToken } from "@/lib/auth";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { background } from "@/lib/themeTokens";

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

  const handleCreateClick = () => {
    handleMenuClose();
    router.push("/create");
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
      sx={{ backgroundColor: background.paper, zIndex: 1300 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={handleHomeClick}
        >
          TLDevR
        </Typography>

        {isLoggedIn && (
          <Box>
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
                  backgroundColor: background.paper,
                  border: `1px solid ${background.hover}`,
                  color: "white",
                },
              }}
            >
              <MenuItem
                onClick={handleCreateClick}
                sx={{ "&:hover": { backgroundColor: background.hover } }}
              >
                Create
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ color: "grey", "&:hover": { backgroundColor: background.hover } }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
