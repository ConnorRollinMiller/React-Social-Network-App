import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
   profile: {
      bio,
      skills,
      user: { name }
   }
}) => (
   <div className='container text-center border p-4 bg-light'>
      {bio && (
         <div>
            <h2 className='text-capitalize mb-2'>
               {name.trim().split(' ')[0]}s Bio
            </h2>
            <p className='mb-0'>{bio}</p>
         </div>
      )}
      <hr />
      <div>
         <h2 className='mb-2'>Skill Set</h2>
         <div className='d-flex justify-content-center'>
            {skills.map((skill, i) => (
               <p className='mx-2 mb-0' key={i}>
                  <i className='fas fa-check mr-2' />
                  {skill}
               </p>
            ))}
         </div>
      </div>
   </div>
);

ProfileAbout.propTypes = {
   profile: PropTypes.object.isRequired
};

export default ProfileAbout;
