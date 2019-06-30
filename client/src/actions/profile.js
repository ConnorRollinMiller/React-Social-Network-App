import axios from 'axios';
import { setAlert } from './alert';

import {
   GET_PROFILE,
   PROFILE_ERROR,
   UPDATE_PROFILE,
   CLEAR_PROFILE,
   ACCOUNT_DELETED,
   GET_ALL_PROFILES,
   GET_REPOS
} from './types';

export const getAllProfiles = () => async dispatch => {
   dispatch({ type: CLEAR_PROFILE });
   try {
      const res = await axios.get('/api/profile');

      dispatch({
         type: GET_ALL_PROFILES,
         payload: res.data
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const getProfileByUserId = userId => async dispatch => {
   try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
         type: GET_PROFILE,
         payload: res.data
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const getGithubRepos = githubUsername => async dispatch => {
   try {
      const res = await axios.get(`/api/profile/github/${githubUsername}`);

      dispatch({
         type: GET_REPOS,
         payload: res.data
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const getCurrentProfile = () => async dispatch => {
   try {
      const res = await axios.get('/api/profile/me');

      dispatch({ type: GET_PROFILE, payload: res.data });
   } catch (err) {
      console.log(err.response);
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

// Create Or Update Profile
export const createProfile = (
   formData,
   history,
   edit = false
) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const res = await axios.post('/api/profile', formData, config);

      dispatch({ type: GET_PROFILE, payload: res.data });

      dispatch(
         setAlert(edit ? 'Profile updated.' : 'Profile created.', 'success')
      );

      if (!edit) {
         history.push('/dashboard');
      }
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const addExperience = (formData, history) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const res = await axios.put('/api/profile/experience', formData, config);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert('Experience added.', 'success'));

      history.push('/dashboard');
   } catch (err) {
      const errors = err.response.data.errors;

      console.log(err.response);

      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const addEducation = (formData, history) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const res = await axios.put('/api/profile/education', formData, config);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert('Education added.', 'success'));

      history.push('/dashboard');
   } catch (err) {
      const errors = err.response.data.errors;

      console.log(err.response);

      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};

export const deleteExperience = expId => async dispatch => {
   try {
      const res = await axios.delete(`/api/profile/experience/${expId}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data
      });

      dispatch(setAlert('Experience deleted.', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      dispatch(setAlert(err.response.statusText, 'danger'));
   }
};

export const deleteEducation = eduId => async dispatch => {
   try {
      const res = await axios.delete(`/api/profile/education/${eduId}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data
      });

      dispatch(setAlert('Education deleted.', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });

      dispatch(setAlert(err.response.statusText, 'danger'));
   }
};

export const deleteAccount = () => async dispatch => {
   if (window.confirm('Are you sure? This action can not be undone.')) {
      try {
         await axios.delete(`/api/profile`);

         dispatch({ type: CLEAR_PROFILE });
         dispatch({ type: ACCOUNT_DELETED });

         dispatch(setAlert('Account deleted.', 'success'));
      } catch (err) {
         dispatch({
            type: PROFILE_ERROR,
            payload: {
               msg: err.response.statusText,
               status: err.response.status
            }
         });

         dispatch(setAlert(err.response.statusText, 'danger'));
      }
   }
};
