import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
//css 
import '../assets/css/home.css'
// images
import banner from '../assets/image/home/banner.svg'
// icon
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useDispatch, useSelector } from 'react-redux';
import {setForm} from "../../store/action/action"
const Home = ({history}) => {

    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch();

    function handleHomeButton(){
        if(auth.isAuth)
        {
            history('/listing')
        }
        else {
            dispatch(setForm({
                state : true,
                formType : 'LogIn'
            }))
        }
    }
    return (
        <Box>
            <Grid container className = 'topSection'>
                {/* banner */}
                <Grid item xs = {12} md = {6}>
                <img src={banner} alt = 'banner_home'></img>
                </Grid>
                {/* banner eds */}
                {/* banner text */}
                <Grid item xs = {12} md = {6}  className = 'bannerContent'>
                    <Box >
                        <Typography className='textBanner' >Let's create some flawless looking forms with 
                            <strong> Formo</strong>  </Typography>
                    </Box>
                    <Box>
                        <Button endIcon = {<ArrowRightAltIcon/>} variant='contained' onClick={handleHomeButton}>Get Started</Button>
                    </Box>
                </Grid>
                {/* banner text ends*/}
            </Grid>
        </Box>
    );
}

export default Home;
