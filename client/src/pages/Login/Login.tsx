import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, CircularProgress, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { googleSignIn } from '../../services/auth.service';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError(null);
        const data = await googleSignIn(tokenResponse.access_token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 'PROVIDER') {
          navigate('/provider-dashboard');
        } else {
          navigate('/customer-dashboard');
        }
      } catch (err: any) {
        setError(err.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      setError('Google login failed. Please try again.');
    },
  });

  const handleGoogleLogin = () => {
    login();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <Paper elevation={3} sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 6,
          background: 'linear-gradient(90deg, #14B8A6 0%, #040b16 100%)',
        }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, fontSize: '1.1rem' }}>
          Sign in to access your BoloFix account and find the best local services.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4, textAlign: 'left' }}>
            {error}
          </Alert>
        )}

        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={loading ? <CircularProgress size={20} /> : <GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ 
            py: 1.8, 
            borderColor: 'divider', 
            color: 'text.primary',
            fontWeight: 700,
            fontSize: '1.05rem',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'rgba(15, 23, 42, 0.04)'
            }
          }}
        >
          Sign in with Google
        </Button>

        <Box sx={{ mt: 5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
            Don't have an account?{' '}
            <Button color="secondary" onClick={() => navigate('/signup')} sx={{ fontWeight: 700, ml: 1 }}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
