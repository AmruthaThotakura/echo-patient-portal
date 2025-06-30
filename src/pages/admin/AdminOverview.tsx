
import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import {
  UserGroupIcon,
  CalendarIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminOverview: React.FC = () => {
  const stats = [
    {
      name: 'Total Patients',
      value: '1,234',
      icon: UserGroupIcon,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      name: 'Appointments Today',
      value: '56',
      icon: CalendarIcon,
      color: 'from-green-500 to-emerald-500',
      change: '+8%'
    },
    {
      name: 'Active Doctors',
      value: '24',
      icon: HeartIcon,
      color: 'from-purple-500 to-indigo-500',
      change: '+2%'
    },
    {
      name: 'Services',
      value: '18',
      icon: ChartBarIcon,
      color: 'from-orange-500 to-red-500',
      change: '+5%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New patient registered - John Doe</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Appointment scheduled with Dr. Smith</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New doctor added - Dr. Johnson</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Appointments</span>
              <span className="text-sm font-semibold text-orange-600">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Available Doctors</span>
              <span className="text-sm font-semibold text-green-600">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Emergency Cases</span>
              <span className="text-sm font-semibold text-red-600">3</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
