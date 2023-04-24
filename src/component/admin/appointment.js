import React, { useEffect, useState } from "react";
import openIndexedDB from "./../../db";
import { Form, Input, Button, DatePicker, TimePicker, Select } from "antd";
import { useAuth } from "./../../useAuth";

const { Option } = Select;

const AddAppointment = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const handleSubmit = async (values) => {
    const { patientId, newDate, newTime, reason, status } = values;
    
    const db = await openIndexedDB();
    const tx = db.transaction("visits", "readwrite");
    const visitsStore = tx.objectStore("visits");

    const appointmentDate = newDate.format("YYYY-MM-DD");
    const appointmentTime = newTime.format("HH:mm:ss");

    const newVisit = {
      patientId: parseInt(patientId),
      appointmentDate,
      appointmentTime,
      reason,
      status,
      facilityId: 1,
      doctorId: 1,
      synced: false,
    };

    visitsStore.add(newVisit);
    await tx.done;

    // Reset the form
    form.resetFields();
  };

  
  return (
    <div>
      <h2>Add Appointment</h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Patient ID" name="patientId" rules={[{ required: true, message: "Please input the patient ID!" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Appointment Date" name="newDate" rules={[{ required: true, message: "Please select an appointment date!" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Appointment Time" name="newTime" rules={[{ required: true, message: "Please select an appointment time!" }]}>
          <TimePicker />
        </Form.Item>
        <Form.Item label="Reason" name="reason" rules={[{ required: true, message: "Please input the reason!" }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status!" }]}>
          <Select>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Appointment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAppointment;
