import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Help() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Help Center</h2>
              <p className="text-muted-foreground">Find answers to your questions</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search help articles..." />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-sm text-muted-foreground">Learn the basics of using DeFiBank</p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                <h3 className="font-semibold mb-2">Security</h3>
                <p className="text-sm text-muted-foreground">Keep your account safe</p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                <h3 className="font-semibold mb-2">Transactions</h3>
                <p className="text-sm text-muted-foreground">Understanding your transactions</p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50">
                <h3 className="font-semibold mb-2">Account Management</h3>
                <p className="text-sm text-muted-foreground">Manage your DeFiBank account</p>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}