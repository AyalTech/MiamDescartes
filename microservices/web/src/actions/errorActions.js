import { GET_ERRORS, CLEAR_ERRORS } from '../constants/actionTypes';


// CLEAR ERRORS
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => ({
  type: GET_ERRORS,
  payload: { msg, status, id },
});
