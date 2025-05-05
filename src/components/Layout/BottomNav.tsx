
import { Bitcoin, Wallet, CircleUser, ArrowUpDown, ChartLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    {
      icon: ChartLine,
      label: "Home",
      path: "/",
    },
    {
      icon: Bitcoin,
      label: "Assets",
      path: "/assets",
    },
    {
      icon: ArrowUpDown,
      label: "Activity",
      path: "/activity",
    },
    {
      icon: Wallet,
      label: "Wallet",
      path: "/wallet",
    },
    {
      icon: CircleUser,
      label: "Profile",
      path: "/profile",
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 rounded-t-xl shadow-lg">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "mb-1",
                  isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
