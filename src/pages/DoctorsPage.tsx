
import React from 'react';
import Navigation from '@/components/molecules/Navigation';
import Footer from '@/components/organisms/Footer';

const DoctorsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <div className="container-custom section-padding">
          <h1 className="text-4xl font-bold text-center mb-8">Our Doctors</h1>
          <p className="text-xl text-gray-600 text-center">
            Meet our team of experienced and caring medical professionals.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorsPage;
