import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
   profile: { profile, loading },
   createProfile,
   getCurrentProfile,
   history
}) => {
   const [formData, setFormData] = useState({
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''
   });

   const [displaySocialInputs, toggleSocialInputs] = useState(false);

   useEffect(() => {
      getCurrentProfile();

      setFormData({
         company: loading || !profile.company ? '' : profile.company,
         website: loading || !profile.website ? '' : profile.website,
         location: loading || !profile.location ? '' : profile.location,
         status: loading || !profile.status ? '' : profile.status,
         skills: loading || !profile.skills ? '' : profile.skills.join(','),
         githubUsername:
            loading || !profile.githubUsername ? '' : profile.githubUsername,
         bio: loading || !profile.bio ? '' : profile.bio,
         twitter: loading || !profile.social ? '' : profile.social.twitter,
         facebook: loading || !profile.social ? '' : profile.social.facebook,
         linkedin: loading || !profile.social ? '' : profile.social.linkedin,
         youtube: loading || !profile.social ? '' : profile.social.youtube,
         instagram: loading || !profile.social ? '' : profile.social.instagram
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [loading, getCurrentProfile]); // When this component loads this effect will run

   const {
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
   } = formData;

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = e => {
      e.preventDefault();

      createProfile(formData, history, true);
   };
   return (
      <form className='col-8 mx-auto' onSubmit={onSubmit}>
         <div className='mb-4'>
            <h1>Edit Your Profile</h1>
            <p className='lead'>
               <i className='fas fa-user mr-2' />
               Let's get some information to make your profile stand out
            </p>
         </div>
         <small className='text-danger'>* = Required Field</small>
         <div className='form-group'>
            <select
               className='form-control'
               name='status'
               value={status}
               onChange={e => onChange(e)}
            >
               <option value='0'>* Select Professional Status</option>
               <option value='Developer'>Developer</option>
               <option value='Junior Developer'>Junior Developer</option>
               <option value='Senior Developer'>Senior Developer</option>
               <option value='Manager'>Manager</option>
               <option value='Student or Learning'>Student or Learning</option>
               <option value='Instructor'>Instructor or Teacher</option>
               <option value='Intern'>Intern</option>
               <option value='Other'>Other</option>
            </select>
            <small className='form-text text-muted'>
               Give us an idea of where you are at in your career
            </small>
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='Company'
               name='company'
               value={company}
               onChange={e => onChange(e)}
            />
            <small className='form-text text-muted'>
               Could be your own company or one you work for
            </small>
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='Website'
               name='website'
               value={website}
               onChange={e => onChange(e)}
            />
            <small className='form-text text-muted'>
               Could be your own or a company website
            </small>
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='Location'
               name='location'
               value={location}
               onChange={e => onChange(e)}
            />
            <small className='form-text text-muted'>
               City & state suggested (eg. Boston, MA)
            </small>
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='* Skills'
               name='skills'
               value={skills}
               onChange={e => onChange(e)}
            />
            <small className='form-text text-muted'>
               Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='Github Username'
               name='githubUsername'
               value={githubUsername}
               onChange={e => onChange(e)}
            />
            <small className='form-text text-muted'>
               If you want your latest repos and a Github link, include your
               username
            </small>
         </div>
         <div className='form-group'>
            <textarea
               className='form-control'
               placeholder='A Short Bio of Yourself'
               name='bio'
               value={bio}
               onChange={e => onChange(e)}
            />
            <small className='form-text text-muted'>
               Tell us a little about yourself
            </small>
         </div>
         <div className='my-2 mb-4'>
            <button
               onClick={() => toggleSocialInputs(!displaySocialInputs)}
               type='button'
               className='btn btn-secondary mr-2'
            >
               Add Social Network Links
            </button>
            <span>Optional</span>
         </div>
         {displaySocialInputs && (
            <React.Fragment>
               <div className='form-group d-flex'>
                  <label className='text-center col-2'>
                     <i className='fab fa-twitter fa-2x' />
                  </label>
                  <input
                     className='form-control col'
                     type='text'
                     placeholder='Twitter URL'
                     name='twitter'
                     value={twitter}
                     onChange={e => onChange(e)}
                  />
               </div>
               <div className='form-group d-flex'>
                  <label className='text-center col-2'>
                     <i className='fab fa-facebook fa-2x' />
                  </label>
                  <input
                     className='form-control col'
                     type='text'
                     placeholder='Facebook URL'
                     name='facebook'
                     value={facebook}
                     onChange={e => onChange(e)}
                  />
               </div>
               <div className='form-group d-flex'>
                  <label className='text-center col-2'>
                     <i className='fab fa-youtube fa-2x' />
                  </label>
                  <input
                     className='form-control col'
                     type='text'
                     placeholder='YouTube URL'
                     name='youtube'
                     value={youtube}
                     onChange={e => onChange(e)}
                  />
               </div>
               <div className='form-group d-flex'>
                  <label className='text-center col-2'>
                     <i className='fab fa-linkedin fa-2x' />
                  </label>
                  <input
                     className='form-control col'
                     type='text'
                     placeholder='Linkedin URL'
                     name='linkedin'
                     value={linkedin}
                     onChange={e => onChange(e)}
                  />
               </div>
               <div className='form-group d-flex'>
                  <label className='text-center col-2'>
                     <i className='fab fa-instagram fa-2x' />
                  </label>
                  <input
                     className='form-control col'
                     type='text'
                     placeholder='Instagram URL'
                     name='instagram'
                     value={instagram}
                     onChange={e => onChange(e)}
                  />
               </div>
            </React.Fragment>
         )}
         <button className='btn btn-primary mr-2'>Submit</button>
         <Link className='btn btn-link my-2' to='/dashboard'>
            Go Back
         </Link>
      </form>
   );
};

EditProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile
});

export default connect(
   mapStateToProps,
   { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
