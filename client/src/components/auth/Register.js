import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
   });

   const { name, email, password, confirmPassword } = formData;

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = e => {
      e.preventDefault();

      if (password !== confirmPassword) {
         setAlert('Passwords do not match.', 'danger');
      } else {
         registerUser({ name, email, password });
      }
   };

   if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
   }

   return (
      <form className='col-8 mx-auto' onSubmit={onSubmit}>
         <h1 className='text-capitalize'>Sign up</h1>
         <p className='lead'>
            <i className='fas fa-user mr-2' />
            Create Your Account
         </p>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='Name'
               name='name'
               value={name}
               onChange={e => onChange(e)}
            />
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='email'
               placeholder='Email Address'
               name='email'
               value={email}
               onChange={e => onChange(e)}
            />
            <small className='form-text text-muted'>
               This site uses Gravatar so if you want a profile image, use a
               Gravatar email
            </small>
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='password'
               placeholder='Password'
               name='password'
               value={password}
               onChange={e => onChange(e)}
            />
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='password'
               placeholder='Confirm Password'
               name='confirmPassword'
               value={confirmPassword}
               onChange={e => onChange(e)}
            />
         </div>
         <button className='btn btn-primary btn-block'>Register</button>
         <p className='my-2'>
            Already have an account? <Link to='/login'>Sign In</Link>
         </p>
      </form>
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   registerUser: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

export default connect(
   mapStateToProps,
   { setAlert, registerUser }
)(Register);
