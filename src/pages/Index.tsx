import { Link } from "react-router-dom";
import PageContainer from "@/components/Layout/PageContainer";
import BalanceCard from "@/components/Wallet/BalanceCard";
import CryptoCard from "@/components/Wallet/CryptoCard";
import TransactionItem from "@/components/Wallet/TransactionItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLine } from "lucide-react";
export default function Index() {
  // Mock data for the dashboard
  const balanceData = {
    total: 12345.67,
    change: 2.34
  };
  const assets = [{
    type: "bitcoin" as const,
    amount: 0.5,
    value: 8750,
    change: 1.2
  }, {
    type: "ethereum" as const,
    amount: 3.2,
    value: 3200,
    change: -0.8
  }, {
    type: "usdc" as const,
    amount: 395.5,
    value: 395.5,
    change: 0
  }];
  const recentTransactions = [{
    id: "tx1",
    type: "deposit" as const,
    amount: 0.1,
    currency: "BTC",
    date: new Date(2025, 4, 3),
    status: "completed" as const,
    address: "bc1q87x90rd79yze9rkj29m8g3r9udttgvw0dkpqe3"
  }, {
    id: "tx2",
    type: "withdraw" as const,
    amount: 0.5,
    currency: "ETH",
    date: new Date(2025, 4, 1),
    status: "pending" as const,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  }, {
    id: "tx3",
    type: "deposit" as const,
    amount: 100,
    currency: "USDC",
    date: new Date(2025, 3, 29),
    status: "completed" as const,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  }];
  return <PageContainer title="Dashboard">
      <div className="flex flex-col gap-6 py-4">
        {/* Welcome message */}
        <div className="px-4">
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="text-muted-foreground">Your virtual assets</p>
        </div>

        {/* Balance card */}
        <div className="px-4">
          <BalanceCard balance={balanceData.total} change={balanceData.change} />
        </div>

        {/* Assets section */}
        <section className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Your Assets</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/assets">View All</Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {assets.map(asset => <CryptoCard key={asset.type} type={asset.type} amount={asset.amount} value={asset.value} change={asset.change} />)}
          </div>
        </section>

        {/* Market trends card */}
        <section className="px-4">
          <Card className="crypto-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ChartLine className="h-5 w-5 mr-2 text-primary" />
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <p className="text-sm text-center text-muted-foreground">
                  Market data will be available here. Check back soon for price charts and market updates!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent transactions */}
        <section className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/activity">View All</Link>
            </Button>
          </div>
          
          <Card>
            {recentTransactions.map(transaction => <TransactionItem key={transaction.id} {...transaction} />)}
          </Card>
        </section>
      </div>
    </PageContainer>;
}