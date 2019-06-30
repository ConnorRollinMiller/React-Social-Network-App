import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { deleteEducation } from '../../actions/profile';

const Education = ({ deleteEducation, education }) => (
   <React.Fragment>
      <h2 className='mb-4'>Education Credentials</h2>
      {education.length > 0 ? (
         <table className='table'>
            <thead>
               <tr>
                  <th scope='col'>School</th>
                  <th scope='col'>Degree</th>
                  <th scope='col'>Years</th>
                  <th scope='col' />
               </tr>
            </thead>
            <tbody>
               {education.map(edu => (
                  <tr key={edu._id} className='text-capitalize'>
                     <th scope='row'>{edu.school}</th>
                     <td>{edu.degree}</td>
                     <td>
                        <Moment format='MM/DD/YYYY'>
                           {moment.utc(edu.from)}
                        </Moment>{' '}
                        -{' '}
                        {edu.to === null ? (
                           ' Now'
                        ) : (
                           <Moment format='MM/DD/YYYY'>
                              {moment.utc(edu.to)}
                           </Moment>
                        )}
                     </td>
                     <td className='text-right'>
                        <button
                           className='btn btn-danger'
                           onClick={() => deleteEducation(edu._id)}
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      ) : (
         <p>No education has been recorded...</p>
      )}
   </React.Fragment>
);

Education.propTypes = {
   education: PropTypes.array.isRequired,
   deleteEducation: PropTypes.func.isRequired
};

export default connect(
   null,
   { deleteEducation }
)(Education);
