
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DoctorForm from '@/components/molecules/DoctorForm';

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

const AdminDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
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
        description: 'Failed to fetch doctors',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setShowForm(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setShowForm(true);
  };

  const handleDeleteDoctor = async (doctorId: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoc(doc(db, 'doctors', doctorId));
        await fetchDoctors();
        toast({
          title: 'Success',
          description: 'Doctor deleted successfully'
        });
      } catch (error) {
        console.error('Error deleting doctor:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete doctor',
          variant: 'destructive'
        });
      }
    }
  };

  const handleFormSubmit = async (doctorData: Omit<Doctor, 'id'>) => {
    try {
      if (editingDoctor) {
        await updateDoc(doc(db, 'doctors', editingDoctor.id), doctorData);
        toast({
          title: 'Success',
          description: 'Doctor updated successfully'
        });
      } else {
        await addDoc(collection(db, 'doctors'), doctorData);
        toast({
          title: 'Success',
          description: 'Doctor added successfully'
        });
      }
      setShowForm(false);
      await fetchDoctors();
    } catch (error) {
      console.error('Error saving doctor:', error);
      toast({
        title: 'Error',
        description: 'Failed to save doctor',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Doctors Management</h2>
        <Button onClick={handleAddDoctor}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      {showForm && (
        <DoctorForm
          doctor={editingDoctor}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditDoctor(doctor)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <PencilIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-medical-500 font-medium mb-1">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-3">{doctor.department}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{doctor.experience} years exp.</span>
                  <span>★ {doctor.rating} ({doctor.reviews} reviews)</span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2">{doctor.bio}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No doctors found. Add your first doctor!</p>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;
