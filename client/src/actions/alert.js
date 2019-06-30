import { SET_ALERT, REMOVE_ALERT, TOGGLE_MODAL } from './types';
import { toast } from 'react-toastify';

export const setAlert = (msg, alertType) => dispatch => {
   const options = {
      onOpen: () => dispatch({ type: SET_ALERT }),
      onClose: () => dispatch({ type: REMOVE_ALERT })
   };

   if (alertType === 'danger') {
      toast.error(msg, options);
   } else {
      toast.success(msg, options);
   }
};

export const toggleModal = isHidden => dispatch => {
   dispatch({
      type: TOGGLE_MODAL,
      payload: !isHidden
   });
};
