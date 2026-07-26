import { getTransactions } from "../firebase/services";
import { Transaction } from "../types";

export interface TransactionFilter {
  category?: string;
  type?: 'debit' | 'credit';
  searchQuery?: string;
}

export const fetchPaymentHistory = async (
  userId: string,
  filter?: TransactionFilter
): Promise<Transaction[]> => {
  let list = await getTransactions(userId);

  if (!filter) return list;

  if (filter.category) {
    list = list.filter(t => t.category === filter.category);
  }

  if (filter.type) {
    list = list.filter(t => t.type === filter.type);
  }

  if (filter.searchQuery) {
    const q = filter.searchQuery.toLowerCase();
    list = list.filter(
      t => t.title.toLowerCase().includes(q) ||
           t.paymentMethod.toLowerCase().includes(q) ||
           t.referenceId.toLowerCase().includes(q)
    );
  }

  return list;
};
