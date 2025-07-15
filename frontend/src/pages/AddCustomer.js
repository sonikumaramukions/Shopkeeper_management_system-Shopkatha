import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import axios from 'axios';

function AddCustomer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsappNumber: '',
    aadharNumber: '',
    aadharPhoto: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      aadharPhoto: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // For now, just simulate success since we're not using authentication
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        whatsappNumber: '',
        aadharNumber: '',
        aadharPhoto: null,
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/customers');
      }, 2000);
    } catch (error) {
      setError('Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'primary.main', fontWeight: 600 }}>
          Add New Customer
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Enter customer details below
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Customer Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="WhatsApp Number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Aadhar Card Number"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  backgroundColor: 'secondary.main',
                  '&:hover': { backgroundColor: 'secondary.dark' },
                  borderRadius: 2,
                  py: 1.5,
                  mb: 2,
                }}
              >
                Upload Aadhar Card Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.aadharPhoto && (
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  Selected file: {formData.aadharPhoto.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                {loading ? 'Adding Customer...' : 'Add Customer'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        message="Customer added successfully!"
      />
    </Container>
  );
}

export default AddCustomer; 