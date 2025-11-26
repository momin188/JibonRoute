// Mock booking service for development
export interface Ambulance {
  id: string;
  type: "basic" | "ac" | "paramedic" | "icu";
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  features: string[];
  available: boolean;
  eta?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  specializations: string[];
  emergencyAvailable: boolean;
  rating: number;
  bedAvailability?: {
    general: number;
    icu: number;
    ccu: number;
  };
}

export interface Booking {
  id: string;
  userId: string;
  pickupLocation: string;
  pickupCoordinates?: { lat: number; lng: number };
  destination: string;
  destinationType: "hospital" | "nearest" | "custom";
  selectedHospital?: Hospital;
  ambulanceType: string;
  patientCondition: Record<string, string | number>;
  paymentMethod: string;
  estimatedFare: string;
  estimatedTime: string;
  status:
    | "pending"
    | "confirmed"
    | "dispatched"
    | "arrived"
    | "completed"
    | "cancelled";
  driverInfo?: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
  createdAt: Date;
}

const mockAmbulances: Ambulance[] = [
  {
    id: "basic",
    type: "basic",
    name: "Basic Ambulance",
    description: "Standard vehicle with stretcher and basic first aid kit",
    basePrice: 800,
    pricePerKm: 25,
    features: ["Stretcher", "Basic first aid kit", "Oxygen supply"],
    available: true,
    eta: "8-12 min",
  },
  {
    id: "ac",
    type: "ac",
    name: "AC Ambulance",
    description: "Climate-controlled environment for patient comfort",
    basePrice: 1500,
    pricePerKm: 35,
    features: [
      "Air conditioning",
      "Basic medical equipment",
      "First aid supplies",
      "Oxygen cylinder",
    ],
    available: true,
    eta: "10-15 min",
  },
  {
    id: "paramedic",
    type: "paramedic",
    name: "Paramedic Ambulance",
    description: "Equipped with advanced life support equipment",
    basePrice: 2500,
    pricePerKm: 50,
    features: [
      "Trained paramedic",
      "Defibrillator",
      "IV supplies",
      "Emergency medications",
      "Advanced monitoring",
    ],
    available: true,
    eta: "12-18 min",
  },
  {
    id: "icu",
    type: "icu",
    name: "ICU Ambulance",
    description: "Mobile intensive care unit with critical care specialists",
    basePrice: 5000,
    pricePerKm: 80,
    features: [
      "Ventilator",
      "Cardiac monitor",
      "Critical care specialist",
      "Advanced life support",
      "IV pumps",
    ],
    available: true,
    eta: "15-20 min",
  },
];

const mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "Dhaka Medical College Hospital",
    address: "Secretariat Road, Dhaka 1000",
    phone: "+880-2-8626812",
    distance: "2.5 km",
    specializations: [
      "Emergency",
      "Trauma",
      "General Surgery",
      "Internal Medicine",
    ],
    emergencyAvailable: true,
    rating: 4.2,
    bedAvailability: { general: 15, icu: 3, ccu: 2 },
  },
  {
    id: "2",
    name: "Square Hospitals Ltd.",
    address: "18/F Bir Uttam Qazi Nuruzzaman Sarak, Dhaka 1205",
    phone: "+880-2-8159457",
    distance: "3.1 km",
    specializations: ["Cardiology", "Neurology", "Oncology", "Emergency"],
    emergencyAvailable: true,
    rating: 4.7,
    bedAvailability: { general: 8, icu: 5, ccu: 3 },
  },
  {
    id: "3",
    name: "United Hospital Limited",
    address: "Plot 15, Road 71, Gulshan, Dhaka 1212",
    phone: "+880-2-8836000",
    distance: "4.2 km",
    specializations: [
      "Cardiac Surgery",
      "Neurosurgery",
      "Orthopedics",
      "Emergency",
    ],
    emergencyAvailable: true,
    rating: 4.8,
    bedAvailability: { general: 12, icu: 7, ccu: 4 },
  },
  {
    id: "4",
    name: "Apollo Hospitals Dhaka",
    address: "Plot 81, Block E, Bashundhara R/A, Dhaka 1229",
    phone: "+880-2-8401661",
    distance: "5.8 km",
    specializations: ["Multi-specialty", "Emergency", "Critical Care"],
    emergencyAvailable: true,
    rating: 4.6,
    bedAvailability: { general: 20, icu: 8, ccu: 5 },
  },
  {
    id: "5",
    name: "Evercare Hospital Dhaka",
    address: "Plot 81, Block E, Bashundhara, Dhaka 1229",
    phone: "+880-10678-10678",
    distance: "6.2 km",
    specializations: ["Cardiology", "Oncology", "Neuroscience", "Emergency"],
    emergencyAvailable: true,
    rating: 4.7,
    bedAvailability: { general: 18, icu: 6, ccu: 4 },
  },
];

