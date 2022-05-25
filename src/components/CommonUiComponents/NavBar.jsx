import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import icon from "../../assets/img/NavBar/icon.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import '../../assets/scss/appbar/Navbar.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function NavBar() {
  return (

    <Box sx = {{ flexGrow: 1 }}>
  <AppBar 
    position="static"  
    sx={{
      backgroundColor : "#283845", 
    }}>
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 'auto' }}
      >
      </IconButton>
      <Typography noWrap component="div" sx={{ flexGrow: 1 }}>
        <img src={icon} style={{ width: 50, height: 50 }} alt="icon" />
      </Typography>
      <Typography variant="p" component="div" sx={{ ml: 3, fontWeight:"bold", fontFamily: 'Poppins, sans-serif' }} marginLeft='auto' >
        Dashboard
      </Typography>
      <Typography variant="p" component="div" sx={{ ml: 3, fontWeight:"bold", fontFamily: 'Poppins, sans-serif' }} marginLeft='auto'>
        Productos
      </Typography>
      <Typography variant="p" component="div" sx={{ ml: 3, fontWeight:"bold", fontFamily: 'Poppins, sans-serif' }} marginLeft='auto'>
        Ordenes
      </Typography>
      <Typography variant="p" component="div" sx={{ ml: 3, fontWeight:"bold", fontFamily: 'Poppins, sans-serif' }} marginLeft='auto'>
        Vendedor
      </Typography>
      <Typography icon={ShoppingCartIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
        <ShoppingCartIcon sx={{color: '#F4FBFA'}}/>
      </Typography>
      <Typography icon={ShoppingBasketIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
        <ShoppingBasketIcon sx={{color: '#F4FBFA'}}/>
      </Typography>
      <Typography icon={AccountCircleIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
        <AccountCircleIcon sx={{color: '#F4FBFA'}}/>
      </Typography>
    </Toolbar>
  </AppBar>
    </Box >
  );
}
