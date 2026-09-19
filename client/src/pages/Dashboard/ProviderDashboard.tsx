import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProviderDashboard: React.FC = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 3, borderTop: '4px solid', borderColor: 'secondary.main', boxShadow: 1 }}>
        <Typography variant="h4" color="secondary.dark" sx={{ fontWeight: 700 }}>
          Professional Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Manage your bookings, availability, and profile.
        </Typography>
      </Box>
    </Container>
  );
};

export default ProviderDashboard;