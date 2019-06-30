import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
   getCurrentProfile,
   deleteAccount,
   auth: { user },
   profile: { profile, loading }
}) => {
   useEffect(() => {
      getCurrentProfile();
   }, [getCurrentProfile]);

   return loading && profile === null ? (
      <div className='min-vh-100 d-flex justify-content-center align-items-center'>
         <Spinner />
      </div>
   ) : (
      <React.Fragment>
         <h1>Dashboard</h1>
         <p className='lead text-capitalize'>
            <i className='fas fa-user mr-2' />
            Welcome {user && user.name}
         </p>
         {profile !== null ? (
            <React.Fragment>
               <DashboardActions />
               <Experience experience={profile.experience} />
               <Education education={profile.education} />
               <button className='btn btn-danger my-4' onClick={deleteAccount}>
                  <i className='fas fa-user-minus mr-2' />
                  Delete Account
               </button>
            </React.Fragment>
         ) : (
            <React.Fragment>
               <p className='text-danger'>
                  You have not set up a profile, please add some info.
               </p>
               <Link to='/create-profile' className='btn btn-primary'>
                  Create Profile
               </Link>
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   deleteAccount: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   profile: state.profile
});

export default connect(
   mapStateToProps,
   { getCurrentProfile, deleteAccount }
)(Dashboard);
