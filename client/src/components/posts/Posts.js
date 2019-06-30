import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

import { getAllPosts } from '../../actions/post';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
   useEffect(() => {
      getAllPosts();
   }, [getAllPosts]);

   return loading ? (
      <Spinner />
   ) : (
      <React.Fragment>
         <div className='mb-4'>
            <h1>Posts</h1>
            <p className='lead'>
               <i className='fas fa-user mr-2' />
               Welcome to the community
            </p>
         </div>
         <div>
            {posts.map(post => (
               <PostItem key={post._id} post={post} />
            ))}
         </div>
      </React.Fragment>
   );
};

const mapStateToProps = state => ({
   post: state.post
});

Posts.propTypes = {
   getAllPosts: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired
};

export default connect(
   mapStateToProps,
   { getAllPosts }
)(Posts);
