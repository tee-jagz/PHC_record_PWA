import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import openIndexedDB from "./../../db";
import { Form, Input, Button, Select, message } from "antd";
import "./dash.css";

const { Option } = Select;

function DoctorDashboard() {
  const { visitId } = useParams();
  const [patient, setPatient] = useState(null);
  const [visit, setVisit] = useState(null);

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

  useEffect(() => {
    fetchVisitAndPatientData();
  }, [visitId]);


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
    values.synced = false;
    const updatedPatient = { ...patient, ...values };
    const updatedVisit = { ...visit, ...values };

    updatePatientData(updatedPatient);
    updateVisitData(updatedVisit);
    message.success("Update successful");
  };

  if (!patient || !visit) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <div id="patientInfo">

        <div className="patientCard">
          <h3>Age</h3>
          <h2>{new Date().getFullYear() - parseInt(patient.dob.slice(0, 4))}</h2>
        </div>

        <div className="patientCard">
          <h3>Blood Group</h3>
          <h2>{patient.bloodGroup}</h2>
        </div>
        <div className="patientCard">
          <h3>Genotype</h3>
          <h2>{patient.genotype}</h2>
        </div>
        <div className="patientCard">
          <h3>Gender</h3>
          <h2>{patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</h2>
        </div>
        <div className="patientCard">
          <h3>Patient Name</h3>
          <h2>{patient.firstName} {patient.lastName}</h2>
        </div>

      </div>

      <div className="dashContainer">
    <div className="dashCard">
      <Form layout="vertical" onFinish={handleUpdate} initialValues={{ ...patient, ...visit }}>
        {/* Render patient and visit form fields here */}
        <Form.Item label="Condition ID" name="conditionId">
          <Input />
        </Form.Item>

        <Form.Item label="Reason" name="reason">
          <Input />
        </Form.Item>
        <Form.Item label="Visit Notes" name="visitNotes">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status!" }]}>
          <Select>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
        {/* ... other visit form fields */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
      </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;