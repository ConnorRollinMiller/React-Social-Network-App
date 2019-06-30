import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
   const authLinks = (
      <ul className='navbar-nav ml-auto'>
         <li className='navbar-item mr-2'>
            <Link to='/profiles' className='nav-link d-flex align-items-center'>
               Developers
            </Link>
         </li>
         <li className='navbar-item mr-2'>
            <Link to='/posts' className='nav-link d-flex align-items-center'>
               Posts
            </Link>
         </li>
         <li className='navbar-item mr-2'>
            <Link
               to='/dashboard'
               className='nav-link d-flex align-items-center'
            >
               <i className='fas fa-user mr-2' />
               <span className='d-sm-none d-md-block'>Dashboard</span>
            </Link>
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
            <Link to='/profiles' className='nav-link'>
               Developers
            </Link>
         </li>
         <li className='navbar-item'>
            <Link to='/register' className='nav-link'>
               Register
            </Link>
         </li>
         <li className='navbar-item'>
            <Link to='/login' className='nav-link'>
               Login
            </Link>
         </li>
      </ul>
   );

   return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-white'>
         <Link to='/' className='navbar-brand'>
            <i className='fas fa-code mr-2' />
            Developer Network
         </Link>
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
