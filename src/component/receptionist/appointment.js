import React, { useState } from "react";
import openIndexedDB from "./../../db";
import ReceptionMenu from './reception_menu';

const AddAppointment = () => {
  const [patientId, setPatientId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const db = await openIndexedDB();
    const tx = db.transaction("visits", "readwrite");
    const visitsStore = tx.objectStore("visits");

    const newVisit = {
      patientId: parseInt(patientId),
      appointmentDate,
      appointmentTime,
      reason,
      status,
    };

    visitsStore.add(newVisit);
    await tx.done;

    // Reset the form
    setPatientId("");
    setAppointmentDate("");
    setAppointmentTime("");
    setReason("");
    setStatus("Active");
  };

  return (
    <div>
      <ReceptionMenu />
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientId">Patient ID:</label>
          <input
            type="number"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="appointmentTime">Appointment Time:</label>
          <input
            type="time"
            id="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default AddAppointment;
