import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import icon from "../../assets/img/NavBar/icon.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../../assets/scss/appbar/Navbar.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as NavBarStyles from '../../assets/js/styleObject/CommonUI/NavBar.js'

export default function NavBar() {
  return (
    <Box
      sx = {{ flexGrow: 1 }}
    >
      <AppBar 
        position="static"  
        sx={{
          backgroundColor : "#283845", 
        }}>
        <Toolbar>
          <Typography noWrap component="div" sx={{ flexGrow: 1 }}>
            <a href="/dashboard">
              <img src={icon} style={{ width: 50, height: 50 }} alt="icon" />
            </a>
          </Typography>
          <NavLink
            style={
              ({ isActive }) => 
                isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
            }
            to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink 
            style={
              ({ isActive }) => 
                isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
            }
            to="/products"
          >
            Productos
          </NavLink>  
          <NavLink 
            style={
              ({ isActive }) => 
                isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
            }  
            to="/orders"
          >
            Ordenes
          </NavLink>
          <NavLink 
            style={
              ({ isActive }) => 
                isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
            }  
            to="/seller"
          >
            Vendedor
          </NavLink>
          <NavLink 
            style={
              ({ isActive }) => 
                isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
            }
            to="/cart"
          >
            <ShoppingCartIcon sx={{color: '#F4FBFA'}}/>
          </NavLink>
          <NavLink 
            style={
              ({ isActive }) => 
                isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
            }
            to="/user"
          >
            <AccountCircleIcon sx={{color: '#F4FBFA'}}/>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
