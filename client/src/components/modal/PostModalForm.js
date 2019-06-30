import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../../actions/post';
import { toggleModal } from '../../actions/alert';

const PostModalForm = ({ addPost, toggleModal, alert: { isModalHidden } }) => {
   const [text, setText] = useState('');

   const onSubmit = e => {
      e.preventDefault();

      toggleModal(isModalHidden);
      addPost({ text });
      setText('');
   };
   return (
      <React.Fragment>
         <div class='modal-header'>
            <h5 class='modal-title'>Say Something...</h5>
            <button
               type='button'
               class='close'
               onClick={e => toggleModal(isModalHidden)}
            >
               <span aria-hidden='true'>&times;</span>
            </button>
         </div>
         <form onSubmit={onSubmit}>
            <div className='modal-body'>
               <textarea
                  className='form-control'
                  name='text'
                  col='30'
                  rows='5'
                  placeholder='Create A Post'
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
               />
            </div>
            <div className='modal-footer'>
               <button
                  className='btn btn-secondary'
                  onClick={e => toggleModal(isModalHidden)}
               >
                  Cancel
               </button>
               <button className='btn btn-primary'>Create New Post</button>
            </div>
         </form>
      </React.Fragment>
   );
};

PostModalForm.propTypes = {
   addPost: PropTypes.func.isRequired,
   toggleModal: PropTypes.func.isRequired,
   alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   alert: state.alert
});

export default connect(
   mapStateToProps,
   { addPost, toggleModal }
)(PostModalForm);
