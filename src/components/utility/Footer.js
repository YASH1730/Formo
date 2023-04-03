import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import "../assets/css/footer.css"
const Footer = () => {
    return (
        <>
        <Box className = 'footerContainer'>
            <Divider className='divider'></Divider>
            <Typography variant = 'body2'>Made With ❤️ by Yashwant Sahu Formo © 2023</Typography>
        </Box>
        </>
    );
}

export default Footer;
