
import React from 'react';
import Navigation from '@/components/molecules/Navigation';
import HeroSection from '@/components/organisms/HeroSection';
import DepartmentsSection from '@/components/organisms/DepartmentsSection';
import Footer from '@/components/organisms/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <DepartmentsSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
