import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import { toggleModal } from '../../actions/alert';

const NavBar = ({
   auth: { isAuthenticated, loading },
   alert: { isModalHidden },
   logout,
   toggleModal
}) => {
   const authLinks = (
      <ul className='navbar-nav ml-auto'>
         <li className='navbar-item'>
            <button
               className='btn nav-link mr-2'
               onClick={e => toggleModal(isModalHidden)}
            >
               <i className='fas fa-plus' />
            </button>
         </li>
         <li className='navbar-item mr-2'>
            <NavLink
               to='/profiles'
               activeClassName='text-white'
               className='nav-link d-flex align-items-center'
            >
               <i className='fas fa-user mr-2' />
               Developers
            </NavLink>
         </li>
         <li className='navbar-item'>
            <NavLink
               to='/posts'
               activeClassName='text-white'
               className='nav-link d-flex align-items-center'
            >
               <i className='fas fa-pen mr-2' />
               Posts
            </NavLink>
         </li>
         <li className='navbar-item'>
            <NavLink
               to='/dashboard'
               activeClassName='text-white'
               className='nav-link d-flex align-items-center'
            >
               <i className='fas fa-tachometer-alt mr-2' />
               <span className='d-sm-none d-md-block'>Dashboard</span>
            </NavLink>
         </li>
         <li className='navbar-item ml-2'>
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
               <i className='fas fa-user mr-2' />
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
   toggleModal: PropTypes.func.isRequired,
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   alert: state.alert
});

export default connect(
   mapStateToProps,
   { logout, toggleModal }
)(NavBar);
