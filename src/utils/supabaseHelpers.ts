import { supabase } from "@/integrations/supabase/client";

export const fetchTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const fetchWalletBalance = async () => {
  const { data, error } = await supabase
    .from('wallet_balances')
    .select('*')
    .maybeSingle();
  
  if (error) throw error;
  return data?.balance || 0;
};

export const fetchSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .maybeSingle();
  
  if (error) throw error;
  return data || {
    email_notifications: false,
    two_factor_auth: false,
    transaction_notifications: false
  };
};

export const updateSettings = async (settings: {
  email_notifications: boolean;
  two_factor_auth: boolean;
  transaction_notifications: boolean;
}) => {
  const { error } = await supabase
    .from('settings')
    .upsert(settings);
  
  if (error) throw error;
};

export const addTransaction = async (transaction: {
  type: 'deposit' | 'withdrawal';
  amount: number;
  description: string;
  wallet_address: string;
}) => {
  const { error } = await supabase
    .from('transactions')
    .insert(transaction);
  
  if (error) throw error;

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