import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, CircularProgress, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { googleSignIn } from '../../services/auth.service';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'PROVIDER' | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError(null);
        
        if (!selectedRole) {
          throw new Error('Please select a role before signing up.');
        }

        const data = await googleSignIn(tokenResponse.access_token, selectedRole);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 'PROVIDER') {
          navigate('/provider-dashboard');
        } else {
          navigate('/customer-dashboard');
        }
      } catch (err: any) {
        setError(err.message || 'Signup failed');
      } finally {
        setLoading(false);
        setSelectedRole(null);
      }
    },
    onError: (error) => {
      console.error('Signup Failed:', error);
      setError('Google signup failed. Please try again.');
    },
  });

  const handleGoogleSignup = (role: 'CUSTOMER' | 'PROVIDER') => {
    setSelectedRole(role);
    login();
  };

  return (
    <Container maxWidth="md" sx={{ py: 12 }}>
      <Paper elevation={3} sx={{ p: { xs: 4, md: 6 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 6,
          background: 'linear-gradient(90deg, #14B8A6 0%, #040b16 100%)',
        }} />
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
          Join BoloFix
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6, fontSize: '1.1rem' }}>
          Choose your role to get started with the best local service network.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4, textAlign: 'left' }}>
            {error}
          </Alert>
        )}

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: { xs: 4, md: 6 } 
        }}>
          {/* Customer Signup */}
          <Box sx={{ 
            p: 4, 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 4, 
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.light',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
            }
          }}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                I'm a Customer
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontSize: '1rem' }}>
                Find and connect with local professionals to get your tasks done instantly.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={loading && selectedRole === 'CUSTOMER' ? <CircularProgress size={20} /> : <GoogleIcon />}
              onClick={() => handleGoogleSignup('CUSTOMER')}
              disabled={loading}
              sx={{ 
                py: 1.5, 
                borderColor: 'divider', 
                color: 'text.primary',
                fontWeight: 700,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(15, 23, 42, 0.04)'
                }
              }}
            >
              Sign up with Google
            </Button>
          </Box>

          {/* Provider Signup */}
          <Box sx={{ 
            p: 4, 
            border: '2px solid', 
            borderColor: 'secondary.main', 
            borderRadius: 4, 
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: 'rgba(20, 184, 166, 0.04)',
            transition: 'all 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)'
            }
          }}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'secondary.dark' }}>
                I'm a Professional
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontSize: '1rem' }}>
                Register your services, get discovered locally, and grow your business.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              startIcon={loading && selectedRole === 'PROVIDER' ? <CircularProgress size={20} /> : <GoogleIcon />}
              onClick={() => handleGoogleSignup('PROVIDER')}
              disabled={loading}
              sx={{ 
                py: 1.5, 
                fontWeight: 700,
              }}
            >
              Sign up with Google
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
            Already have an account?{' '}
            <Button color="primary" onClick={() => navigate('/login')} sx={{ fontWeight: 700, ml: 1 }}>
              Log In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
