import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
   const [formData, setFormData] = useState({
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''
   });

   const [toDateDisabled, toggleDisabled] = useState(false);

   const {
      title,
      company,
      location,
      from,
      current,
      to,
      description
   } = formData;

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = e => {
      e.preventDefault();

      addExperience(formData, history);
   };

   return (
      <form className='col-8 mx-auto' onSubmit={onSubmit}>
         <div className='mb-4'>
            <h1>Add An Experience</h1>
            <p className='lead'>
               <i className='fas fa-code-branch mr-2' />
               Add any developer/programming positions that you have had in the
               past
            </p>
         </div>
         <small className='text-danger font-weight-bold'>
            * = Required Field
         </small>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='* Job Title'
               name='title'
               value={title}
               onChange={e => onChange(e)}
               required
            />
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='* Company'
               name='company'
               value={company}
               onChange={e => onChange(e)}
               required
            />
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
         </div>
         <div className='form-group'>
            <label>Date Started</label>
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
               <label className='form-check-label'>Current Job</label>
            </div>
         </div>
         <div className='form-group'>
            <label>Date Ended</label>
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
               placeholder='Job Description'
               value={description}
               onChange={e => onChange(e)}
            />
         </div>
         <button className='btn btn-primary my-1'>Submit</button>
         <Link className='btn btn-link' to='/dashboard'>
            Go Back
         </Link>
      </form>
   );
};

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired
};

export default connect(
   null,
   { addExperience }
)(withRouter(AddExperience));
