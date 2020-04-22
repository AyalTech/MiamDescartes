import { SET_COLLAPSED } from '../constants/actionTypes';

export default function setIsCollapsed(isCollapsed) {
  return {
    type: SET_COLLAPSED,
    isCollapsed,
  };
}
