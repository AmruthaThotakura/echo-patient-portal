
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Patients</h2>
            <p className="text-3xl font-bold text-medical-500">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Appointments</h2>
            <p className="text-3xl font-bold text-medical-500">56</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Doctors</h2>
            <p className="text-3xl font-bold text-medical-500">24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
