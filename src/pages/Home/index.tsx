// react core
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// libraries
import axios from 'axios';
// UI libraries & styles
import { Container, Grid, Card, CardContent, Typography, Button, Pagination } from '@mui/material';
import './assets/style.scss';
// interfaces/types
import { Item } from 'src/interfaces';
// .env
const API_URL = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get<Item[]>(`${API_URL}/posts?_page=${currentPage}&_limit=6`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, [currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container id='home'>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant='h5' component='div' sx={{ marginBottom: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item.body}
                </Typography>
              </CardContent>
              <div style={{ alignSelf: 'flex-end' }}>
                <Button component={Link} to={`/item/${item.id}`} color='primary'>
                  View Details
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(100 / 6)} // Assuming we have a total of 100 items !!!
        page={currentPage}
        onChange={handlePageChange}
        className='pagination'
      />
    </Container>
  );
};

export default Home;
