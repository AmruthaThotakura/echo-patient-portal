
import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/solid';
import Button from '../atoms/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Modern Hospital"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-900/90 via-medical-800/70 to-transparent"></div>
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <PhoneIcon className="h-8 w-8 text-white" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 right-32 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <CalendarIcon className="h-6 w-6 text-white" />
        </motion.div>
      </div>

      <div className="relative container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Health,
              <span className="block text-gradient bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Priority
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience world-class healthcare with our team of expert doctors 
              and state-of-the-art medical facilities.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" className="bg-white text-medical-600 hover:bg-gray-100">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-medical-600"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Watch Video
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-gray-300 text-sm">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-gray-300 text-sm">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-gray-300 text-sm">Departments</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Medical Team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
