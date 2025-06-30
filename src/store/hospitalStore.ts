
import { create } from 'zustand';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  image: string;
  bio: string;
  experience: number;
  qualifications: string[];
  availability: {
    day: string;
    slots: string[];
  }[];
  rating: number;
  reviews: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  image: string;
  services: string[];
  doctors: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'consultation' | 'follow-up' | 'emergency';
  notes?: string;
}

interface HospitalState {
  doctors: Doctor[];
  departments: Department[];
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  selectedDepartment: Department | null;
  setDoctors: (doctors: Doctor[]) => void;
  setDepartments: (departments: Department[]) => void;
  setAppointments: (appointments: Appointment[]) => void;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setSelectedDepartment: (department: Department | null) => void;
  addAppointment: (appointment: Appointment) => void;
}

export const useHospitalStore = create<HospitalState>((set) => ({
  doctors: [],
  departments: [],
  appointments: [],
  selectedDoctor: null,
  selectedDepartment: null,
  setDoctors: (doctors) => set({ doctors }),
  setDepartments: (departments) => set({ departments }),
  setAppointments: (appointments) => set({ appointments }),
  setSelectedDoctor: (selectedDoctor) => set({ selectedDoctor }),
  setSelectedDepartment: (selectedDepartment) => set({ selectedDepartment }),
  addAppointment: (appointment) => 
    set((state) => ({ appointments: [...state.appointments, appointment] })),
}));
