import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./component/ProtectedRoute";


import RegisterPage from './component/register/register';
import LoginPage from './component/login/login';  
import PatientForm from './component/admin/patientreg';
import AppointmentPage from './component/admin/appointment';
import DoctorDashboard from './component/doctor/doctor_dashboard';
import ActiveVisits from "./component/doctor/ActiveVisits";
import PatientList from "./component/admin/patientList";
import PatientDetails from "./component/admin/patientDetails";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" exact element={<RegisterPage />} />
      <Route path="/" exact element={<LoginPage />} />
      

      {/* Admin pages */}
      <Route
        path="/appointment" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AppointmentPage />
          </ProtectedRoute>
        }
      />
      <Route 
      path="/patientreg" 
       element={
       <ProtectedRoute allowedRoles={['admin']}>
       <PatientForm />
       </ProtectedRoute>
       } />
       <Route 
       path="/patientList" 
        element={
        <ProtectedRoute allowedRoles={['admin']}>
        <PatientList />
        </ProtectedRoute>
        } />
      <Route 
      path="/patient-details/:patientId" 
       element={
       <ProtectedRoute allowedRoles={['admin']}>
       <PatientDetails />
       </ProtectedRoute>
       } />

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