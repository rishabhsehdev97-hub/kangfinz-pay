export type TabType = 'home' | 'money' | 'ai' | 'insights' | 'profile';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL?: string;
  kycVerified: boolean;
  tier: string;
  upiId: string;
  createdAt?: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  bankName: string;
  accountType: 'Savings' | 'Salary' | 'Current';
  accountNumberLast4: string;
  balance: number;
  isPrimary: boolean;
  autoSwept?: boolean;
}

export interface MoneySnapshotData {
  bankBalance: number;
  cash: number;
  wallet: number;
  investments: number;
  netWorth: number;
  mutualFunds?: number;
  gold?: number;
  loans?: number;
  creditCardDebt?: number;
}

export interface FinancialGoal {
  id: string;
  userId?: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  percentage: number;
  remainingAmount: number;
  targetDate?: string;
  category: string;
}

export interface Transaction {
  id: string;
  userId?: string;
  title: string;
  category: 'Food & Dining' | 'Travel & Transit' | 'Shopping' | 'Utilities & Bills' | 'Investments' | 'Transfers';
  amount: number;
  type: 'debit' | 'credit';
  date: string;
  time: string;
  iconName: string;
  status: 'Success' | 'Pending' | 'Failed';
  paymentMethod: string;
  referenceId: string;
  note?: string;
  recipientUpi?: string;
  timestamp?: number;
}

export interface BillItem {
  id: string;
  userId?: string;
  title: string;
  provider: string;
  accountNo: string;
  amount: number;
  dueDate: string;
  category: 'Electricity' | 'Water' | 'Broadband' | 'Credit Card' | 'Mobile' | 'DTH' | 'Gas Cyl';
  icon: string;
  isPaid?: boolean;
  autoPay?: boolean;
}

export interface Contact {
  id: string;
  userId?: string;
  name: string;
  phone: string;
  upiId: string;
  avatar: string;
  bankName: string;
  isFavourite?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AIInsightItem {
  id: string;
  userId: string;
  tip: string;
  category: string;
  actionable: boolean;
  updatedAt: string;
}

export interface UserPreferences {
  userId: string;
  biometricEnabled: boolean;
  instantAlerts: boolean;
  deviceViewLayout: 'frame' | 'fluid';
  pinCode?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickPrompts?: string[];
  actionLink?: {
    label: string;
    action: string;
  };
}
