"use client";

import React, { useState } from "react";
import { Card, Typography, Button, Snackbar, Alert } from "@mui/material";
import InputField from "@/components/InputField.js";
import { postLogin } from "@/lib/api.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postLogin({ username, password });
      console.log("Login success:", response);
      // Handle success (redirect, store token, etc.)
    } catch (error) {
      setError(error.message); // Set error message from backend
      setOpenSnackbar(true); // Show snackbar
    }
  };

  return (
    <div className="p-2 ml-5 mr-5 flex justify-center items-center min-h-screen">
      <Card
        className="p-5"
        sx={{
          backgroundColor: "rgb(21, 18, 43)",
          width: "100%",
          maxWidth: "400px",
          color: "white",
          borderRadius: "1.5rem",
        }}
      >
        <Typography variant="h6" className="mb-5" sx={{ color: "white" }}>
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
          className="mt-5 w-full"
        >
          Login
        </Button>
      </Card>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="error"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
