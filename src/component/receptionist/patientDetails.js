import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import openIndexedDB from "./../../db";
import ReceptionMenu from "./reception_menu";

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
        <ReceptionMenu />
      <h1>Patient Details</h1>
      <Form onFinish={handleUpdate} initialValues={patient}>
        {/* Patient form fields */}
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        {/* ... other patient form fields */}

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
