import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Proptypes from 'prop-types';


import {
  Form, Icon, Input, Button, Alert,
} from 'antd';

import './login.less';

class NormalLoginForm extends React.Component {

  handleSubmit = (e) => {
    const { form, login } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await login({ ...values });
      }
    });
  };

  render() {
    const { form, auth, error } = this.props;
    return (
      <>
        {
          error.id === 'LOGIN_FAIL' && (
            <div>
              <Alert
                message="Erreur"
                description={error.msg.msg}
                type="error"
                showIcon
              />
            </div>
          )
        }
        <div className="login-container">
          {
            (auth.token && auth.user && auth.isAuthenticated)
              ? (
                <Redirect to="/login/success" />
              )
              : (
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {form.getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Veuillez entrer l\'email!' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        size="large"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {form.getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Veuillez entrer le password!' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        size="large"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Link className="login-form-forgot" to="/forgetPassword">
                      Mot de passe oubliée
                    </Link>
                    <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                      Se connecter
                    </Button>
                  </Form.Item>
                </Form>
              )
          }
        </div>
      </>
    );
  }
}

NormalLoginForm.propTypes = {
  form: Proptypes.objectOf(Proptypes.func),
  login: Proptypes.func,
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
  error: Proptypes.shape({
    msg: Proptypes.object,
    status: Proptypes.number,
    id: Proptypes.string,
  }),
};

NormalLoginForm.defaultProps = {
  form: {},
  login: () => {},
  auth: {},
  error: {},
};

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
