import React from 'react';

const Spinner = () => (
   <div className='min-vh-100 d-flex justify-content-center align-items-center'>
      <div className='spinner-border' role='status'>
         <span className='sr-only'>Loading...</span>
      </div>
   </div>
);

export default Spinner;
