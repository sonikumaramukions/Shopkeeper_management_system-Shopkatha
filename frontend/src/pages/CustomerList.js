import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  Snackbar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  TablePagination,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WarningIcon from '@mui/icons-material/Warning';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchCustomers();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  const handleEditCustomer = (id) => {
    navigate(`/customers/${id}`);
  };

  const handleDeleteCustomer = (id) => {
    // Implement delete functionality
    console.log('Delete customer:', id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phoneNumber?.includes(searchQuery) ||
    customer.whatsappNumber?.includes(searchQuery)
  );

  const paginatedCustomers = filteredCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        mt: { xs: 8, sm: 9 }, // Add top margin to account for fixed navbar
        mb: 4,
        minHeight: '100vh',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Customers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your customer information and track their payments
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Total Customers</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {customers.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon sx={{ color: 'error.main', mr: 1 }} />
                <Typography variant="h6">Total Pending Amount</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main' }}>
                ₹{customers.reduce((sum, customer) => sum + (customer.pendingAmount || 0), 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon sx={{ color: 'warning.main', mr: 1 }} />
                <Typography variant="h6">Pending Payments</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                {customers.filter(c => c.pendingAmount > 0).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddCustomer}
              sx={{ 
                minWidth: { xs: '100%', sm: 'auto' },
                height: 48,
              }}
            >
              Add Customer
            </Button>
            <Box sx={{ 
              display: 'flex',
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
            }}>
              <TextField
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  minWidth: { xs: '100%', sm: 300 },
                  '& .MuiOutlinedInput-root': {
                    height: 48,
                  },
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{ 
                  minWidth: { xs: '100%', sm: 'auto' },
                  height: 48,
                }}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                sx={{ 
                  minWidth: { xs: '100%', sm: 'auto' },
                  height: 48,
                }}
              >
                Export
              </Button>
            </Box>
          </Box>

          {loading ? (
            <LinearProgress />
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>WhatsApp</TableCell>
                    <TableCell>Aadhar Number</TableCell>
                    <TableCell align="right">Pending Amount</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCustomers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((customer) => (
                      <TableRow
                        key={customer._id}
                        hover
                        sx={{
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {customer.name.charAt(0)}
                            </Avatar>
                            <Typography>{customer.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.whatsappNumber}</TableCell>
                        <TableCell>{customer.aadharNumber}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`₹${customer.pendingAmount || 0}`}
                            color={customer.pendingAmount > 0 ? 'error' : 'success'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleEditCustomer(customer._id)}
                                sx={{ color: 'primary.main' }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteCustomer(customer._id)}
                                sx={{ color: 'error.main' }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            component="div"
            count={filteredCustomers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              '.MuiTablePagination-select': {
                minWidth: '80px',
              },
            }}
          />
        </CardContent>
      </Card>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CustomerList; 