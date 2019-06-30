import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
   profile: {
      status,
      company,
      location,
      website,
      social,
      user: { name, avatar }
   }
}) => {
   return (
      <div className='jumbotron jumbotron-fluid border text-center my-4 py-4'>
         <img className='rounded-circle mb-4' src={avatar} alt='' />
         <h1 className=''>{name}</h1>
         <p className='lead'>
            {status} {company && <span> at {company}</span>}
         </p>
         <p>{location && <span>{location}</span>}</p>
         <div className='d-flex justify-content-center align-items-center'>
            {website && (
               <a href={website} target='_blank' rel='noopener noreferrer'>
                  <i className='fas fa-globe fa-2x' />
               </a>
            )}
            {social && social.twitter && (
               <a
                  href={social.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <i className='fab fa-twitter fa-2x ml-4' />
               </a>
            )}
            {social && social.facebook && (
               <a
                  href={social.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <i className='fab fa-facebook fa-2x ml-4' />
               </a>
            )}
            {social && social.linkedin && (
               <a
                  href={social.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <i className='fab fa-linkedin fa-2x ml-4' />
               </a>
            )}
            {social && social.youtube && (
               <a
                  href={social.youtube}
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <i className='fab fa-youtube fa-2x ml-4' />
               </a>
            )}
            {social && social.instagram && (
               <a
                  href={social.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <i className='fab fa-instagram fa-2x ml-4' />
               </a>
            )}
         </div>
      </div>
   );
};

ProfileTop.propTypes = {
   profile: PropTypes.object.isRequired
};

export default ProfileTop;
