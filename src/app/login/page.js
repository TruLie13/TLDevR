"use client";

import React, { useState } from "react";
import { Card, Typography, Button, Alert, Box } from "@mui/material";
import InputField from "@/components/InputField.js";
import { postLogin } from "@/lib/api.js";
import SnackbarComponent from "@/components/Snackbar.js";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("Zayan");
  const [password, setPassword] = useState("2Forme13!#");
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postLogin({ username, password });
      console.log("Login success:", response);
      router.push("/create");
      // Handle success (redirect, store token, etc.)
    } catch (error) {
      setError(error.message); // Set error message from backend
      setOpenSnackbar(true); // Show snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <Box sx={{ padding: "0.5rem", marginLeft: "1.25rem", marginRight: "1.25rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Card
        sx={{
          padding: "1.25rem",
          backgroundColor: "background.paper",
          width: "100%",
          maxWidth: "400px",
          color: "text.primary",
          borderRadius: "1.5rem",
        }}
      >
        <Typography variant="h6" sx={{ color: "text.primary", marginBottom: "1.25rem" }}>
          Login
        </Typography>

        <InputField
          label="Username"
          value={username}
          onChange={setUsername}
          type="text"
        />
        <InputField
          label="Password"
          value={password}
          onChange={setPassword}
          type="text"
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!username || !password}
          sx={{
            marginTop: "1.25rem",
            width: "100%",
            color: "primary.contrastText",
            // Ensure visible style when disabled
            "&.Mui-disabled": {
              backgroundColor: "action.disabledBackground",
              color: "text.disabled",
              cursor: "not-allowed",
            },
          }}
        >
          Login
        </Button>
      </Card>

      {/* Snackbar for error messages */}
      <SnackbarComponent
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={error}
        severity={"error"}
      />
    </Box>
  );
}
