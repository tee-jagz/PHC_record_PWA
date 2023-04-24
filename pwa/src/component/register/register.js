import React, { useState } from "react";
import openIndexedDB from "../../db";
import { Form, Input, Button, Select, message } from "antd";


const { Option } = Select;

function RegisterPage({ db }) {
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    form.resetFields();
  };

  const [form] = Form.useForm();

  async function handleRegister(values) {
    setLoading(true);

    const { username, firstName, lastName, email, password, role, facilityID, gender } = values;

    const db = await openIndexedDB();
    const transaction = db.transaction(["staff"], "readwrite");
    const staffStore = transaction.objectStore("staff");

    const staff = {
      username,
      firstName,
      lastName,
      email,
      password,
      role,
      facilityID,
      gender,
      synced: false,
    };

    staffStore.add(staff);
    resetForm();
    setLoading(false);
    message.success("Registration successful");
  }

  return (
    <>
      <h1>Register</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleRegister}
      >
        <Form.Item
        label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 4,
              message: "Password must be at least 4 characters long!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Role">
            <Option value="doctor">Doctor</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label = "Gender"
          name="gender"
          rules={[{
            required: true, message: "Please select your gender!"}]}
          >
            <Select placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
        </Form.Item>
        <Form.Item
        label="Facility ID"
        name="facilityID"
        rules={[{
          required: true,
          message: "Please enter your facility ID!"}]}
          >
            <Input placeholder="Facility ID" />
          </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default RegisterPage;
