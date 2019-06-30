import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
   const [text, setText] = useState('');

   const onSubmit = e => {
      e.preventDefault();

      addPost({ text });
      setText('');
   };
   return (
      <React.Fragment>
         <h3>Say Something...</h3>
         <form className='mb-4' onSubmit={onSubmit}>
            <div className='form-group'>
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
            <button className='btn btn-primary'>Create New Post</button>
         </form>
      </React.Fragment>
   );
};

PostForm.propTypes = {
   addPost: PropTypes.func.isRequired
};

export default connect(
   null,
   { addPost }
)(PostForm);
