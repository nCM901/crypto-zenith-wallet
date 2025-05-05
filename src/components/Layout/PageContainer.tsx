
import { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showNav?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

export default function PageContainer({
  children,
  title,
  showHeader = true,
  showNav = true,
  headerClassName,
  contentClassName,
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && <Header title={title} className={headerClassName} />}
      
      <main className={cn(
        "flex-1 flex flex-col pb-24", 
        !fullWidth && "container max-w-lg mx-auto",
        contentClassName
      )}>
        {children}
      </main>
      
      {showNav && <BottomNav />}
    </div>
  );
}
