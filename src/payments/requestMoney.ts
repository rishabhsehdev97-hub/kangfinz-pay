import { addTransaction } from "../firebase/services";
import { Transaction } from "../types";

export interface RequestMoneyPayload {
  userId: string;
  fromUpiId: string;
  fromName: string;
  amount: number;
  note?: string;
}

export const processRequestMoney = async (
  payload: RequestMoneyPayload
): Promise<{ success: boolean; requestId: string }> => {
  const referenceId = `REQ/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const now = new Date();

  const txData: Omit<Transaction, 'id'> = {
    userId: payload.userId,
    title: `Payment Request to ${payload.fromName || payload.fromUpiId}`,
    category: 'Transfers',
    amount: payload.amount,
    type: 'credit',
    date: 'Today',
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    iconName: 'ArrowDownLeft',
    status: 'Pending',
    paymentMethod: 'Kangfinz UPI Request',
    referenceId,
    note: payload.note || 'Requested via Kangfinz Pay',
    recipientUpi: payload.fromUpiId,
    timestamp: Date.now()
  };

  const id = await addTransaction(txData);
  return {
    success: true,
    requestId: id
  };
};
