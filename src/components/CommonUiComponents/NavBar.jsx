import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, Outlet } from 'react-router-dom';
import icon from "../../assets/img/NavBar/icon.png"
import '../../assets/scss/appbar/Navbar.scss'
import * as NavBarStyles from '../../assets/js/styleObject/CommonUI/NavBar.js'
import { Grid } from '@mui/material';
import cartIcon from "../../assets/img/Icons/cartIcon.png"
import avatar from "../../assets/img/Icons/avatar.png"
import Logout from '../Login/Logout';
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
          <Grid container>
            <Grid 
              sx={{display: "flex", alignItems: "center", gap: 5}} 
              item 
              xs={8}
            >
              <a href="/products">
                <img src={icon} style={{ width: 40, height: 38 }} alt="icon" />
              </a>
              <div>
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
              </div>
            </Grid>
            <Grid 
              sx={{display: "flex", alignItems: "center", justifyContent: "flex-end",gap: 2}}
              item 
              xs={4}
            >
              <NavLink 
                style={
                  ({ isActive }) => 
                    isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
                }
                to="/cart"
              >
                <img src={cartIcon} alt="cartIcon" width="32" />
              </NavLink>
              <NavLink 
                style={
                  ({ isActive }) => 
                    isActive ? NavBarStyles.activeLinkStyle : NavBarStyles.linkStyle
                }
                to="/user"

              >
                <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                  <img src={avatar} alt="avatar" width="32"/>
                  <span>Cuenta</span>
                </div>
                
              </NavLink>
              <Logout />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <section>
        <Outlet/>
      </section>
    </Box >
  );
}
