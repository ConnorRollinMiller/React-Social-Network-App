import axios from 'axios';
import { setAlert } from './alert';
import {
   GET_POSTS,
   POST_ERROR,
   UPDATE_LIKES,
   DELETE_POST,
   ADD_POST,
   GET_POST,
   ADD_COMMENT,
   DELETE_COMMENT
} from './types';

export const getAllPosts = () => async dispatch => {
   try {
      const res = await axios.get('/api/posts');

      dispatch({
         type: GET_POSTS,
         payload: res.data
      });
   } catch (err) {
      console.error(err.message);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const addLike = postId => async dispatch => {
   try {
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch({
         type: UPDATE_LIKES,
         payload: { postId, likes: res.data }
      });
   } catch (err) {
      console.error(err.response);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      if (err.response.data && err.response.data.msg) {
         dispatch(setAlert(err.response.data.msg, 'danger'));
      }
   }
};

export const removeLike = postId => async dispatch => {
   try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch({
         type: UPDATE_LIKES,
         payload: { postId, likes: res.data }
      });
   } catch (err) {
      console.error(err.response);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      if (err.response.data && err.response.data.msg) {
         dispatch(setAlert(err.response.data.msg, 'danger'));
      }
   }
};

export const deletePost = postId => async dispatch => {
   try {
      await axios.delete(`/api/posts/${postId}`);

      dispatch({
         type: DELETE_POST,
         payload: postId
      });

      dispatch(setAlert('Post removed.', 'danger'));
   } catch (err) {
      console.error(err.response);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      if (err.response.data && err.response.data.msg) {
         dispatch(setAlert(err.response.data.msg, 'danger'));
      }
   }
};

export const addPost = formData => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };

   try {
      const res = await axios.post(`/api/posts/`, formData, config);

      dispatch({
         type: ADD_POST,
         payload: res.data
      });

      dispatch(setAlert('Post created.', 'success'));
   } catch (err) {
      console.error(err.response);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      if (err.response.data && err.response.data.msg) {
         dispatch(setAlert(err.response.data.msg, 'danger'));
      }
   }
};

export const getPost = postId => async dispatch => {
   try {
      const res = await axios.get(`/api/posts/${postId}`);

      dispatch({
         type: GET_POST,
         payload: res.data
      });
   } catch (err) {
      console.error(err.message);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const addComment = (postId, formData) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };

   try {
      const res = await axios.post(
         `/api/posts/comment/${postId}`,
         formData,
         config
      );

      dispatch({
         type: ADD_COMMENT,
         payload: res.data
      });

      dispatch(setAlert('Comment added.', 'success'));
   } catch (err) {
      console.error(err.response);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      if (err.response.data && err.response.data.msg) {
         dispatch(setAlert(err.response.data.msg, 'danger'));
      }
   }
};

export const deleteComment = (postId, commentId) => async dispatch => {
   try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

      dispatch({
         type: DELETE_COMMENT,
         payload: commentId
      });

      dispatch(setAlert('Comment removed.', 'danger'));
   } catch (err) {
      console.error(err.response);
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      if (err.response.data && err.response.data.msg) {
         dispatch(setAlert(err.response.data.msg, 'danger'));
      }
   }
};
