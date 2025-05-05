
import { Bitcoin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CryptoCardProps {
  type: "bitcoin" | "ethereum" | "usdc" | "polygon";
  amount: number;
  value: number;
  change?: number;
  className?: string;
}

export default function CryptoCard({
  type,
  amount,
  value,
  change = 0,
  className,
}: CryptoCardProps) {
  const iconMap = {
    bitcoin: <Bitcoin className="h-6 w-6 text-crypto-orange" />,
    ethereum: (
      <svg className="h-6 w-6 text-crypto-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1.75L5.75 12.25L12 16L18.25 12.25L12 1.75Z" fill="currentColor" />
        <path d="M12 16L5.75 12.25L12 22.25L18.25 12.25L12 16Z" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    usdc: (
      <div className="h-6 w-6 flex items-center justify-center bg-crypto-green text-white rounded-full text-xs font-bold">
        US
      </div>
    ),
    polygon: (
      <div className="h-6 w-6 flex items-center justify-center bg-crypto-purple text-white rounded-full text-xs font-bold">
        M
      </div>
    ),
  };

  const nameMap = {
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    usdc: "USD Coin",
    polygon: "Polygon",
  };

  const symbolMap = {
    bitcoin: "BTC",
    ethereum: "ETH",
    usdc: "USDC",
    polygon: "MATIC",
  };

  return (
    <Card className={cn("crypto-card flex items-center p-4", className)}>
      <div className="mr-3">{iconMap[type]}</div>
      
      <div className="flex-1">
        <h3 className="font-medium">
          {nameMap[type]}
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {amount} {symbolMap[type]}
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-medium">${value.toLocaleString()}</div>
        <div
          className={cn(
            "text-xs",
            change >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
          )}
        >
          {change >= 0 ? "+" : "-"}
          {Math.abs(change).toFixed(2)}%
        </div>
      </div>
    </Card>
  );
}
