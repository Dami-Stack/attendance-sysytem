import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AttendanceRecords from './pages/AttendanceRecords';
import QRCheckIn from './pages/QRCheckIn';
function PrivateRoute({
  children,
  allowedRoles
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const {
    user
  } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
function AppRoutes() {
  const {
    user
  } = useAuth();
  return <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<PrivateRoute allowedRoles={['student', 'admin']}>
            <DashboardLayout />
          </PrivateRoute>}>
        <Route index element={user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />} />
        <Route path="attendance" element={<AttendanceRecords />} />
        <Route path="qr-checkin" element={<PrivateRoute allowedRoles={['student']}>
              <QRCheckIn />
            </PrivateRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>;
}
export default function App({
  'data-id': dataId
}: {
  'data-id'?: string;
}) {
  return <div data-id={dataId} className="min-h-screen bg-gray-50">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>;
}