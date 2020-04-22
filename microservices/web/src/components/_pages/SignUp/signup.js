import React from 'react';
import { Link } from 'react-router-dom';

import Proptypes from 'prop-types';
import {
  Form, Icon, Input, Button, Alert, Result,
} from 'antd';

import './signup.less';

class NormalsignupForm extends React.Component {
  handleSubmit = (e) => {
    const { form, register } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await register({ ...values });
      }
    });
  };

  render() {
    const { form, auth, error } = this.props;

    return (
      <>
        {
        error.id === 'REGISTER_FAIL' && (
          <div className="signup-error">
            <Alert
              message="Erreur"
              description={error.msg.msg}
              type="error"
              showIcon
            />
          </div>
        )
      }
        <div className="signup-container">
          {
          auth.msg
            ? (
              <Result
                status="success"
                title="Vous êtes bien inscrits, cependant il faut valider votre adresse mail ! "
                extra={(
                  <Button color="primary">
                    <Link to="/login">Se connecter pour commander!</Link>
                  </Button>
              )}
              />
            )
            : (
              <Form onSubmit={this.handleSubmit} className="signup-form">
                <Form.Item>
                  {form.getFieldDecorator('lastName', {
                    rules: [{ required: true, message: 'Veuillez entrer votre nom' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Nom"
                      size="large"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {form.getFieldDecorator('firstName', {
                    rules: [{ required: true, message: 'Veuillez entrer votre prénom!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Prenom"
                      size="large"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {form.getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Veuillez entrer l\'email!' }],
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="email"
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
                  {form.getFieldDecorator('confirmPassword', {
                    rules: [{ required: true, message: 'Veuillez entrer le password de confirmation!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password de confirmation"
                      size="large"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="signup-form-button"
                    size="large"
                  >
                    S'inscrire
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

NormalsignupForm.propTypes = {
  form: Proptypes.objectOf(Proptypes.func),
  register: Proptypes.func,
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

NormalsignupForm.defaultProps = {
  form: {},
  register: () => {},
  auth: {},
  error: {},
};

export default Form.create({ name: 'normal_signup' })(NormalsignupForm);
