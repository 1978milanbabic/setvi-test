// react core
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// libraries
import axios from 'axios';
// UI libraries & styles
import {
  Container,
  Typography,
  Button,
  Modal,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './assets/style.scss';
// interfaces/types
import { Item } from 'src/interfaces';
// .env
const API_URL = import.meta.env.VITE_API_URL;
// components
import NotFound from '../NotFound';

const ItemView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [itemNotFound, setItemNotFound] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Item>(`${API_URL}/posts/${id}`)
      .then((response) => {
        setItem(response.data);
        // set input fields for editing
        let { title, body } = response.data;
        setEditedTitle(title);
        setEditedBody(body);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
        setItemNotFound(true);
      });
  }, [id]);

  // edit Item modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBody(event.target.value);
  };

  const handleEdit = () => {
    axios
      .put(`${API_URL}/posts/${id}`, { title: editedTitle, body: editedBody })
      .then(() => {
        handleClose();
        setItem({ ...item!, title: editedTitle, body: editedBody });
      })
      .catch((error) => {
        setError(error.message || 'An error occurred');
      });
  };

  // delete
  const handleDelete = () => {
    axios
      .delete(`${API_URL}/posts/${id}`)
      .then(() => {
        setShowSuccessDialog(true);
      })
      .catch((error) => {
        alert(error.message || 'An error occurred');
      });
  };

  return (
    <Container id='item'>
      {item ? (
        <div>
          <Typography variant='h4'>{item.title}</Typography>
          <br />
          <br />
          <Typography>{item.body}</Typography>
          <br />
          <Button variant='contained' onClick={handleOpen}>
            Edit
          </Button>
          <Button variant='contained' color='error' onClick={handleDelete} id='delete-button'>
            Delete
          </Button>
        </div>
      ) : itemNotFound ? (
        <NotFound />
      ) : (
        <Typography variant='h6'>Loading...</Typography>
      )}
      {/* edit modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 400,
            maxWidth: 600,
          }}
        >
          <Typography id='modal-title' variant='h6' component='h2'>
            Edit Item
          </Typography>
          <TextField label='Title' fullWidth margin='normal' value={editedTitle} onChange={handleTitleChange} />
          <TextField
            label='Body'
            fullWidth
            multiline
            rows={4}
            margin='normal'
            value={editedBody}
            onChange={handleBodyChange}
          />
          <Button variant='contained' color='primary' onClick={handleEdit}>
            Save
          </Button>
          {error && <Typography color='error'>{error}</Typography>}
        </Box>
      </Modal>
      {/* Delete Success Modal */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Success</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Item has been deleted successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccessDialog(false);
              navigate('/');
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ItemView;
