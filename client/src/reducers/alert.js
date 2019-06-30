import { SET_ALERT, REMOVE_ALERT, TOGGLE_MODAL } from '../actions/types';

const initialState = {
   isModalHidden: true
};

export default (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case TOGGLE_MODAL:
         return {
            ...state,
            isModalHidden: payload
         };
      case SET_ALERT:
         return {
            ...state,
            payload
         };
      case REMOVE_ALERT:
         return {
            ...state
         };
      default:
         return state;
   }
};
