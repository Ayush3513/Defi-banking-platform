import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: string;
  date: string;
  description: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: "+0.234 ETH",
    date: "2024-02-20",
    description: "Deposit from 0x1234...5678",
  },
  {
    id: "2",
    type: "withdrawal",
    amount: "-0.1 ETH",
    date: "2024-02-19",
    description: "Withdrawal to 0x8765...4321",
  },
  // Add more sample transactions as needed
];

export function TransactionList() {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full ${
                  transaction.type === "deposit"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {transaction.type === "deposit" ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
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
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}