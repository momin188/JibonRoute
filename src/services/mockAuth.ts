// Mock authentication service for development
export interface User {
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

export interface RegisterData {
  phone?: string;
  email?: string;
  password: string;
  registrationType: "phone" | "email" | "social";
}

export interface LoginData {
  identifier: string; // phone or email
  password: string;
}

// Simulated database
const mockUsers: User[] = [];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuthService = {
  async register(
    data: RegisterData
  ): Promise<{ success: boolean; userId?: string; error?: string }> {
    await delay(1000);

    // Check if user already exists
    const existingUser = mockUsers.find(
      (u) => u.phone === data.phone || u.email === data.email
    );

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const userId = `user_${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: "",
      phone: data.phone || "",
      email: data.email,
      age: 0,
      bloodGroup: "",
      gender: "",
      isProfileComplete: false,
    };

    mockUsers.push(newUser);
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

    return { success: true, userId };
  },

  async login(
    data: LoginData
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    await delay(800);

    const user = mockUsers.find(
      (u) => u.phone === data.identifier || u.email === data.identifier
    );

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // In a real app, verify password here
    return { success: true, user };
  },

  async verifyOTP(
    phone: string,
    otp: string
  ): Promise<{ success: boolean; error?: string }> {
    await delay(500);

    // Mock: any 6-digit OTP is valid
    if (otp.length === 6) {
      return { success: true };
    }

    return { success: false, error: "Invalid OTP" };
  },

  async sendOTP(phone: string): Promise<{ success: boolean; error?: string }> {
    await delay(500);
    console.log(`Mock OTP sent to ${phone}: 123456`);
    return { success: true };
  },

  async resetPassword(
    email: string
  ): Promise<{ success: boolean; error?: string }> {
    await delay(800);
    console.log(`Password reset link sent to ${email}`);
    return { success: true };
  },

  async updateProfile(
    userId: string,
    updates: Partial<User>
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    await delay(500);

    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: "User not found" };
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

    return { success: true, user: mockUsers[userIndex] };
  },

  async logout(): Promise<void> {
    await delay(300);
    // Clear any session data
  },

  // Social login
  async socialLogin(
    provider: "google" | "facebook"
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    await delay(1000);

    // Mock social login - create a demo user
    const userId = `user_${provider}_${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: `${provider} User`,
      phone: "",
      email: `${provider}user@example.com`,
      age: 0,
      bloodGroup: "",
      gender: "",
      isProfileComplete: false,
    };

    mockUsers.push(newUser);
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

    return { success: true, user: newUser };
  },
};

// Initialize from localStorage
const storedUsers = localStorage.getItem("mockUsers");
if (storedUsers) {
  try {
    const parsed = JSON.parse(storedUsers);
    mockUsers.push(...parsed);
  } catch (e) {
    console.error("Failed to parse stored users", e);
  }
}
