
import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Doctor } from '@/store/hospitalStore';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile?: () => void;
  onBookAppointment?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewProfile,
  onBookAppointment,
}) => {
  return (
    <Card hover className="overflow-hidden">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{doctor.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
          <p className="text-medical-500 font-medium">{doctor.specialty}</p>
          <p className="text-gray-600 text-sm">{doctor.department}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>{doctor.experience} years exp.</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>({doctor.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{doctor.bio}</p>

        <div className="space-y-2">
          <Button 
            className="w-full" 
            onClick={onBookAppointment}
          >
            Book Appointment
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onViewProfile}
          >
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
