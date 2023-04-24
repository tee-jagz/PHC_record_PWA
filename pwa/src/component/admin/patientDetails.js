import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, Select } from "antd";
import openIndexedDB from "./../../db";

const { Option } = Select;

function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const { patientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    const db = await openIndexedDB();
    const transaction = db.transaction("patients", "readonly");
    const patientStore = transaction.objectStore("patients");
    const request = patientStore.get(Number(patientId));

    request.onsuccess = () => {
      setPatient(request.result);
    };

    request.onerror = () => {
      console.error("Error fetching patient");
    };
  };

  const handleUpdate = async (values) => {
    const db = await openIndexedDB();
    const transaction = db.transaction("patients", "readwrite");
    const patientStore = transaction.objectStore("patients");

    // Add the 'synced' property with a default value of false
    values.synced = false;
    const request = patientStore.put({ ...patient, ...values });

    request.onsuccess = () => {
      navigate("/patientList");
    };

    request.onerror = () => {
      console.error("Error updating patient");
    };
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h1>Patient Details</h1>
      <Form layout="vertical" onFinish={handleUpdate} initialValues={patient}>
        {/* Patient form fields */}
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
        {/* <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select the date of birth!' }]}>
          <DatePicker />
        </Form.Item> */}
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
        <Form.Item label="Blood Group" name="bloodGroup">
          <Input placeholder="Blood Group" />
        </Form.Item>
        <Form.Item label="Genotype" name="genotype">
          <Input placeholder="Genotype" />
        </Form.Item>
        <Form.Item label="Next of Kin" name="nextOfKin">
          <Input placeholder="Next of Kin" />
          </Form.Item>
        <Form.Item label="Facility ID" name="facilityID">
          <Input placeholder="Facility ID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PatientDetails;
