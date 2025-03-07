import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../assets/background_1.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const theme = createTheme();

export default function ProductForm() {
  const [product, setProduct] = useState({ nombre: '', precio: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/productos', product, {
        withCredentials: true,
      });
      setMessage({ type: 'success', text: 'Producto creado con éxito' });
      setProduct({ nombre: '', precio: '' });
    } catch (error) {
      if (error.response?.status === 400) {
        navigate('/');
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Error al crear el producto';
        setMessage({ type: 'error', text: errorMsg });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate("/dashboard")}
      sx={{
        position: "absolute", 
        top: 10, 
        left: 10, 
      }}>
      Volver
      </Button>

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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <InventoryIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear Producto
            </Typography>
            {message.text && <Alert severity={message.type} sx={{ mt: 2 }}>{message.text}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nombre"
                label="Nombre del producto"
                name="nombre"
                value={product.nombre}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="precio"
                label="Precio"
                name="precio"
                type="number"
                value={product.precio}
                onChange={handleChange}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Crear Producto
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
