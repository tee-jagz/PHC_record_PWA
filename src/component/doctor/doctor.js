import React, { useEffect, useState } from "react";
import openIndexedDB from "./../../db";

const ActiveVisits = () => {
  const [activeVisits, setActiveVisits] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <div>
      <h2>Active Visits</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {activeVisits.map(({ visit, patient }) => (
            <tr key={visit.visitId}>
              <td>{`${patient.firstName} ${patient.lastName}`}</td>
              <td>{visit.appointmentDate}</td>
              <td>{visit.appointmentTime}</td>
              <td>{visit.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveVisits;