import React from 'react';
import openIndexedDB from '../../db';
import { Form, Input, Select, Button, DatePicker } from 'antd';

const { Option } = Select;

const PatientForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const db = await openIndexedDB();
    const tx = db.transaction('patients', 'readwrite');
    const store = tx.objectStore('patients');

    // Add the 'synced' property with a default value of false
    values.dob = values.dob.format("YYYY-MM-DD");
    values.synced = false;
    await store.add(values);
    await tx.complete;
    form.resetFields();
  };

  return (<div className="mainContainer">
  <div className="mainCard">
      <h1>Register Patient</h1>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please input the first name!' }]}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input the last name!' }]}>
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select the gender!' }]}>
          <Select placeholder="Select Gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select the date of birth!' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input the address!' }]}>
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNo" rules={[{ required: true, message: 'Please input the phone number!' }]}>
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Marital Status" name="maritalStatus" rules={[{ required: true, message: 'Please select the marital status!' }]}>
          <Select placeholder="Select Marital Status">
            <Option value="single">Single</Option>
            <Option value="married">Married</Option>
            <Option value="divorced">Divorced</Option>
            <Option value="widowed">Widowed</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Occupation" name="occupation" rules={[{ required: true, message: 'Please input the occupation!' }]}>
          <Input placeholder="Occupation" />
        </Form.Item>
        <Form.Item label="Blood Group" name="bloodGroup" rules={[{ required: true, message: 'Please input the occupation!' }]}>
          <Input placeholder="Blood Group" />
        </Form.Item>
        <Form.Item label="Genotype" name="genotype" rules={[{ required: true, message: 'Please input the occupation!' }]}>
          <Input placeholder="Genotype" />
        </Form.Item>
        <Form.Item label="Next of Kin" name="nextOfKin" rules={[{ required: true, message: 'Please input the occupation!' }]}>
          <Input placeholder="Next of Kin" />
          </Form.Item>
        <Form.Item label="Facility ID" name="facilityID" rules={[{ required: true, message: 'Please input the occupation!' }]}>
          <Input placeholder="Facility ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
    );
  };

export default PatientForm;