import { atom, computed, task } from "nanostores";
import { persistentAtom, persistentMap } from "@nanostores/persistent";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  age: number;
  bloodGroup: string;
  gender: string;
  photo?: string;
  medicalHistory?: {
    allergies: string[];
    chronicConditions: string[];
    currentMedications: string[];
  };
  emergencyContacts?: {
    id: string;
    name: string;
    relationship: string;
    phone: string;
  }[];
  isProfileComplete?: boolean;
}

interface Booking {
  id?: string;
  pickupLocation?: string;
  pickupCoordinates?: { lat: number; lng: number };
  destination?: string;
  destinationType?: "hospital" | "nearest" | "custom";
  selectedHospital?: any;
  ambulanceType?: string;
  patientCondition?: Record<string, string | number>;
  paymentMethod?: string;
  estimatedFare?: string;
  estimatedTime?: string;
}

interface AppStore {
  // Auth state
  isAuthenticated: boolean;
  user: User | null;
  hasSeenOnboarding: boolean;

  // Booking state
  currentBooking: Booking | null;
}

export const $user = persistentAtom<AppStore>(
  "user",
  {
    isAuthenticated: false,
    user: null,
    currentBooking: null,
    hasSeenOnboarding: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

// const useAppStore = create<AppStore>()(
//   persist(
//     (set) => ({
//       // Initial state
//       isAuthenticated: false,
//       user: null,
//       currentBooking: null,
//       hasSeenOnboarding: false,

//       // Auth actions
//       login: (user) => set({ isAuthenticated: true, user }),
//       logout: () =>
//         set({ isAuthenticated: false, user: null, currentBooking: null }),
//       updateUser: (updates) =>
//         set((state) => ({
//           user: state.user ? { ...state.user, ...updates } : null,
//         })),
//       setOnboardingSeen: () => set({ hasSeenOnboarding: true }),

//       // Booking actions
//       updateBooking: (updates) =>
//         set((state) => ({
//           currentBooking: state.currentBooking
//             ? { ...state.currentBooking, ...updates }
//             : { ...updates },
//         })),
//       clearBooking: () => set({ currentBooking: null }),
//       confirmBooking: () => {
//         // Mock booking confirmation
//         console.log("Booking confirmed!");
//         set({ currentBooking: null });
//       },
//     }),
//     {
//       name: "jibon-route-storage",
//       partialize: (state) => ({
//         isAuthenticated: state.isAuthenticated,
//         user: state.user,
//         hasSeenOnboarding: state.hasSeenOnboarding,
//       }),
//     }
//   )
// );

export default function () {}
