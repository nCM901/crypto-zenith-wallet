
import { useState } from "react";
import PageContainer from "@/components/Layout/PageContainer";
import TransactionItem from "@/components/Wallet/TransactionItem";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ActivityPage() {
  const [filter, setFilter] = useState<"all" | "deposit" | "withdraw">("all");
  
  // Mock transaction data
  const transactions = [
    {
      id: "tx1",
      type: "deposit" as const,
      amount: 0.1,
      currency: "BTC",
      date: new Date(2025, 4, 3),
      status: "completed" as const,
      address: "bc1q87x90rd79yze9rkj29m8g3r9udttgvw0dkpqe3",
    },
    {
      id: "tx2",
      type: "withdraw" as const,
      amount: 0.5,
      currency: "ETH",
      date: new Date(2025, 4, 1),
      status: "pending" as const,
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    {
      id: "tx3",
      type: "deposit" as const,
      amount: 100,
      currency: "USDC",
      date: new Date(2025, 3, 29),
      status: "completed" as const,
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    {
      id: "tx4",
      type: "withdraw" as const,
      amount: 0.2,
      currency: "BTC",
      date: new Date(2025, 3, 25),
      status: "completed" as const,
      address: "bc1q87x90rd79yze9rkj29m8g3r9udttgvw0dkpqe3",
    },
    {
      id: "tx5",
      type: "deposit" as const,
      amount: 200,
      currency: "USDC",
      date: new Date(2025, 3, 22),
      status: "completed" as const,
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    {
      id: "tx6",
      type: "transfer" as const,
      amount: 1.5,
      currency: "ETH",
      date: new Date(2025, 3, 20),
      status: "failed" as const,
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
  ];

  // Filter transactions based on selected tab
  const filteredTransactions = transactions.filter(tx => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  return (
    <PageContainer title="Activity">
      <div className="py-4">
        <div className="px-4 mb-4">
          <h2 className="text-2xl font-bold">Transaction History</h2>
          <p className="text-muted-foreground">Track all your crypto activity</p>
        </div>
        
        <Tabs defaultValue="all" className="px-4">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1" onClick={() => setFilter("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="deposit" className="flex-1" onClick={() => setFilter("deposit")}>
              Deposits
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex-1" onClick={() => setFilter("withdraw")}>
              Withdrawals
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              {filteredTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  {...transaction}
                />
              ))}
            </Card>
          </TabsContent>
          
          <TabsContent value="deposit" className="mt-0">
            <Card>
              {filteredTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  {...transaction}
                />
              ))}
            </Card>
          </TabsContent>
          
          <TabsContent value="withdraw" className="mt-0">
            <Card>
              {filteredTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  {...transaction}
                />
              ))}
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="px-4 mt-4">
          <Button variant="outline" className="w-full">
            Load More
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
