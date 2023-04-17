import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import openIndexedDB from "./../../db";
import ReceptionMenu from "./reception_menu";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const db = await openIndexedDB();
    const transaction = db.transaction("patients", "readonly");
    const patientStore = transaction.objectStore("patients");
    const request = patientStore.getAll();

    request.onsuccess = () => {
      setPatients(request.result);
    };

    request.onerror = () => {
      console.error("Error fetching patients");
    };
  };

  const columns = [
    // Add all necessary columns for patient details
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    // ...
  ];

  const handleRowClick = (record) => {
    navigate(`/patient-details/${record.patientId}`);
  };

  return (
    <div>
      <ReceptionMenu />
      <h1>Patient List</h1>
      <Table
        dataSource={patients}
        columns={columns}
        rowKey="patientId"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
}

export default PatientList;
