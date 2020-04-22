import { connect } from 'react-redux';
import { register } from '../../../actions/auth';
import Signup from './signup';

const mapStateToProps = ({ auth, error }) => ({
  auth,
  error,
});
export default connect(
  mapStateToProps,
  { register },
)(Signup);
