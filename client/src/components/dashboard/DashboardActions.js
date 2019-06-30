import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => (
   <div className='btn-group my-4'>
      <Link to='/edit-profile' className='btn btn-link pl-0'>
         <i className='fas fa-user-circle mr-2' />
         Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-link'>
         <i className='fab fa-black-tie mr-2' />
         Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-link'>
         <i className='fas fa-graduation-cap mr-2' />
         Add Education
      </Link>
   </div>
);

export default DashboardActions;
