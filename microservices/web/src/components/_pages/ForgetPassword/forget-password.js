import React from 'react';
import Proptypes from 'prop-types';

import {
  Form, Icon, Input, Button, Alert,
} from 'antd';

import './forget-password.less';

class NormalForgetPasswordForm extends React.Component {
  handleSubmit = (e) => {
    const { form, forgetPassword } = this.props;

    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        forgetPassword({ ...values });
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { form, error, msg } = this.props;
    return (
      <>
        {
          error.id === 'FORGET_PASSWORD_FAIL' && (
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
        {
          msg && (
            <div>
              <Alert
                message={msg.msg}
                description="Connectez-vous avec votre nouveau mot de passe !"
                type="success"
                showIcon
              />
            </div>
          )
        }
        <div className="forget-container">
          <Form onSubmit={this.handleSubmit} className="forget-form">
            <Form.Item>
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Veuillez entrer l\'email!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
              <Button type="primary" htmlType="submit" className="forget-form-button" size="large">
              Changer de mot de passe
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

NormalForgetPasswordForm.propTypes = {
  form: Proptypes.objectOf(Proptypes.func),
  forgetPassword: Proptypes.func,
  error: Proptypes.shape({
    msg: Proptypes.object,
    status: Proptypes.number,
    id: Proptypes.string,
  }),
  msg: Proptypes.shape({
    msg: Proptypes.string,
  }),
};

NormalForgetPasswordForm.defaultProps = {
  form: {},
  forgetPassword: () => {},
  error: {},
  msg: {},
};

export default Form.create({ name: 'normal_forget' })(NormalForgetPasswordForm);
