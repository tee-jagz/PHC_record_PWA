import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../useAuth";

const { Title } = Typography;

const LoginForm = () => {
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("user", user);
      if (user.role === "doctor") {
        navigate("/active_visits", { replace: true });
      } else if (user.role === "receptionist") {
        navigate("/appointment", { replace: true });
      }
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      await login(values.username, values.password);
    } catch (err) {
      setError(err.message);
    }
  }; 
  
  return (
    <div>
      <Title>Login</Title>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;