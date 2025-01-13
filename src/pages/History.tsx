import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";

export default function History() {
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
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <p className="font-medium">Transfer to Wallet #{i}</p>
                      <p className="text-sm text-muted-foreground">March {i}, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">-0.5 ETH</p>
                      <p className="text-sm text-muted-foreground">≈ $1,000 USD</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}