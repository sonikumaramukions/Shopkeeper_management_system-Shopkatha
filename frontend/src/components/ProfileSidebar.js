import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Money as MoneyIcon,
  Receipt as ReceiptIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function ProfileSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Monthly Sales', icon: <TrendingUpIcon />, path: '/monthly-sales' },
    { text: 'Katha Collected', icon: <AccountBalanceIcon />, path: '/katha-collection' },
    { text: 'Loans', icon: <MoneyIcon />, path: '/loans' },
    { text: 'Monthly Billings', icon: <ReceiptIcon />, path: '/monthly-billings' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          backgroundColor: 'background.paper',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Profile Menu
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={user?.profilePhoto}
          sx={{
            width: 80,
            height: 80,
            mb: 2,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {user?.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.shopName}
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default ProfileSidebar; 