import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { deleteExperience } from '../../actions/profile';

const Experience = ({ deleteExperience, experience }) => (
   <React.Fragment>
      <h2 className='mb-4'>Experience Credentials</h2>
      {experience.length > 0 ? (
         <table className='table'>
            <thead>
               <tr>
                  <th scope='col'>Company</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Years</th>
                  <th scope='col' />
               </tr>
            </thead>
            <tbody>
               {experience.map(exp => (
                  <tr key={exp._id}>
                     <th scope='row'>{exp.company}</th>
                     <td>{exp.title}</td>
                     <td>
                        <Moment format='MM/DD/YYYY'>
                           {moment.utc(exp.from)}
                        </Moment>{' '}
                        -{' '}
                        {exp.to === null ? (
                           ' Now'
                        ) : (
                           <Moment format='MM/DD/YYYY'>
                              {moment.utc(exp.to)}
                           </Moment>
                        )}
                     </td>
                     <td>
                        <button
                           className='btn btn-danger'
                           onClick={() => deleteExperience(exp._id)}
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      ) : (
         <p>No experience has been recorded...</p>
      )}
   </React.Fragment>
);

Experience.propTypes = {
   experience: PropTypes.array.isRequired,
   deleteExperience: PropTypes.func.isRequired
};

export default connect(
   null,
   { deleteExperience }
)(Experience);
