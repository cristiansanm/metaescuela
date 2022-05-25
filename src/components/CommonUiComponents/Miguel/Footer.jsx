import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import icon from "../../../assets/img/NavBar/icon.png";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import BookIcon from '@material-ui/icons/Book';
import EuroIcon from '@material-ui/icons/Euro';
import '../../../assets/scss/appbar/Footer.scss'

export default function MenuAppBar() {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div id="main-footer">

            <Box sx={{ flexGrow: 1, backgroundColor: '#283845', }} >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={auth}
                                onChange={handleChange}
                                aria-label="login switch"
                            />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: '#283845' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Login
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"

                                    color="inherit"
                                >
                                    <Typography noWrap component="div" sx={{ flexGrow: 1 }}>
                                        <img src={icon} style={{ width: 50, height: 50 }} alt="icon" /> </Typography>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}><Typography icon={ShoppingCartIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
                                        <ShoppingCartIcon />
                                    </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Typography icon={ShoppingBasketIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
                                            <ShoppingBasketIcon />
                                        </Typography>
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                        <Typography icon={SmartphoneIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
                                            <SmartphoneIcon />
                                        </Typography>
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                        <Typography icon={SquareFootIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
                                            <SquareFootIcon />
                                        </Typography>
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                        <Typography icon={BookIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
                                            <BookIcon />
                                        </Typography>
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                        <Typography icon={EuroIcon} component="div" sx={{ ml: 3 }} marginLeft='auto' color="error">
                                            <EuroIcon />
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
