import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { useQuery } from "@tanstack/react-query";
import { fetchWalletBalance, fetchTransactions } from "@/utils/supabaseHelpers";
import {
  Wallet,
  ArrowUpDown,
  Users,
  Activity,
} from "lucide-react";

export default function Index() {
  const { data: balance = 0 } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: fetchWalletBalance
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  const totalTransactions = transactions.length;
  const activeLoans = transactions.filter(t => t.type === 'withdrawal').length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Welcome back to your DeFi dashboard
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Balance"
                value={`${balance} ETH`}
                icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
                description={`≈ $${(balance * 2000).toFixed(2)} USD`}
              />
              <StatCard
                title="Total Transactions"
                value={totalTransactions.toString()}
                icon={<ArrowUpDown className="h-4 w-4 text-muted-foreground" />}
                description="All time"
              />
              <StatCard
                title="Active Loans"
                value={activeLoans.toString()}
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                description="Current withdrawals"
              />
              <StatCard
                title="Connected Users"
                value="1"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                description="No authentication yet"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <div className="rounded-xl border bg-card text-card-foreground">
                  <div className="p-6">
                    <h3 className="text-lg font-medium">Balance History</h3>
                    <BalanceChart />
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="rounded-xl border bg-card text-card-foreground">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">
                      Recent Transactions
                    </h3>
                    <TransactionList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}