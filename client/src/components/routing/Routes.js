import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
const Login = lazy(() => import('../auth/Login'));
const Register = lazy(() => import('../auth/Register'));
const Dashboard = lazy(() => import('../dashboard/Dashboard'));
const CreateProfile = lazy(() => import('../profile-forms/CreateProfile'));
const EditProfile = lazy(() => import('../profile-forms/EditProfile'));
const Profile = lazy(() => import('../profile/Profile'));
const Posts = lazy(() => import('../posts/Posts'));
const Post = lazy(() => import('../post/Post'));
const PageNotFound = lazy(() => import('../layout/PageNotFound'));
const AddExperience = lazy(() => import('../profile-forms/AddExperience'));
const AddEducation = lazy(() => import('../profile-forms/AddEducation'));
const Profiles = lazy(() => import('../profiles/Profiles'));

const Routes = () => (
   <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/profiles' component={Profiles} />
      <Route exact path='/profile/:id' component={Profile} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/create-profile' component={CreateProfile} />
      <PrivateRoute exact path='/edit-profile' component={EditProfile} />
      <PrivateRoute exact path='/add-experience' component={AddExperience} />
      <PrivateRoute exact path='/add-education' component={AddEducation} />
      <PrivateRoute exact path='/posts' component={Posts} />
      <PrivateRoute exact path='/posts/:postId' component={Post} />
      <Route path='*' component={PageNotFound} />
   </Switch>
);

Routes.propTypes = {};

export default Routes;
