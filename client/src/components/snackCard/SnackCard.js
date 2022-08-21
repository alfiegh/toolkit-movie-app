import React from 'react';
import './SnackCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { deleteSnackRequest } from '../../features/snacks/snackSlice';
import { toast } from 'react-toastify';

const SnackCard = (props) => {
  const dispatch = useDispatch();

  const notify = (msg) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleDelete = (id) => {
    console.log('delete clicked! ');
    console.log(id);
    dispatch(deleteSnackRequest(id));
    // props.dispatch(deleteSnackRequest(id));
  };

  const handleSnackEdit = () => {
    console.log('Edit clicked');
    notify('Aha! Try and implement this');
  };

  return (
    <Card
      sx={{ maxWidth: 200, background: '#1a1d29' }}
      className='col-md mt-3 me-4 snackcard  wobble-vertical-on-hover'
    >
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          style={{ color: '#f5f5f5' }}
        >
          {props.title}
        </Typography>
        <Typography
          variant='body'
          color='text.secondary'
          style={{ color: '#f5f5f5' }}
        >
          {props.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleSnackEdit()} size='small'>
          Edit
        </Button>
        <Button size='small' onClick={() => handleDelete(props.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default SnackCard;
