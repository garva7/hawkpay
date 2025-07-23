import { create } from 'zustand';
import { StudentProfile, Transaction, PaymentFormData } from '@/types';

interface AppState {
  // Student profile
  profile: StudentProfile;
  
  // Transactions
  transactions: Transaction[];
  
  // UI State
  isLoading: boolean;
  
  // Actions
  updateProfile: (profile: Partial<StudentProfile>) => void;
  addTransaction: (transaction: Transaction) => void;
  updateWalletBalance: (amount: number) => void;
  setLoading: (loading: boolean) => void;
  
  // Mock data initialization
  initializeMockData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  profile: {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    walletBalance: 1250.75,
    studentId: 'STU2024001',
    course: 'Computer Science',
    year: 3,
    avatar: '👨‍🎓'
  },
  
  transactions: [],
  isLoading: false,
  
  updateProfile: (profileUpdate) =>
    set((state) => ({
      profile: { ...state.profile, ...profileUpdate }
    })),
    
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions]
    })),
    
  updateWalletBalance: (amount) =>
    set((state) => ({
      profile: {
        ...state.profile,
        walletBalance: state.profile.walletBalance + amount
      }
    })),
    
  setLoading: (loading) => set({ isLoading: loading }),
  
  initializeMockData: () => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        amount: 150.00,
        purpose: 'fees',
        receiver: 'University Bursar',
        status: 'success',
        timestamp: new Date(2024, 0, 15),
        description: 'Semester Registration Fee'
      },
      {
        id: '2',
        amount: 45.99,
        purpose: 'books',
        receiver: 'Campus Bookstore',
        status: 'success',
        timestamp: new Date(2024, 0, 12),
        description: 'Data Structures Textbook'
      },
      {
        id: '3',
        amount: 25.00,
        purpose: 'events',
        receiver: 'Student Union',
        status: 'pending',
        timestamp: new Date(2024, 0, 10),
        description: 'Tech Conference Ticket'
      },
      {
        id: '4',
        amount: 12.50,
        purpose: 'meals',
        receiver: 'Campus Cafeteria',
        status: 'success',
        timestamp: new Date(2024, 0, 8),
        description: 'Lunch Credit'
      }
    ];
    
    set({ transactions: mockTransactions });
  }
}));