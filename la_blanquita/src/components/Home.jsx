import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import backgroundImage from '../assets/background_1.jpg'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const theme = createTheme();

const StyledItem = ({ product }) => (
  <Paper
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 2,
      borderRadius: 2,
      boxShadow: 3,
      textAlign: 'center',
    }}
  >
    <Typography variant="h6" color="text.primary">
      {product.nombre} - ${product.precio}
    </Typography>
  </Paper>
);

export default function ProductStack() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/productos')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100%', // Aseguramos que ocupe todo el alto de la página
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', // Cambio a 'flex-start' para que no se recorte al principio
          backgroundColor: '#f5f5f5',
          overflowY: 'auto', // Habilitar desplazamiento en toda la página
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            width: '100%',
            marginBottom: 2,
          }}
        >
          <Typography color="black" variant="h5" textAlign="center" gutterBottom>
            Lista de Productos
          </Typography>
          <Stack spacing={2}>
            {products.map((product) => (
              <StyledItem key={product.id} product={product} />
            ))}
            <Button variant="outlined" onClick={() => navigate("/create")}>
              Agregar producto
            </Button>
            <Button variant="contained" onClick={() => navigate("/create")}>
              Editar producto
            </Button>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
