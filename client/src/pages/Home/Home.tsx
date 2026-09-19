import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatIcon from '@mui/icons-material/Chat';

const Home: React.FC = () => {
  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 72px)' }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #040b16 0%, #0a192f 100%)', 
        color: 'white', 
        py: { xs: 10, md: 16 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative blob */}
        <Box sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(20,184,166,0) 70%)',
        }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
            Hyperlocal Services at <Box component="span" sx={{ color: 'secondary.main' }}>Your Command</Box>
          </Typography>
          <Typography variant="h5" sx={{ mb: 5, fontWeight: 400, color: '#94A3B8' }}>
            Connect directly with verified local service providers in your area.
            Speak to search, chat directly on WhatsApp, and get things done fast.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            sx={{ px: 5, py: 1.8, fontSize: '1.1rem', borderRadius: 50, fontWeight: 700 }}
          >
            Find a Professional Near You
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: { xs: 4, md: 6 } 
        }}>
          
          <Card elevation={1}>
            <CardContent sx={{ p: { xs: 4, md: 5 }, textAlign: 'center' }}>
              <Box sx={{ 
                bgcolor: 'rgba(20, 184, 166, 0.1)', 
                color: 'secondary.main',
                width: 72, 
                height: 72, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <MicIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                Voice Search
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Just say what you need in your language. Our advanced voice AI understands and finds the right person instantly.
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={1}>
            <CardContent sx={{ p: { xs: 4, md: 5 }, textAlign: 'center' }}>
              <Box sx={{ 
                bgcolor: 'rgba(15, 23, 42, 0.05)', 
                color: 'primary.main',
                width: 72, 
                height: 72, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <LocationOnIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                Hyperlocal Reach
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Find professionals exactly where you need them. Filter by 1km, 2km, or up to 10km radius with precision.
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={1}>
            <CardContent sx={{ p: { xs: 4, md: 5 }, textAlign: 'center' }}>
              <Box sx={{ 
                bgcolor: 'rgba(16, 185, 129, 0.1)', 
                color: '#10B981',
                width: 72, 
                height: 72, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <ChatIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                Direct Contact
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                No middlemen. View fares upfront and instantly connect with providers via WhatsApp or direct Call.
              </Typography>
            </CardContent>
          </Card>

        </Box>
      </Container>
    </Box>
  );
};

export default Home;
