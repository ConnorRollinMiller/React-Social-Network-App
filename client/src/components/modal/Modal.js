import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Modal = ({ children, alert: { isModalHidden } }) => (
   <div className={`modal fade ${isModalHidden === false ? 'show' : 'hidden'}`}>
      <div className='modal-dialog modal-dialog-centered'>
         <div className='modal-content'>{children}</div>
      </div>
   </div>
);

Modal.propTypes = {
   children: PropTypes.object.isRequired,
   alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   alert: state.alert
});

export default connect(mapStateToProps)(Modal);
