import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RegisterPage from './component/register/register';
import LoginPage from './component/login/login';  
import PatientForm from './component/receptionist/patientreg';
import HomePage from './component/home';
import AppointmentPage from './component/receptionist/appointment';
import DoctorPage from './component/doctor/doctor';
import ReceptionPage from './component/receptionist/receptionist';


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/register" exact element={<RegisterPage />} />
      <Route path="/login" exact element={<LoginPage />} />
      <Route path="/patientreg" exact element={<PatientForm />} />
      <Route path="/appointment" exact element={<AppointmentPage />} />
      <Route path="/doctor" exact element={<DoctorPage />} />
      <Route path="/receptionist" exact element={<ReceptionPage />} />
    </Routes>
  );
}