import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import openIndexedDB from "./../../db";
import { Form, Input, Button } from "antd";
import DoctorMenu from "./DoctorMenu";

function DoctorDashboard() {
  const { visitId } = useParams();
  const [patient, setPatient] = useState(null);
  const [visit, setVisit] = useState(null);

  useEffect(() => {
    fetchVisitAndPatientData();
  }, [visitId]);

  const fetchVisitAndPatientData = async () => {
    const db = await openIndexedDB();
    const transaction = db.transaction(["visits", "patients"], "readonly");
    const visitStore = transaction.objectStore("visits");
    const patientStore = transaction.objectStore("patients");
  
    const visitRequest = visitStore.get(Number(visitId));
  
    visitRequest.onsuccess = () => {
      const visitData = visitRequest.result;
      setVisit(visitData);
  
      const patientRequest = patientStore.get(visitData.patientId);
  
      patientRequest.onsuccess = () => {
        setPatient(patientRequest.result);
      };
    };
  };
  

  const updatePatientData = async (patientData) => {
    const db = await openIndexedDB();
    const transaction = db.transaction("patients", "readwrite");
    const patientStore = transaction.objectStore("patients");

    const request = patientStore.put(patientData);

    request.onerror = () => {
      console.error("Error updating patient data");
    };
  };

  const updateVisitData = async (visitData) => {
    const db = await openIndexedDB();
    const transaction = db.transaction("visits", "readwrite");
    const visitStore = transaction.objectStore("visits");

    const request = visitStore.put(visitData);

    request.onerror = () => {
      console.error("Error updating visit data");
    };
  };

  const handleUpdate = (values) => {
    const updatedPatient = { ...patient, ...values };
    const updatedVisit = { ...visit, ...values };

    updatePatientData(updatedPatient);
    updateVisitData(updatedVisit);
  };

  if (!patient || !visit) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DoctorMenu />
      <h1>Doctor Dashboard</h1>
      <Form onFinish={handleUpdate} initialValues={{ ...patient, ...visit }}>
        {/* Render patient and visit form fields here */}
        <h2>Patient Information</h2>
      <Form.Item label="First Name" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input />
      </Form.Item>
      {/* ... other patient form fields */}

      {/* Visit form fields */}
      <h2>Visit Information</h2>
      <Form.Item label="Appointment Date" name="appointmentDate">
        <Input />
      </Form.Item>
      <Form.Item label="Appointment Time" name="appointmentTime">
        <Input />
      </Form.Item>
      {/* ... other visit form fields */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DoctorDashboard;