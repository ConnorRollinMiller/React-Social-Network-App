import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
   experience: { company, title, location, current, to, from, description }
}) => (
   <div className='mb-4'>
      <h4>{company}</h4>
      <p className='mb-0'>
         <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
         {!to ? 'Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
      </p>
      <p className='mb-0'>
         <strong>Position: </strong> {title}
      </p>
      <p>
         <strong>Description: </strong> {description}
      </p>
   </div>
);

ProfileExperience.propTypes = {
   experience: PropTypes.object.isRequired
};

export default ProfileExperience;
