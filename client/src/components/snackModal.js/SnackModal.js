import React from 'react';
import './SnackModal.css';

const SnackModal = (props) => {
  return (
    <div
      className='modal fade'
      id='exampleModal'
      tabIndex={-1}
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              MovieNest Snack Department
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body'>
            <form onSubmit={props.handleSubmit}>
              <div className='snacklist-form'>
                <h5 className='snacklist-form-title'>Add a snack:</h5>
                <label className='mt-2'>Candy</label>
                <input
                  className='form-control mt-1 mb-2'
                  type='text'
                  aria-label='default input example'
                  onChange={props.handleChange}
                  name='title'
                  value={props.snackData.title}
                />
                <label>Category</label>
                <input
                  className='form-control mb-2'
                  type='text'
                  aria-label='default input example'
                  onChange={props.handleChange}
                  name='category'
                  value={props.snackData.category}
                />
                <label>Price</label>
                <input
                  className='form-control'
                  type='text'
                  aria-label='default input example'
                  onChange={props.handleChange}
                  name='price'
                  value={props.snackData.price}
                />

                <button
                  className='mt-2 form-btn add-snack-button'
                  type='submit'
                  data-bs-dismiss='modal'
                  disabled={
                    props.snackData.title.length === 0 ||
                    props.snackData.category.length === 0
                  }
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnackModal;
