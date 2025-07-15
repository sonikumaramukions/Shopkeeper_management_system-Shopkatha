import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';

function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLeaseDialog, setOpenLeaseDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [newLease, setNewLease] = useState({
    itemName: '',
    amount: '',
    dateOfLending: new Date().toISOString().split('T')[0],
  });
  const [newPayment, setNewPayment] = useState({
    amount: '',
    paymentMethod: 'cash',
  });

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
      setCustomer(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      setLoading(false);
    }
  };

  const handleAddLease = async () => {
    try {
      await axios.post('http://localhost:5000/api/leases', {
        ...newLease,
        customer: id,
      });
      setOpenLeaseDialog(false);
      fetchCustomerDetails();
    } catch (error) {
      console.error('Error adding lease:', error);
    }
  };

  const handleAddPayment = async () => {
    try {
      await axios.post('http://localhost:5000/api/payments', {
        ...newPayment,
        customer: id,
      });
      setOpenPaymentDialog(false);
      fetchCustomerDetails();
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  const sendWhatsAppReminder = () => {
    const message = `Dear ${customer.fullName},\n\nYour pending amount is ₹${customer.totalPendingAmount}. Please make the payment at your earliest convenience.\n\nThank you,\nShopKatha`;
    const whatsappUrl = `https://wa.me/${customer.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!customer) {
    return <Typography>Customer not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {customer.fullName}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {customer.phoneNumber}
            </Typography>
            <Typography variant="body1">
              <strong>WhatsApp:</strong> {customer.whatsappNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {customer.email || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Company:</strong> {customer.workingCompanyName}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {customer.address}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Pending Amount
                </Typography>
                <Typography variant="h4" color="primary">
                  ₹{customer.totalPendingAmount.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenLeaseDialog(true)}
                  >
                    Add Lease
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AttachMoneyIcon />}
                    onClick={() => setOpenPaymentDialog(true)}
                  >
                    Record Payment
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<WhatsAppIcon />}
                    onClick={sendWhatsAppReminder}
                  >
                    Send Reminder
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Leased Items
        </Typography>
        <Grid container spacing={2}>
          {customer.leases?.map((lease) => (
            <Grid item xs={12} sm={6} md={4} key={lease._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{lease.itemName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Amount: ₹{lease.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(lease.dateOfLending).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Add Lease Dialog */}
      <Dialog open={openLeaseDialog} onClose={() => setOpenLeaseDialog(false)}>
        <DialogTitle>Add New Lease</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Item Name"
            value={newLease.itemName}
            onChange={(e) => setNewLease({ ...newLease, itemName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={newLease.amount}
            onChange={(e) => setNewLease({ ...newLease, amount: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Date of Lending"
            type="date"
            value={newLease.dateOfLending}
            onChange={(e) => setNewLease({ ...newLease, dateOfLending: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLeaseDialog(false)}>Cancel</Button>
          <Button onClick={handleAddLease} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)}>
        <DialogTitle>Record Payment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Payment Method"
            value={newPayment.paymentMethod}
            onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPayment} variant="contained" color="primary">
            Record
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CustomerProfile; 