// react core
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header: React.FC = () => {
  const location = useLocation();

  // Check if the current location is the Home route
  const isHomeRoute = location.pathname === '/';

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            Posts
          </Link>
        </Typography>
        {isHomeRoute && (
          <Button component={Link} to='/create' color='inherit'>
            Create New Post
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
