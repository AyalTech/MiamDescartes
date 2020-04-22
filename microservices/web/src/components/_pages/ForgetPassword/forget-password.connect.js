import { connect } from 'react-redux';
import ForgetPassword from './forget-password';
import { forgetPassword } from '../../../actions/auth';

const mapStateToProps = ({ error, auth }) => ({
  error,
  msg: auth.msg,
});

export default connect(
  mapStateToProps,
  { forgetPassword },
)(ForgetPassword);
