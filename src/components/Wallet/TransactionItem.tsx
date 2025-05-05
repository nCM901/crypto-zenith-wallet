
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export interface TransactionItemProps {
  id: string;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  currency: string;
  date: Date;
  status: "completed" | "pending" | "failed";
  address?: string;
}

export default function TransactionItem({
  type,
  amount,
  currency,
  date,
  status,
  address,
}: TransactionItemProps) {
  const iconMap = {
    deposit: <ArrowDown className={cn(
      "h-4 w-4",
      status === "completed" ? "text-green-500" : 
      status === "pending" ? "text-yellow-500" : "text-red-500"
    )} />,
    withdraw: <ArrowUp className={cn(
      "h-4 w-4",
      status === "completed" ? "text-blue-500" : 
      status === "pending" ? "text-yellow-500" : "text-red-500"
    )} />,
    transfer: <ArrowRight className={cn(
      "h-4 w-4",
      status === "completed" ? "text-purple-500" : 
      status === "pending" ? "text-yellow-500" : "text-red-500"
    )} />,
  };

  const labelMap = {
    deposit: "Deposit",
    withdraw: "Withdraw",
    transfer: "Transfer",
  };

  return (
    <div className="flex items-center p-4 border-b last:border-b-0">
      <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
        {iconMap[type]}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{labelMap[type]}</h4>
          <span className={cn(
            "font-medium",
            type === "deposit" ? "text-green-600 dark:text-green-500" : 
            type === "withdraw" ? "text-red-600 dark:text-red-500" : ""
          )}>
            {type === "deposit" ? "+" : "-"}{amount} {currency}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
            {address ? `${address.substring(0, 8)}...${address.substring(address.length - 8)}` : "Internal"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(date, { addSuffix: true })}
          </div>
        </div>

        <div className="mt-1">
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : 
            status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : 
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          )}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
