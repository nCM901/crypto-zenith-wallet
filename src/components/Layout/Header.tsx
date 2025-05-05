
import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
  showSettings?: boolean;
  className?: string;
}

export default function Header({
  title = "Zenith Wallet",
  showNotifications = true,
  showSettings = true,
  className,
}: HeaderProps) {
  return (
    <header className={cn("flex items-center justify-between py-4 px-4", className)}>
      <div className="flex items-center">
        <h1 className="text-xl font-bold gradient-text">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        {showNotifications && (
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>
        )}
        
        {showSettings && (
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
