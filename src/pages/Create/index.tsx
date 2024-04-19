// react core
import React, { useState } from 'react';
// libraries
import axios from 'axios';
// UI libraries & styles
import { Container, TextField, Button, Typography } from '@mui/material';
import './assets/style.scss';
// .env
const API_URL = import.meta.env.VITE_API_URL;

const Create: React.FC = () => {
  const [title, setTitle] = useState<string | undefined>('');
  const [body, setBody] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const handleSubmit = () => {
    if (title !== undefined && title !== '' && body !== undefined && body !== '') {
      setLoading(true);
      setError(null);

      axios
        .post(`${API_URL}/posts`, { title, body })
        .then(() => {
          setSuccess(true);
        })
        .catch((error) => {
          setError(error.message || 'An error occurred');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Container id='create'>
      <Typography variant='h4'>Create New Item</Typography>
      <form>
        <TextField label='Title' fullWidth margin='normal' value={title} onChange={handleTitleChange} />
        <TextField label='Body' fullWidth multiline rows={4} margin='normal' value={body} onChange={handleBodyChange} />
        <Button type='button' variant='contained' color='primary' disabled={loading} onClick={handleSubmit}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </form>
      {error && <Typography color='error'>{error}</Typography>}
      {success && (
        <Typography style={{ marginTop: '10px' }} color='success'>
          Item created successfully!
        </Typography>
      )}
    </Container>
  );
};

export default Create;
