
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navigation from '@/components/molecules/Navigation';
import Footer from '@/components/organisms/Footer';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
}

interface Service {
  id: string;
  name: string;
  department: string;
  price: number;
  duration: string;
}

const AppointmentsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorId: '',
    serviceId: '',
    department: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
    
    // Check for pre-selected doctor or service from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('doctor');
    const serviceId = urlParams.get('service');
    
    if (doctorId) {
      setFormData(prev => ({ ...prev, doctorId }));
    }
    if (serviceId) {
      setFormData(prev => ({ ...prev, serviceId }));
    }
  }, []);

  const fetchData = async () => {
    try {
      // Fetch doctors
      const doctorsSnapshot = await getDocs(collection(db, 'doctors'));
      const doctorsData = doctorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Doctor[];
      setDoctors(doctorsData);

      // Fetch services
      const servicesSnapshot = await getDocs(collection(db, 'services'));
      const servicesData = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesData.filter(service => service.isActive));
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load appointment data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-update department when doctor is selected
    if (name === 'doctorId') {
      const selectedDoctor = doctors.find(doc => doc.id === value);
      if (selectedDoctor) {
        setFormData(prev => ({
          ...prev,
          department: selectedDoctor.department
        }));
      }
    }

    // Auto-update department when service is selected
    if (name === 'serviceId') {
      const selectedService = services.find(service => service.id === value);
      if (selectedService) {
        setFormData(prev => ({
          ...prev,
          department: selectedService.department
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const selectedDoctor = doctors.find(doc => doc.id === formData.doctorId);
      const selectedService = services.find(service => service.id === formData.serviceId);

      const appointmentData = {
        ...formData,
        doctorName: selectedDoctor?.name || '',
        serviceName: selectedService?.name || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'appointments'), appointmentData);

      toast({
        title: 'Success',
        description: 'Appointment request submitted successfully! We will contact you soon to confirm.'
      });

      // Reset form
      setFormData({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        doctorId: '',
        serviceId: '',
        department: '',
        date: '',
        time: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit appointment request. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
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
              Book an Appointment
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Schedule your visit with our expert medical professionals. We're here to provide you with the best care possible.
            </motion.p>
          </div>

          {/* Appointment Form */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Full Name *</Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientPhone">Phone Number *</Label>
                      <Input
                        id="patientPhone"
                        name="patientPhone"
                        type="tel"
                        value={formData.patientPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="patientEmail">Email Address *</Label>
                    <Input
                      id="patientEmail"
                      name="patientEmail"
                      type="email"
                      value={formData.patientEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="doctorId">Select Doctor</Label>
                      <select
                        id="doctorId"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                      >
                        <option value="">Choose a doctor</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="serviceId">Select Service (Optional)</Label>
                      <select
                        id="serviceId"
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                      >
                        <option value="">Choose a service</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - ${service.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Preferred Time *</Label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                        required
                      >
                        <option value="">Choose time</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                      placeholder="Please describe your symptoms or reason for visit..."
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Book Appointment'}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="mt-12 bg-medical-50 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              For urgent appointments or assistance, please contact us directly.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-medical-500">📞</span>
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-medical-500">✉️</span>
                <span className="font-medium">appointments@healthcare.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
