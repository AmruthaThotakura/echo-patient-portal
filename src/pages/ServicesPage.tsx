
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navigation from '@/components/molecules/Navigation';
import Footer from '@/components/organisms/Footer';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

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

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
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
      // Only show active services to users
      setServices(servicesData.filter(service => service.isActive));
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to load services',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const departments = [...new Set(services.map(service => service.department))];

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || service.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleBookService = (service: Service) => {
    // Navigate to appointment booking with service pre-selected
    window.location.href = `/appointments?service=${service.id}`;
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
              Our Medical Services
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive healthcare services delivered with advanced technology and compassionate care.
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
                placeholder="Search services by name, description, or department..."
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

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-medical-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ${service.price}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-medical-500 font-medium text-sm mb-1">{service.department}</p>
                        <p className="text-gray-600 text-sm">{service.duration}</p>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 flex-1">{service.description}</p>

                      {service.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {service.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-medical-500 mr-2">•</span>
                                {feature}
                              </li>
                            ))}
                            {service.features.length > 4 && (
                              <li className="text-medical-500 text-xs">
                                +{service.features.length - 4} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      <Button 
                        className="w-full mt-auto"
                        onClick={() => handleBookService(service)}
                      >
                        Book This Service
                      </Button>
                    </div>
                  </Card>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m6 0v-3.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Services Found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedDepartment !== 'all' 
                    ? 'No services match your search criteria. Try adjusting your filters.'
                    : 'No services are currently available. Please check back later.'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
