
import React from 'react';
import Navigation from '@/components/molecules/Navigation';
import Footer from '@/components/organisms/Footer';

const AppointmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <div className="container-custom section-padding">
          <h1 className="text-4xl font-bold text-center mb-8">Book Appointment</h1>
          <p className="text-xl text-gray-600 text-center">
            Schedule your consultation with our expert doctors.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
