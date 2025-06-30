
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
  createdAt: string;
}

const AdminPatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'patients'));
      const patientsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Patient[];
      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch patients',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deleteDoc(doc(db, 'patients', patientId));
        await fetchPatients();
        toast({
          title: 'Success',
          description: 'Patient deleted successfully'
        });
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete patient',
          variant: 'destructive'
        });
      }
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

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
        <h2 className="text-3xl font-bold text-gray-900">Patients Management</h2>
        <div className="w-72">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{patient.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>📧 {patient.email}</p>
                        <p>📞 {patient.phone}</p>
                        <p>🎂 {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                        <p>⚧ {patient.gender}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>🏠 {patient.address}</p>
                        <p>🚨 {patient.emergencyContact}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Medical History</h4>
                      <div className="text-sm text-gray-600">
                        {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                          <ul className="space-y-1">
                            {patient.medicalHistory.slice(0, 3).map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                            {patient.medicalHistory.length > 3 && (
                              <li>• +{patient.medicalHistory.length - 3} more</li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-400">No medical history</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Patient ID: {patient.id}</span>
                  <span>Registered: {new Date(patient.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No patients found matching your search.' : 'No patients registered yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminPatients;
