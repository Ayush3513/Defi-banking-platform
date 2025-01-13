import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";

export default function Wallet() {
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
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-semibold mb-2">Total Balance</h3>
                <p className="text-2xl font-bold">4.2 ETH</p>
                <p className="text-sm text-muted-foreground">≈ $8,400 USD</p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                <h3 className="font-semibold mb-2">Staked Amount</h3>
                <p className="text-2xl font-bold">1.5 ETH</p>
                <p className="text-sm text-muted-foreground">≈ $3,000 USD</p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                <h3 className="font-semibold mb-2">Available</h3>
                <p className="text-2xl font-bold">2.7 ETH</p>
                <p className="text-sm text-muted-foreground">≈ $5,400 USD</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}