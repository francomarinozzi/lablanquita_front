import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/productos') 
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {products.map((product) => (
          <Item key={product.id}>{product.nombre} - ${product.precio}</Item>
        ))}
      </Stack>
    </Box>
  );
}
