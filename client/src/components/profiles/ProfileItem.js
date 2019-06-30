import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
   profile: {
      user: { _id, name, avatar },
      status,
      company,
      location,
      skills
   }
}) => {
   return (
      <div className='card mb-4'>
         <div className='d-flex'>
            <div className='col-4 p-0'>
               <img src={avatar} alt='avatar' className='card-img' />
            </div>
            <div className='col-4 card-header text-center d-flex flex-column justify-content-center'>
               <h2 className='card-title text-capitalize'>{name}</h2>
               <p className='mb-2'>
                  <span className='text-capitalize'>{status}</span>{' '}
                  {company && (
                     <span>
                        at <span className='text-capitalize'>{company}</span>
                     </span>
                  )}
               </p>
               {location && <p className='mb-2 text-capitalize'>{location}</p>}
               <Link className='btn btn-link mb-2' to={`/profile/${_id}`}>
                  View Profile
               </Link>
            </div>
            <div className='col-4 card-body'>
               <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                     <h5>Skills</h5>
                  </li>
                  {skills.slice(0, 5).map((skill, i) => (
                     <li key={i} className='list-group-item text-capitalize'>
                        <i className='fas fa-check mr-2' />
                        {skill}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

ProfileItem.propTypes = {
   profile: PropTypes.object.isRequired
};

export default ProfileItem;
