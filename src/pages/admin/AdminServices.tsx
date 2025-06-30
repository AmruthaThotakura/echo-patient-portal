
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import { useToast } from '@/hooks/use-toast';
import ServiceForm from '@/components/molecules/ServiceForm';

interface Service {
  id: string;
  name: string;
  description: string;
  department: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
  isActive: boolean;
}

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDeleteService = async (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDoc(doc(db, 'services', serviceId));
        await fetchServices();
        toast({
          title: 'Success',
          description: 'Service deleted successfully'
        });
      } catch (error) {
        console.error('Error deleting service:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete service',
          variant: 'destructive'
        });
      }
    }
  };

  const handleFormSubmit = async (serviceData: Omit<Service, 'id'>) => {
    try {
      if (editingService) {
        await updateDoc(doc(db, 'services', editingService.id), serviceData);
        toast({
          title: 'Success',
          description: 'Service updated successfully'
        });
      } else {
        await addDoc(collection(db, 'services'), serviceData);
        toast({
          title: 'Success',
          description: 'Service added successfully'
        });
      }
      setShowForm(false);
      await fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
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
        <h2 className="text-3xl font-bold text-gray-900">Services Management</h2>
        <Button onClick={handleAddService}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <PencilIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </button>
                </div>
                {!service.isActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Inactive
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-medical-500 font-medium mb-1">{service.department}</p>
                <p className="text-gray-600 text-sm mb-3">{service.duration}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-medical-500">${service.price}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                
                {service.features.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                      {service.features.length > 3 && (
                        <li>• +{service.features.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found. Add your first service!</p>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
