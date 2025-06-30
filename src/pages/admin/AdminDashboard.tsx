
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/organisms/AdminLayout';
import AdminOverview from './AdminOverview';
import AdminDoctors from './AdminDoctors';
import AdminServices from './AdminServices';
import AdminPatients from './AdminPatients';
import AdminAppointments from './AdminAppointments';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/doctors" element={<AdminDoctors />} />
        <Route path="/services" element={<AdminServices />} />
        <Route path="/patients" element={<AdminPatients />} />
        <Route path="/appointments" element={<AdminAppointments />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
