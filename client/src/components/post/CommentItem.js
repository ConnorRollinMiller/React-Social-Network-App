import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteComment } from '../../actions/post';

const CommentItem = ({
   postId,
   comment: { _id, text, name, avatar, user, date },
   auth,
   deleteComment
}) => (
   <div className='border d-flex align-items-center p-4'>
      <Link className='text-center mr-4' to={`/profile/${user}`}>
         <img className='rounded-circle col-8 mb-4' src={avatar} alt='' />
         <h4 className='text-capitalize mb-0'>{name}</h4>
      </Link>
      <div className='ml-4 d-flex flex-column'>
         <p>{text}</p>
         <small className='text-muted mb-4'>
            Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
         </small>
         {!auth.loading && user === auth.user._id && (
            <button
               className='btn btn-danger d-flex align-items-center'
               onClick={e => deleteComment(postId, _id)}
            >
               Delete Comment
               <i className='fas fa-times ml-2' />
            </button>
         )}
      </div>
   </div>
);

CommentItem.propTypes = {
   deleteComment: PropTypes.func.isRequired,
   comment: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(
   mapStateToProps,
   { deleteComment }
)(CommentItem);
