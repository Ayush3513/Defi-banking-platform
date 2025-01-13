import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/utils/supabaseHelpers";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export default function History() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
              <p className="text-muted-foreground">View your past transactions</p>
            </div>
            
            <Card className="p-6 bg-gradient-to-r from-gray-50 to-slate-50">
              {isLoading ? (
                <p>Loading transactions...</p>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction: any) => (
                    <div key={transaction.id} className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit'
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}>
                          {transaction.type === 'deposit' ? (
                            <ArrowDownIcon className="h-4 w-4" />
                          ) : (
                            <ArrowUpIcon className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'deposit'
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount} ETH
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ≈ ${(transaction.amount * 2000).toFixed(2)} USD
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}