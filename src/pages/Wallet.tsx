import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWalletBalance, addTransaction } from "@/utils/supabaseHelpers";
import { useToast } from "@/components/ui/use-toast";

export default function Wallet() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: balance = 0, isLoading } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: fetchWalletBalance
  });

  const mutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] });
      toast({
        title: "Transaction successful",
        description: "Your wallet has been updated.",
      });
      setAmount("");
      setAddress("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to process transaction.",
        variant: "destructive",
      });
    },
  });

  const handleTransaction = (type: 'deposit' | 'withdrawal') => {
    if (!amount || !address) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate({
      type,
      amount: parseFloat(amount),
      description: `${type} to/from ${address}`,
      wallet_address: address,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
              <p className="text-muted-foreground">Manage your crypto assets</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
                <h3 className="font-semibold mb-2">Total Balance</h3>
                <p className="text-2xl font-bold">{isLoading ? "Loading..." : `${balance} ETH`}</p>
                <p className="text-sm text-muted-foreground">≈ ${(balance * 2000).toFixed(2)} USD</p>
              </Card>
              
              <Card className="p-6 col-span-2">
                <h3 className="font-semibold mb-4">New Transaction</h3>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Amount (ETH)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Input
                    placeholder="Wallet Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => handleTransaction('deposit')}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      Deposit
                    </Button>
                    <Button 
                      onClick={() => handleTransaction('withdrawal')}
                      className="flex-1 bg-red-500 hover:bg-red-600"
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}