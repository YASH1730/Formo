import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

// logo 
import logo from '../assets/image/logo.svg'
// icon 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
//css 
import '../assets/css/nav.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setAuth, setForm } from '../../store/action/action';
const NavBar = ({ history }) => {

    const dispatch = useDispatch();
    const {auth} = useSelector(state=>state);


    function handleLog() {
        dispatch(setForm({
            state: true,
            formType: 'LogIn'
        }))
    }

    function handleLogout(){
        dispatch(setAuth({
            isAuth: false,
            name: null,
            token : null
        }))
        dispatch(setAlert({
            open : true,
            variant : 'success',
            message : 'Logged out !!!'
        }))
    }

    return (
        <Box className='navContainer' >
            {/* // logo  */}
            <Box className='logoBox'>
                <img src={logo} alt='logo' />
                <Typography variant='h6'>
                    Formo
                </Typography>
            </Box>

            {/* links  */}
            <Box component={"ul"} className='links'>
                <Typography variant='body2' component={Link} to='/' >Home</Typography>
                <Typography variant='body2' component={Link} to='/' >About</Typography>
                <Typography variant='body2' component={Link} to='/' >Contact</Typography>
            </Box>
            {/* button  */}
            <Box>
               { !auth.isAuth ? <IconButton color='primary' onClick={handleLog} size='large'>
                    <AccountCircleIcon fontSize='100pxA' />
                </IconButton> :
                <IconButton color='primary' onClick={handleLogout} size='large'>
                    <LogoutIcon fontSize='100pxA' />
                </IconButton>}
            </Box>
        </Box>
    );
}

export default NavBar;
