import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import icon from "./icon/icon.png"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import '../../../assets/scss/appbar/Navbar.scss'



export default function ButtonAppBar() {
  return (

    <Box sx = {{ flexGrow: 1, marginBottom: 3 }}>
  <AppBar position="static" color="primary" className="appbar">
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
      <Typography variant="p" component="div" sx={{ ml: 3 }} marginLeft='auto' >
        Dashboard
      </Typography>
      <Typography variant="p" component="div" sx={{ ml: 3 }} marginLeft='auto'>
        Libros
      </Typography>
      <Typography variant="p" component="div" sx={{ ml: 3 }} marginLeft='auto'>
        Tecnoloía
      </Typography>
      <Typography variant="p" component="div" sx={{ ml: 3 }} marginLeft='auto'>
        Otros
      </Typography>
      <Typography icon={ShoppingCartIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
        <ShoppingCartIcon />
      </Typography>
      <Typography icon={ShoppingBasketIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
        <ShoppingBasketIcon />
      </Typography>
      <Link to="/"><Button color="inherit" onClick={() => Link("")}>Login</Button></Link>
    </Toolbar>
  </AppBar>
    </Box >
  );
}
