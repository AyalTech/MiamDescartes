import { connect } from 'react-redux';
import { loadUser } from '../../../actions/auth';
import LoginSuccess from './login-success';

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(
  mapStateToProps,
  { loadUser },
)(LoginSuccess);
