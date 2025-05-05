import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
interface BalanceCardProps {
  balance: number;
  change?: number;
  className?: string;
}
export default function BalanceCard({
  balance,
  change = 0,
  className
}: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };
  return <Card className={cn("w-full crypto-card relative overflow-hidden", className)}>
      {/* Decorative gradient orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 blur-xl"></div>
      
      <div className="relative z-10 flex flex-col items-center p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Jama Punji</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleShowBalance}>
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="text-3xl font-bold mb-2">
          {showBalance ? `$${balance.toLocaleString('en-US', {
          minimumFractionDigits: 2
        })}` : '••••••'}
        </div>
        
        <div className={cn("text-sm mb-4", change >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500")}>
          {change >= 0 ? <span className="flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              {change.toFixed(2)}%
            </span> : <span className="flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              {Math.abs(change).toFixed(2)}%
            </span>}
        </div>
        
        <div className="flex flex-row gap-3 w-full">
          <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
            <Link to="/deposit">
              <ArrowDown className="h-4 w-4 mr-2" />
              Deposit
            </Link>
          </Button>
          <Button asChild className="flex-1 bg-accent hover:bg-accent/90">
            <Link to="/withdraw">
              <ArrowUp className="h-4 w-4 mr-2" />
              Withdraw
            </Link>
          </Button>
        </div>
      </div>
    </Card>;
}