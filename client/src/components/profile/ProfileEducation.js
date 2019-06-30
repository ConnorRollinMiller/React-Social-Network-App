import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
   education: { school, degree, fieldOfStudy, from, to, description }
}) => (
   <div className='mb-4'>
      <h4 className='text-capitalize'>{school}</h4>
      <p className='mb-0'>
         <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
         {!to ? 'Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
      </p>
      <p className='mb-0'>
         <strong>Degree: </strong>{' '}
         <span className='text-capitalize'>{degree}</span>
      </p>
      <p className='mb-0'>
         <strong>Field of Study: </strong>{' '}
         <span className='text-capitalize'>{fieldOfStudy}</span>
      </p>
      {description && (
         <p>
            <strong>Description: </strong> {description}
         </p>
      )}
   </div>
);

ProfileEducation.propTypes = {
   education: PropTypes.object.isRequired
};

export default ProfileEducation;
