export interface Transaction {
  id: string;
  amount: number;
  purpose: TransactionPurpose;
  receiver: string;
  status: TransactionStatus;
  timestamp: Date;
  riskScore?: number;
  description?: string;
}

export type TransactionPurpose = 
  | 'fees'
  | 'books'
  | 'events'
  | 'meals'
  | 'transport'
  | 'other';

export type TransactionStatus = 
  | 'success'
  | 'failed'
  | 'pending'
  | 'processing';

export interface PaymentFormData {
  purpose: TransactionPurpose;
  amount: number;
  receiver: string;
  description?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  walletBalance: number;
  studentId: string;
  course: string;
  year: number;
}

export interface RiskAssessment {
  score: number;
  factors: string[];
  recommendation: 'proceed' | 'verify' | 'block';
}