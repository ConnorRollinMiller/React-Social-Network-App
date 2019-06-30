import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

import { getProfileByUserId } from '../../actions/profile';

const Profile = ({
   getProfileByUserId,
   profile: { profile, loading },
   auth,
   match
}) => {
   useEffect(() => {
      getProfileByUserId(match.params.id);
   }, [getProfileByUserId, match.params.id]);
   return (
      <React.Fragment>
         {profile === null || loading ? (
            <div className='min-vh-100 d-flex justify-content-center align-items-center'>
               <Spinner />
            </div>
         ) : (
            <React.Fragment>
               <Link className='btn btn-link' to='/profiles'>
                  Back To Profiles
               </Link>
               {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                     <Link className='btn btn-link' to='/edit-profile'>
                        Edit Profile
                     </Link>
                  )}
               <div>
                  <ProfileTop profile={profile} />
                  <ProfileAbout profile={profile} />
                  <div className='d-flex pt-4'>
                     <div className='col p-4 mr-4 border'>
                        <h2 className='mb-4'>Experience</h2>
                        {profile.experience.length > 0 ? (
                           <div className='mb-4'>
                              {profile.experience.map(exp => (
                                 <ProfileExperience
                                    key={exp._id}
                                    experience={exp}
                                 />
                              ))}
                           </div>
                        ) : (
                           <strong className='text-capitalize'>
                              No experience credentials.
                           </strong>
                        )}
                     </div>
                     <div className='col p-4 border'>
                        <h2 className='mb-4'>Education</h2>
                        {profile.education.length > 0 ? (
                           <div className='mb-4'>
                              {profile.education.map(edu => (
                                 <ProfileEducation
                                    key={edu._id}
                                    education={edu}
                                 />
                              ))}
                           </div>
                        ) : (
                           <strong className='text-capitalize'>
                              No education credentials.
                           </strong>
                        )}
                     </div>
                  </div>
                  {profile.githubUsername && (
                     <ProfileGithub username={profile.githubUsername} />
                  )}
               </div>
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

Profile.propTypes = {
   getProfileByUserId: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth
});

export default connect(
   mapStateToProps,
   { getProfileByUserId }
)(Profile);