const mockBookings: Booking[] = [];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockBookingService = {
  async getAmbulances(): Promise<Ambulance[]> {
    await delay(500);
    return [...mockAmbulances];
  },

  async getHospitals(params?: {
    distance?: number;
    specialization?: string;
  }): Promise<Hospital[]> {
    await delay(500);
    let filtered = [...mockHospitals];

    if (params?.specialization) {
      filtered = filtered.filter((h) =>
        h.specializations.some((s) =>
          s.toLowerCase().includes(params.specialization!.toLowerCase())
        )
      );
    }

    // Sort by distance
    filtered.sort((a, b) => {
      const distA = parseFloat(a.distance);
      const distB = parseFloat(b.distance);
      return distA - distB;
    });

    return filtered;
  },

  async getNearestHospital(location: {
    lat: number;
    lng: number;
  }): Promise<Hospital> {
    await delay(300);
    // For mock, return the closest one
    return mockHospitals[0];
  },

  async calculateFare(
    ambulanceType: string,
    distance: number
  ): Promise<{ baseFare: number; total: number; breakdown: string }> {
    await delay(300);

    const ambulance = mockAmbulances.find((a) => a.id === ambulanceType);
    if (!ambulance) {
      throw new Error("Invalid ambulance type");
    }

    const baseFare = ambulance.basePrice;
    const distanceFare = distance * ambulance.pricePerKm;
    const total = baseFare + distanceFare;

    return {
      baseFare,
      total,
      breakdown: `Base: ৳${baseFare} + Distance (${distance}km × ৳${ambulance.pricePerKm}): ৳${distanceFare}`,
    };
  },

  async createBooking(
    bookingData: Omit<Booking, "id" | "createdAt" | "status">
  ): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    await delay(1000);

    const booking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      status: "confirmed",
      createdAt: new Date(),
      driverInfo: {
        name: "Mohammad Rahman",
        phone: "+880-1712-345678",
        vehicleNumber: "DHK-GA-11-2345",
      },
    };

    mockBookings.push(booking);
    localStorage.setItem("mockBookings", JSON.stringify(mockBookings));

    // Simulate status updates
    setTimeout(() => {
      booking.status = "dispatched";
    }, 3000);

    return { success: true, booking };
  },

  async getBookingHistory(userId: string): Promise<Booking[]> {
    await delay(500);
    return mockBookings.filter((b) => b.userId === userId);
  },

  async cancelBooking(
    bookingId: string
  ): Promise<{ success: boolean; error?: string }> {
    await delay(500);

    const booking = mockBookings.find((b) => b.id === bookingId);
    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    booking.status = "cancelled";
    localStorage.setItem("mockBookings", JSON.stringify(mockBookings));

    return { success: true };
  },

  async getActiveBooking(userId: string): Promise<Booking | null> {
    await delay(300);

    const activeBooking = mockBookings.find(
      (b) =>
        b.userId === userId &&
        ["confirmed", "dispatched", "arrived"].includes(b.status)
    );

    return activeBooking || null;
  },
};

// Initialize from localStorage
const storedBookings = localStorage.getItem("mockBookings");
if (storedBookings) {
  try {
    const parsed = JSON.parse(storedBookings);
    mockBookings.push(...parsed);
  } catch (e) {
    console.error("Failed to parse stored bookings", e);
  }
}
