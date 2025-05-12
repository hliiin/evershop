import React, { useState } from "react";
import "./Login.scss";
import { Button, Form, Input } from "antd";

export default function Login({modes}) {
  const titles = {
    login: "Login",
    register: "Create A New Account",
    forgot: "Enter your email address",
  };
  return (
    <div className="login">
      <div className="login-form">
        {/* <h3>{mode === 'login' ? 'Login' : mode === 'register' ? 'Create A New Account' : 'Enter your email address'}</h3> */}
        <h3>{titles[modes]}</h3>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          {modes === 'register' && (
            <Form.Item
            name="FullName"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          )}
          
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          {modes !== 'forgot' && (
            <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input placeholder="Password" />
          </Form.Item>
          )}
          

          <Form.Item label={null}>
            <Button htmlType="submit">{modes === 'login' ? 'SIGN IN' : modes === 'register' ? 'SIGN UP' : 'RESET PASSWORD'}</Button>
          </Form.Item>
        </Form>
        
          {modes === 'login' && (
            <div  className="tips">
              <a href="register" className="register" >Create an account</a>
              <a href="reset-password">Forgot your password?</a>
            </div>
          )}
          
          {modes === 'register' && (
            <p>Already have an account? <a href="login" style={{color:'#2C6ECB'}}>Login</a></p>
          )}
        
        
      </div>
    </div>
  );
}
