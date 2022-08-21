import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import React from 'react';
// import { useSelector } from 'react-redux';
import './pagination.css';

const ReusablePagination = ({ setCurrentPageNum, currentPage, numOfPages }) => {
  // const { currentPage, numOfPages } = useSelector((store) => store.movies);

  const handleChange = (page) => {
    console.log(page);
    setCurrentPageNum(page.target.textContent);
    window.scroll(0, 0);
  };

  return (
    <div className='pagination_container'>
      <Stack spacing={2}>
        <Typography className='text-center mt-3 page-indicator'>
          Page: {currentPage}
        </Typography>
        <Pagination
          showFirstButton
          showLastButton
          className='dashboard-pagination'
          count={Math.ceil(numOfPages / 80)}
          page={currentPage}
          variant='outlined'
          color='primary'
          size='large'
          onChange={(value) => handleChange(value)}
          sx={{ button: { color: '#f2f4fa' }, div: { color: '#f2f4fa' } }}
        />
      </Stack>
    </div>
  );
};

export default ReusablePagination;
