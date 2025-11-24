import { create } from 'zustand';

interface User {
  name: string;
  phone: string;
  email?: string;
  age: number;
  bloodGroup: string;
  gender: string;
  photo?: string;
}

interface AppStore {
  // Auth state
  isAuthenticated: boolean;
  user: User | null;
  
  // Auth actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  
  // Booking state
  currentBooking: {
    pickupLocation?: string;
    destination?: string;
    destinationType?: 'hospital' | 'nearest' | 'custom';
    selectedHospital?: string;
    ambulanceType?: string;
    patientCondition?: Record<string, string | number>;
    paymentMethod?: string;
  } | null;
  
  // Booking actions
  updateBooking: (updates: Partial<AppStore['currentBooking']>) => void;
  clearBooking: () => void;
  confirmBooking: () => void;
}

const useAppStore = create<AppStore>((set) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  currentBooking: null,
  
  // Auth actions
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null, currentBooking: null }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  
  // Booking actions
  updateBooking: (updates) => set((state) => ({
    currentBooking: state.currentBooking ? { ...state.currentBooking, ...updates } : { ...updates }
  })),
  clearBooking: () => set({ currentBooking: null }),
  confirmBooking: () => {
    // Mock booking confirmation
    console.log('Booking confirmed!');
    set({ currentBooking: null });
  }
}));

export default useAppStore;
