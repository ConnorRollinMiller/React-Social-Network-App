import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
   const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
   });

   const [toDateDisabled, toggleDisabled] = useState(false);

   const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
   } = formData;

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = e => {
      e.preventDefault();
      addEducation(formData, history);
   };

   return (
      <form className='col-8 mx-auto' onSubmit={onSubmit}>
         <div className='mb-4'>
            <h1>Add Your Education</h1>
            <p className='lead'>
               <i className='fas fa-code-branch mr-2' />
               Add any school or bootcamp thatyou have attended
            </p>
         </div>
         <small className='text-danger'>* = Required Field</small>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='* School or Bootcamp'
               name='school'
               value={school}
               onChange={e => onChange(e)}
               required
            />
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='* Degree or Certificate'
               name='degree'
               value={degree}
               onChange={e => onChange(e)}
               required
            />
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='* Field of Study'
               name='fieldOfStudy'
               value={fieldOfStudy}
               onChange={e => onChange(e)}
            />
         </div>
         <div className='form-group'>
            <h4>Start Date</h4>
            <input
               className='form-control'
               type='date'
               name='from'
               value={from}
               onChange={e => onChange(e)}
            />
         </div>
         <div className='form-group'>
            <div className='form-check'>
               <input
                  className='form-check-input'
                  type='checkbox'
                  name='current'
                  checked={current}
                  value={current}
                  onChange={() => {
                     setFormData({ ...formData, current: !current });
                     toggleDisabled(!toDateDisabled);
                  }}
               />{' '}
               <label className='form-check-label'>Current School</label>
            </div>
         </div>
         <div className='form-group'>
            <label>End Date</label>
            <input
               className='form-control'
               type='date'
               name='to'
               value={to}
               onChange={e => onChange(e)}
               disabled={toDateDisabled ? 'disabled' : ''}
            />
         </div>
         <div className='form-group'>
            <textarea
               className='form-control'
               name='description'
               cols='30'
               rows='5'
               placeholder='Program Description'
               value={description}
               onChange={e => onChange(e)}
            />
         </div>
         <button className='btn btn-primary'>Submit</button>
         <Link className='btn btn-link' to='/dashboard'>
            Go Back
         </Link>
      </form>
   );
};

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired
};

export default connect(
   null,
   { addEducation }
)(withRouter(AddEducation));
