
import React from 'react';
import Navigation from '@/components/molecules/Navigation';
import Footer from '@/components/organisms/Footer';

const DepartmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <div className="container-custom section-padding">
          <h1 className="text-4xl font-bold text-center mb-8">Our Departments</h1>
          <p className="text-xl text-gray-600 text-center">
            Comprehensive healthcare services across all medical specialties.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DepartmentsPage;
