
import PageContainer from "@/components/Layout/PageContainer";
import CryptoCard from "@/components/Wallet/CryptoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AssetsPage() {
  // Mock data for assets
  const assets = [
    {
      type: "bitcoin" as const,
      amount: 0.5,
      value: 8750,
      change: 1.2,
    },
    {
      type: "ethereum" as const,
      amount: 3.2,
      value: 3200,
      change: -0.8,
    },
    {
      type: "usdc" as const,
      amount: 395.5,
      value: 395.5,
      change: 0,
    },
    {
      type: "polygon" as const,
      amount: 145.8,
      value: 210.5,
      change: 2.4,
    },
  ];

  return (
    <PageContainer title="Assets">
      <div className="py-4 space-y-6">
        {/* Search bar */}
        <div className="px-4 relative">
          <Search className="absolute left-7 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search assets..."
            className="pl-10 rounded-xl bg-secondary"
          />
        </div>
        
        {/* Assets list */}
        <div className="px-4">
          <h2 className="text-xl font-bold mb-4">Your Assets</h2>
          
          <div className="space-y-3">
            {assets.map((asset) => (
              <CryptoCard
                key={asset.type}
                type={asset.type}
                amount={asset.amount}
                value={asset.value}
                change={asset.change}
              />
            ))}
          </div>
        </div>
        
        {/* Explore more assets */}
        <div className="px-4">
          <h2 className="text-xl font-bold mb-4">Explore More</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Bitcoin", symbol: "BTC", color: "bg-crypto-orange" },
              { name: "Ethereum", symbol: "ETH", color: "bg-crypto-blue" },
              { name: "Solana", symbol: "SOL", color: "bg-green-500" },
              { name: "Cardano", symbol: "ADA", color: "bg-blue-700" },
            ].map((coin) => (
              <Button
                key={coin.symbol}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-1"
              >
                <div className={`${coin.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-1`}>
                  {coin.symbol.substring(0, 1)}
                </div>
                <span>{coin.name}</span>
                <span className="text-xs text-muted-foreground">{coin.symbol}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button className="w-full">Load More Assets</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
