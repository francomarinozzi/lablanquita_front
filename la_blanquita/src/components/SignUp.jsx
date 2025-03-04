  import React, { useState } from "react";
  import Avatar from "@mui/material/Avatar";
  import Button from "@mui/material/Button";
  import CssBaseline from "@mui/material/CssBaseline";
  import TextField from "@mui/material/TextField";
  import Grid from "@mui/material/Grid";
  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import Container from "@mui/material/Container";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import axios from "axios";
  import backgroundImage from '../assets/background_1.jpg';
  import { Link } from "react-router-dom";


  const theme = createTheme();

  export default function SignUp() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const userData = {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
      };
      
      try {
        const response = await axios.post("http://localhost:3000/users/register", userData, {
          headers: { "Content-Type": "application/json" },
        });
        
        setSuccess("Registro exitoso. Redirigiendo...");
        setError("");
        
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.message || "Error al registrarse");
        setSuccess("");
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
              <Typography component="h1" variant="h5">
                Registrarse
              </Typography>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              {success && (
                <Typography color="primary" sx={{ mt: 2 }}>
                  {success}
                </Typography>
              )}
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="username" label="Nombre de usuario" name="username" autoComplete="username" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="email" label="Correo electrónico" name="email" autoComplete="email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="new-password" />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Registrarse
                </Button>
                <Grid item>
                    <Link to="/" variant="body2" sx={{ textDecoration: 'none', color: 'primary.main' }}>
                      {"Ya tienes una cuenta? Inicia sesion"}
                    </Link>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
