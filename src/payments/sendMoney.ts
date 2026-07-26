import { addTransaction } from "../firebase/services";
import { Transaction } from "../types";

export interface SendMoneyPayload {
  userId: string;
  recipientUpi: string;
  recipientName: string;
  amount: number;
  paymentMethod: string;
  note?: string;
  category?: 'Food & Dining' | 'Travel & Transit' | 'Shopping' | 'Utilities & Bills' | 'Investments' | 'Transfers';
}

export const processSendMoney = async (
  payload: SendMoneyPayload
): Promise<{ success: boolean; transactionId: string; referenceId: string }> => {
  const referenceId = `UPI/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const now = new Date();
  
  const txData: Omit<Transaction, 'id'> = {
    userId: payload.userId,
    title: payload.recipientName || payload.recipientUpi,
    category: payload.category || 'Transfers',
    amount: payload.amount,
    type: 'debit',
    date: 'Today',
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    iconName: 'Send',
    status: 'Success',
    paymentMethod: payload.paymentMethod || 'HDFC Bank ****4092',
    referenceId: referenceId,
    note: payload.note || 'UPI 2.0 Instant Transfer',
    recipientUpi: payload.recipientUpi,
    timestamp: Date.now()
  };

  const id = await addTransaction(txData);
  return {
    success: true,
    transactionId: id,
    referenceId
  };
};
