import { connect } from 'react-redux';

import HeaderPerso from './header';
import setIsCollapsed from '../../../actions/header';

const mapStateToProps = ({ header }) => ({
  isCollapsed: header.isCollapsed,
});

const mapDispatchToProps = (dispatch) => ({
  setIsCollapsed: (isCollapsed) => dispatch(setIsCollapsed(isCollapsed)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderPerso);
