import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CustomerDashboard: React.FC = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 3, boxShadow: 1 }}>
        <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
          Customer Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Welcome back! Start searching for local professionals.
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomerDashboard;
