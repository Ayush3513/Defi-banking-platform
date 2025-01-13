import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Transaction = Database['public']['Tables']['transactions']['Row'];
type Settings = Database['public']['Tables']['settings']['Row'];
type WalletBalance = Database['public']['Tables']['wallet_balances']['Row'];

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const fetchWalletBalance = async (): Promise<number> => {
  const { data, error } = await supabase
    .from('wallet_balances')
    .select('*')
    .maybeSingle();
  
  if (error) throw error;
  return data?.balance || 0;
};

export const fetchSettings = async (): Promise<Settings> => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .maybeSingle();
  
  if (error) throw error;
  return data || {
    id: '',
    email_notifications: false,
    two_factor_auth: false,
    transaction_notifications: false
  };
};

export const updateSettings = async (settings: Omit<Settings, 'id'>): Promise<void> => {
  const { error } = await supabase
    .from('settings')
    .upsert(settings);
  
  if (error) throw error;
};

export const addTransaction = async (transaction: {
  type: string;
  amount: number;
  description: string;
  wallet_address: string;
}): Promise<void> => {
  const { error: transactionError } = await supabase
    .from('transactions')
    .insert(transaction);
  
  if (transactionError) throw transactionError;

  // Update wallet balance
  const currentBalance = await fetchWalletBalance();
  const newBalance = transaction.type === 'deposit' 
    ? currentBalance + transaction.amount 
    : currentBalance - transaction.amount;

  const { error: balanceError } = await supabase
    .from('wallet_balances')
    .upsert({ balance: newBalance });

  if (balanceError) throw balanceError;
};