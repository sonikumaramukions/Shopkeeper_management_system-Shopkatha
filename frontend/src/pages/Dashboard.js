import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ProfileSidebar from '../components/ProfileSidebar';

function Dashboard() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Default stats for demo
  const stats = {
    totalCustomers: 0,
    totalPendingAmount: 0,
    activeLeases: 0,
    monthlySales: 0,
    kathaCollected: 0,
    activeLoans: 0
  };

  // Default shop information
  const shopInfo = {
    shopName: 'My Shop',
    shopAddress: '123 Main Street, City',
    phoneNumber: '+91 9876543210',
    email: 'shop@example.com'
  };

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              backgroundColor: `${color}15`,
              borderRadius: 2,
              p: 1,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div" sx={{ color: 'text.secondary' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  const QuickActionButton = ({ title, icon, onClick, color }) => (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      sx={{
        backgroundColor: color,
        '&:hover': { backgroundColor: `${color}dd` },
        borderRadius: 2,
        px: 3,
        py: 1.5,
        width: '100%',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      {title}
    </Button>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<ReceiptIcon />}
            onClick={() => navigate('/billing')}
            sx={{
              backgroundColor: 'secondary.main',
              '&:hover': { backgroundColor: 'secondary.dark' },
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Billing
          </Button>
          <IconButton
            onClick={() => setProfileOpen(true)}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': { 
                backgroundColor: 'primary.dark',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <PersonIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<PeopleIcon sx={{ color: '#4f46e5' }} />}
            color="#4f46e5"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Pending Amount"
            value={`₹${stats.totalPendingAmount.toLocaleString('en-IN')}`}
            icon={<AttachMoneyIcon sx={{ color: '#059669' }} />}
            color="#059669"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Active Leases"
            value={stats.activeLeases}
            icon={<InventoryIcon sx={{ color: '#7c3aed' }} />}
            color="#7c3aed"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Monthly Sales"
            value={`₹${stats.monthlySales.toLocaleString('en-IN')}`}
            icon={<TrendingUpIcon sx={{ color: '#dc2626' }} />}
            color="#dc2626"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Katha Collected"
            value={`₹${stats.kathaCollected.toLocaleString('en-IN')}`}
            icon={<AccountBalanceIcon sx={{ color: '#d97706' }} />}
            color="#d97706"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Active Loans"
            value={stats.activeLoans}
            icon={<AttachMoneyIcon sx={{ color: '#2563eb' }} />}
            color="#2563eb"
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4, borderRadius: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              title="Add Customer"
              icon={<AddIcon />}
              onClick={handleAddCustomer}
              color="#4f46e5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              title="New Bill"
              icon={<ReceiptIcon />}
              onClick={() => navigate('/billing')}
              color="#059669"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              title="Monthly Sales"
              icon={<TrendingUpIcon />}
              onClick={() => navigate('/monthly-sales')}
              color="#dc2626"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionButton
              title="Katha Collection"
              icon={<AccountBalanceIcon />}
              onClick={() => navigate('/katha-collection')}
              color="#d97706"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mt: 4, borderRadius: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
          Shop Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="text.secondary">
              <strong>Shop Name:</strong> {shopInfo.shopName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="text.secondary">
              <strong>Shop Address:</strong> {shopInfo.shopAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="text.secondary">
              <strong>Phone Number:</strong> {shopInfo.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="text.secondary">
              <strong>Email:</strong> {shopInfo.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <ProfileSidebar open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Container>
  );
}

export default Dashboard; 