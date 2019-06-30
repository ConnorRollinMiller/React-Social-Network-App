import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
   const [text, setText] = useState();

   const onChange = e => {
      setText(e.target.value);
   };

   const onSubmit = e => {
      e.preventDefault();

      addComment(postId, { text });
   };

   return (
      <React.Fragment>
         <h4>Leave A Comment:</h4>
         <form className='mb-4' onSubmit={onSubmit}>
            <div className='form-group'>
               <textarea
                  className='form-control'
                  name='text'
                  col='30'
                  rows='5'
                  placeholder='Post a Comment'
                  value={text}
                  onChange={onChange}
                  required
               />
            </div>
            <button className='btn btn-primary'>Create New Post</button>
         </form>
      </React.Fragment>
   );
};

CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired,
   postId: PropTypes.string.isRequired
};

export default connect(
   null,
   { addComment }
)(CommentForm);
