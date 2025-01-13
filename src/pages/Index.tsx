import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import {
  Wallet,
  ArrowUpDown,
  Users,
  Activity,
} from "lucide-react";

export default function Index() {
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
                value="4.2 ETH"
                icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
                description="+20.1% from last month"
              />
              <StatCard
                title="Total Transactions"
                value="245"
                icon={<ArrowUpDown className="h-4 w-4 text-muted-foreground" />}
                description="Last 30 days"
              />
              <StatCard
                title="Active Loans"
                value="3"
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                description="2 pending approval"
              />
              <StatCard
                title="Connected Users"
                value="12,234"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                description="+180 this week"
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