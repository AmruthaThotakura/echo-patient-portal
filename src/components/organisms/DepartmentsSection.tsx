
import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  BrainIcon, 
  EyeIcon, 
  BoneIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Card from '../atoms/Card';

const DepartmentsSection: React.FC = () => {
  const departments = [
    {
      id: 1,
      name: 'Cardiology',
      description: 'Comprehensive heart care with advanced cardiac procedures',
      icon: HeartIcon,
      color: 'from-red-500 to-pink-500',
      patients: '5000+',
      specialists: '15'
    },
    {
      id: 2,
      name: 'Neurology',
      description: 'Expert neurological care for brain and nervous system',
      icon: BrainIcon,
      color: 'from-purple-500 to-indigo-500',
      patients: '3500+',
      specialists: '12'
    },
    {
      id: 3,
      name: 'Ophthalmology',
      description: 'Complete eye care services with latest technology',
      icon: EyeIcon,
      color: 'from-blue-500 to-cyan-500',
      patients: '4200+',
      specialists: '8'
    },
    {
      id: 4,
      name: 'Orthopedics',
      description: 'Advanced bone and joint treatments and surgeries',
      icon: BoneIcon,
      color: 'from-green-500 to-emerald-500',
      patients: '6000+',
      specialists: '20'
    },
    {
      id: 5,
      name: 'Dermatology',
      description: 'Comprehensive skin care and cosmetic treatments',
      icon: SparklesIcon,
      color: 'from-yellow-500 to-orange-500',
      patients: '2800+',
      specialists: '6'
    },
    {
      id: 6,
      name: 'Pediatrics',
      description: 'Specialized healthcare for infants, children and teens',
      icon: UserGroupIcon,
      color: 'from-teal-500 to-green-500',
      patients: '4500+',
      specialists: '18'
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Medical <span className="text-gradient">Departments</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive healthcare services across multiple specialties 
            with experienced doctors and advanced medical technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full p-8 group cursor-pointer">
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <dept.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-medical-600 transition-colors">
                    {dept.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-medical-500">{dept.patients}</div>
                      <div className="text-sm text-gray-500">Patients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-medical-500">{dept.specialists}</div>
                      <div className="text-sm text-gray-500">Specialists</div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-medical-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
