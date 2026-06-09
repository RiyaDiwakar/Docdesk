import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientProfilePage from './pages/PatientProfilePage';
import AddPatientPage from './pages/AddPatientPage';
import AppointmentsPage from './pages/AppointmentsPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/patients"
  element={
    <ProtectedRoute>
      <PatientsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/patients/:id"
  element={
    <ProtectedRoute>
      <PatientProfilePage />
    </ProtectedRoute>
  }
/>
<Route
  path="/patients/add"
  element={
    <ProtectedRoute>
      <AddPatientPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/appointments"
  element={
    <ProtectedRoute>
      <AppointmentsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}
