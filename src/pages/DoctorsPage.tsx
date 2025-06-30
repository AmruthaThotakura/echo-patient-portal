
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navigation from '@/components/molecules/Navigation';
import Footer from '@/components/organisms/Footer';
import DoctorCard from '@/components/molecules/DoctorCard';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: number;
  image: string;
  bio: string;
  education: string;
  email: string;
  phone: string;
  rating: number;
  reviews: number;
}

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'doctors'));
      const doctorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Doctor[];
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load doctors',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const departments = [...new Set(doctors.map(doctor => doctor.department))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleBookAppointment = (doctor: Doctor) => {
    // Navigate to appointment booking with doctor pre-selected
    window.location.href = `/appointments?doctor=${doctor.id}`;
  };

  const handleViewProfile = (doctor: Doctor) => {
    // Show detailed doctor profile modal or navigate to profile page
    toast({
      title: 'Doctor Profile',
      description: `Viewing profile for ${doctor.name}`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20">
          <div className="container-custom section-padding">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <div className="container-custom section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Expert Doctors
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Meet our team of experienced and caring medical professionals dedicated to your health and well-being.
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex-1">
              <Input
                placeholder="Search doctors by name, specialty, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(department => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <DoctorCard
                    doctor={doctor}
                    onViewProfile={() => handleViewProfile(doctor)}
                    onBookAppointment={() => handleBookAppointment(doctor)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Doctors Found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedDepartment !== 'all' 
                    ? 'No doctors match your search criteria. Try adjusting your filters.'
                    : 'No doctors are currently available. Please check back later.'}
                </p>
              </div>
            </motion.div>
          )}

          {/* Stats Section */}
          {doctors.length > 0 && (
            <motion.div 
              className="mt-16 bg-medical-50 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-medical-600 mb-2">{doctors.length}</div>
                  <div className="text-gray-600">Expert Doctors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-medical-600 mb-2">{departments.length}</div>
                  <div className="text-gray-600">Departments</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-medical-600 mb-2">
                    {Math.round(doctors.reduce((acc, doc) => acc + doc.experience, 0) / doctors.length)}
                  </div>
                  <div className="text-gray-600">Avg. Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-medical-600 mb-2">
                    {(doctors.reduce((acc, doc) => acc + doc.rating, 0) / doctors.length).toFixed(1)}
                  </div>
                  <div className="text-gray-600">Avg. Rating</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorsPage;
