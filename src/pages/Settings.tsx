import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSettings, updateSettings } from "@/utils/supabaseHelpers";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings
  });

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      });
    },
  });

  const handleToggle = (key: keyof typeof settings) => {
    if (!settings) return;
    
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    
    mutation.mutate(newSettings);
  };

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>
            
            <Card className="p-6 space-y-6 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates about your account</p>
                </div>
                <Switch 
                  checked={settings?.email_notifications}
                  onCheckedChange={() => handleToggle('email_notifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch 
                  checked={settings?.two_factor_auth}
                  onCheckedChange={() => handleToggle('two_factor_auth')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transaction Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified about new transactions</p>
                </div>
                <Switch 
                  checked={settings?.transaction_notifications}
                  onCheckedChange={() => handleToggle('transaction_notifications')}
                />
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}