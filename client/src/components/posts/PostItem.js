import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
   addLike,
   removeLike,
   deletePost,
   auth,
   post: { _id, text, name, avatar, user, likes, comments, date },
   showActions
}) => (
   <div className='d-flex align-items-center border p-4 mb-4'>
      <div className='text-center mr-4'>
         <Link className='' to={`/profile/${user}`}>
            <img className='rounded-circle mb-4' src={avatar} alt='' />
            <h4 className='text-capitalize mb-0'>{name}</h4>
         </Link>
      </div>
      <div className='ml-4'>
         <p>{text}</p>
         <small className='text-muted'>
            Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
         </small>
         {showActions && (
            <div className='d-flex align-items-center mt-2'>
               <button className='btn mr-2' onClick={e => addLike(_id)}>
                  <i className='fas fa-thumbs-up mr-2' />
                  {likes.length > 0 && <span>{likes.length}</span>}
               </button>
               <button className='btn mr-2' onClick={e => removeLike(_id)}>
                  <i className='fas fa-thumbs-down' />
               </button>
               <Link className='btn btn-primary mr-2' to={`/posts/${_id}`}>
                  Discussion{' '}
                  {comments.length > 0 && <span>{comments.length}</span>}
               </Link>
               {!auth.loading && user === auth.user._id && (
                  <button
                     className='btn btn-danger'
                     onClick={e => deletePost(_id)}
                  >
                     Delete Post
                     <i className='fas fa-times ml-2' />
                  </button>
               )}
            </div>
         )}
      </div>
   </div>
);

PostItem.defaultProps = {
   showActions: true
};

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   addLike: PropTypes.func.isRequired,
   removeLike: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(
   mapStateToProps,
   {
      addLike,
      removeLike,
      deletePost
   }
)(PostItem);
