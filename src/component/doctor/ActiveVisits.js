import React, { useEffect, useState } from "react";
import openIndexedDB from "./../../db";
import { useNavigate } from "react-router-dom";
import DoctorMenu from "./DoctorMenu";
import { Table } from "antd";

const ActiveVisits = () => {
  const [activeVisits, setActiveVisits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = await openIndexedDB();
    const tx = db.transaction(["visits", "patients"], "readonly");
    const visitsStore = tx.objectStore("visits");
    const patientsStore = tx.objectStore("patients");
  
    const visitsIndex = visitsStore.index("status");
    const visitsRequest = visitsIndex.getAll("Active");
  
    visitsRequest.onsuccess = async () => {
      const visitList = visitsRequest.result;
      const activeVisitsWithPatientsPromises = visitList.map((visit) => {
        return new Promise((resolve) => {
          const patientRequest = patientsStore.get(visit.patientId);
          patientRequest.onsuccess = () => {
            const patient = patientRequest.result;
            resolve({ visit, patient });
          };
        });
      });
  
      const activeVisitsWithPatients = await Promise.all(activeVisitsWithPatientsPromises);
      await tx.done;
      setActiveVisits(activeVisitsWithPatients);
    };
  };

  const handleVisitSelect = (visitId) => {
    navigate(`/doctor_dashboard/${visitId}`);
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
  ];

  const data = activeVisits.map(({ visit, patient }) => ({
    key: visit.visitId,
    patientName: `${patient.firstName} ${patient.lastName}`,
    appointmentDate: visit.appointmentDate,
    appointmentTime: visit.appointmentTime,
    reason: visit.reason,
  }));

  return (
    <div>
      <DoctorMenu />
      <h2>Active Visits</h2>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => {
          return {
            onClick: () => {
              handleVisitSelect(record.key);
            },
          };
        }}
      />
    </div>
  );
};

export default ActiveVisits;