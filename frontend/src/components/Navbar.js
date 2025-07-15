import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAuth } from '../contexts/AuthContext';

const pages = [
  { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { name: 'Customers', path: '/customers', icon: <PeopleIcon /> },
  { name: 'Add Customer', path: '/add-customer', icon: <AddIcon /> },
  { name: 'Billing', path: '/billing', icon: <ReceiptIcon /> },
  { name: 'Monthly Sales', path: '/monthly-sales', icon: <TrendingUpIcon /> },
  { name: 'Katha Collection', path: '/katha-collection', icon: <AccountBalanceIcon /> },
];

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 1,
        my: 2,
        px: 2,
      }}>
        <StorefrontIcon sx={{ 
          fontSize: 32, 
          color: 'primary.main',
        }} />
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 700,
            fontSize: '1.5rem',
          }}
        >
          ShopKatha
        </Typography>
      </Box>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem 
            button 
            key={page.name} 
            component={RouterLink} 
            to={page.path}
            selected={location.pathname === page.path}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(79, 70, 229, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === page.path ? 'white' : 'primary.main',
              minWidth: 40,
            }}>
              {page.icon}
            </ListItemIcon>
            <ListItemText 
              primary={page.name} 
              primaryTypographyProps={{
                fontWeight: location.pathname === page.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: 70,
            px: { xs: 2, sm: 3 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { sm: 'none' },
                color: 'text.primary',
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                mr: { xs: 2, md: 4 },
              }}
            >
              <StorefrontIcon sx={{ 
                fontSize: 32, 
                color: 'primary.main',
              }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                ShopKatha
              </Typography>
            </Box>
          </Box>

          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                sx={{
                  my: 2,
                  mx: 0.5,
                  color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  position: 'relative',
                  fontWeight: location.pathname === page.path ? 600 : 400,
                  minWidth: 'auto',
                  px: 2,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: location.pathname === page.path ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
                    width: '80%',
                    height: 2,
                    backgroundColor: 'primary.main',
                    transition: 'transform 0.2s ease-in-out',
                  },
                  '&:hover::after': {
                    transform: 'translateX(-50%) scaleX(1)',
                  },
                }}
              >
                {page.icon}
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                  {page.name}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              ml: 'auto',
            }}
          >
            <Tooltip title="Notifications">
              <IconButton 
                sx={{ 
                  color: 'text.secondary',
                  backgroundColor: 'background.paper',
                  '&:hover': { 
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <Avatar 
                  alt={user?.fullName || 'User'} 
                  src="/static/images/avatar/2.jpg"
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  minWidth: 180,
                },
              }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar; 