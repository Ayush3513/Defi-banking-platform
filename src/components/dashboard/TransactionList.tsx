import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/utils/supabaseHelpers";

export function TransactionList() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {transactions.map((transaction: any) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full ${
                  transaction.type === "deposit"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {transaction.type === "deposit" ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div
              className={`text-sm font-medium ${
                transaction.type === "deposit"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "deposit" ? "+" : "-"}
              {transaction.amount} ETH
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}