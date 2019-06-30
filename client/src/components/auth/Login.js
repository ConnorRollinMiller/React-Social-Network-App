import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/auth';

const Login = ({ loginUser, isAuthenticated }) => {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });

   const { email, password } = formData;

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = e => {
      e.preventDefault();

      loginUser({ email, password });
   };

   if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
   }

   return (
      <form className='col-8 mx-auto' onSubmit={onSubmit}>
         <h1 className='text-capitalize'>Sign In</h1>
         <p className='lead'>
            <i className='fas fa-user mr-2' />
            Sign Into Your Account
         </p>
         <div className='form-group'>
            <input
               className='form-control'
               type='email'
               placeholder='Email Address'
               name='email'
               value={email}
               onChange={e => onChange(e)}
               required
            />
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='password'
               placeholder='Password'
               name='password'
               value={password}
               onChange={e => onChange(e)}
               minLength='6'
               required
            />
         </div>
         <button className='btn btn-primary btn-block'>Log In</button>
         <p className='my-2'>
            Don't have an account? <Link to='/register'>Register</Link>
         </p>
      </form>
   );
};

Login.propTypes = {
   loginUser: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

export default connect(
   mapStateToProps,
   { loginUser }
)(Login);
