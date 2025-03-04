import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Paper, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const [product, setProduct] = useState({ nombre: '', precio: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si la sesión está activa
    const user = sessionStorage.getItem('user'); // Recupera el usuario desde sessionStorage
    if (!user) {
      navigate('/login'); // Si no hay usuario, redirige al login
    }
  }, [navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Verifica si hay usuario en sessionStorage
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user) {
        throw new Error('No estás autorizado para crear productos. Por favor, inicia sesión.');
      }

      const response = await axios.post('http://localhost:3000/productos', product, {
        withCredentials: true, // Para asegurarse de enviar las cookies si es necesario
        headers: {
          Authorization: `Bearer ${user.token}`, // Utiliza el token almacenado
        },
      });

      setMessage({ type: 'success', text: 'Producto creado con éxito' });
      setProduct({ nombre: '', precio: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error al crear el producto';
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  return (
    <Paper sx={{ maxWidth: 400, p: 3, mx: 'auto', mt: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Crear Producto
      </Typography>
      {message.text && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth required label="Nombre" name="nombre" value={product.nombre} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth required label="Precio" name="precio" type="number" value={product.precio} onChange={handleChange} sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" fullWidth>
          Crear Producto
        </Button>
      </Box>
    </Paper>
  );
}
