import { SET_COLLAPSED } from '../constants/actionTypes';

const initialState = {
  isCollapsed: false,
};

export default function headerReducer(state = initialState, action) {
  if (action.type === SET_COLLAPSED) {
    return { isCollapsed: action.isCollapsed };
  }
  return state;
}
