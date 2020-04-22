import React from 'react';
import Proptypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button, Result } from 'antd';

class LoginSuccess extends React.Component {
  componentDidMount() {
    const { loadUser } = this.props;
    loadUser();
  }

  render() {
    const { auth } = this.props;
    return (
      <>
        {
          (!auth.isAuthenticated || !auth.token || !auth.user) ? (
            <Redirect to="/login" />
          ) : (
            <div className="container">
              <Result
                status="success"
                title={`Bienvenue ${auth.user.user.lastName} ${auth.user.user.firstName} dans le site!`}
                extra={(
                  <Button color="primary">
                    <Link to="/order/">Commander !</Link>
                  </Button>
                )}
              />
            </div>
          )
        }
      </>
    );
  }
}

LoginSuccess.propTypes = {
  auth: Proptypes.shape({
    token: Proptypes.string,
    fetching: Proptypes.bool,
    fetched: Proptypes.bool,
    isLoading: Proptypes.bool,
    isAuthenticated: Proptypes.bool,
    isAdmin: Proptypes.bool,
    user: Proptypes.object,
    msg: Proptypes.shape({
      msg: Proptypes.string,
    }),
  }),
  loadUser: Proptypes.func,
};

LoginSuccess.defaultProps = {
  auth: {},
  loadUser: () => {},
};

export default LoginSuccess;
