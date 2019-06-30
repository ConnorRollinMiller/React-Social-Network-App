import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
   const authLinks = (
      <ul className='navbar-nav ml-auto'>
         <li className='navbar-item mr-2'>
            <NavLink
               to='/profiles'
               activeClassName='text-white'
               className='nav-link d-flex align-items-center'
            >
               Developers
            </NavLink>
         </li>
         <li className='navbar-item mr-2'>
            <NavLink
               to='/posts'
               activeClassName='text-white'
               className='nav-link d-flex align-items-center'
            >
               Posts
            </NavLink>
         </li>
         <li className='navbar-item mr-2'>
            <NavLink
               to='/dashboard'
               activeClassName='text-white'
               className='nav-link d-flex align-items-center'
            >
               <i className='fas fa-user mr-2' />
               <span className='d-sm-none d-md-block'>Dashboard</span>
            </NavLink>
         </li>
         <li className='navbar-item'>
            <button
               onClick={logout}
               className='d-flex align-items-center btn btn-primary'
            >
               <i className='fas fa-sign-out-alt mr-2' />
               <span className='d-sm-none d-md-block'>Logout</span>
            </button>
         </li>
      </ul>
   );

   const guestLinks = (
      <ul className='navbar-nav ml-auto'>
         <li className='navbar-item'>
            <NavLink
               to='/profiles'
               activeClassName='text-white'
               className='nav-link'
            >
               Developers
            </NavLink>
         </li>
         <li className='navbar-item'>
            <NavLink
               to='/register'
               activeClassName='text-white'
               className='nav-link'
            >
               Register
            </NavLink>
         </li>
         <li className='navbar-item'>
            <NavLink
               to='/login'
               activeClassName='text-white'
               className='nav-link'
            >
               Login
            </NavLink>
         </li>
      </ul>
   );

   return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-white'>
         <NavLink to='/' activeClassName='text-white' className='navbar-brand'>
            <i className='fas fa-code mr-2' />
            Developer Network
         </NavLink>
         {!loading && (
            <React.Fragment>
               {isAuthenticated ? authLinks : guestLinks}
            </React.Fragment>
         )}
      </nav>
   );
};

NavBar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(
   mapStateToProps,
   { logout }
)(NavBar);
