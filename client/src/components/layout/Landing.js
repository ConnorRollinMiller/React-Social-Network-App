import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
   if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
   }

   return (
      <section className='landing bg-dark'>
         <div className='d-flex flex-column align-items-center justify-content-center dark-overlay text-white text-center'>
            <h1>Developer Network</h1>
            <p className='lead'>
               Create a developer portfolio, share posts, and get help from
               other developers!
            </p>
            <div className='mt-4'>
               <Link to='/register' className='btn btn-lg btn-secondary mr-2'>
                  Register
               </Link>
               <Link to='/login' className='btn btn-lg btn-primary'>
                  Login
               </Link>
            </div>
         </div>
      </section>
   );
};

Landing.propTypes = {
   isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
