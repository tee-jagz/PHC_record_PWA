import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import openIndexedDB from "./../../db";
import { useAuth} from "./../../useAuth";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const db = await openIndexedDB();
    const transaction = db.transaction("patients", "readonly");
    const patientStore = transaction.objectStore("patients");
    const request = patientStore.getAll();

    request.onsuccess = () => {
      const filteredPatients = request.result.filter(patient => patient.facilityId === user.facilityID);
      setPatients(filteredPatients);
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
