import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
          {/* Logo Section */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              color: 'primary.main'
            }}
          >
            <BuildIcon sx={{ mr: 1, fontSize: 32, color: 'secondary.main' }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
              BoloFix
            </Typography>
          </Box>

          {/* Navigation/Actions Section */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="primary" 
              variant="text" 
              onClick={() => navigate('/login')}
              sx={{ fontWeight: 600 }}
            >
              Log in
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              onClick={() => navigate('/signup')}
              disableElevation
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
