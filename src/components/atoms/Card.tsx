
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false, 
  gradient = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -8, transition: { duration: 0.2 } } : {}}
      className={cn(
        'bg-white rounded-2xl shadow-lg border border-gray-100',
        hover && 'hover:shadow-2xl transition-all duration-300',
        gradient && 'bg-gradient-to-br from-white to-blue-50',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
