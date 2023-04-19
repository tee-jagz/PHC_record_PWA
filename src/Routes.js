import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./component/ProtectedRoute";


import RegisterPage from './component/register/register';
import LoginPage from './component/login/login';  
import PatientForm from './component/receptionist/patientreg';
import AppointmentPage from './component/receptionist/appointment';
import DoctorDashboard from './component/doctor/doctor_dashboard';
import ActiveVisits from "./component/doctor/ActiveVisits";
import PatientList from "./component/receptionist/patientList";
import PatientDetails from "./component/receptionist/patientDetails";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" exact element={<RegisterPage />} />
      <Route path="/" exact element={<LoginPage />} />
      <Route path="/patientreg" exact element={<PatientForm />} />
      <Route path="/appointment" exact element={<AppointmentPage />} />
      {/* <Route path="/active_visits" exact element={<ActiveVisits />} /> */}
      <Route path="/patientList" exact element={<PatientList />} />
      <Route path="/patient-details/:patientId" exact element={<PatientDetails />} />

      {/* Doctors pages */}
      <Route
        path="/doctor_dashboard/:visitId"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/active_visits"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <ActiveVisits />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}