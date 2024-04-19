// react core
import React from 'react';
// UI libraries & styles
import { Container, Typography } from '@mui/material';
import './assets/style.scss';

const NotFound: React.FC = () => {
  return (
    <Container id='not-found'>
      <Typography variant='h4'>404 - Not Found</Typography>
      <Typography variant='body1'>The page you are looking for does not exist.</Typography>
    </Container>
  );
};

export default NotFound;
