
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const isMobile = useIsMobile();
  const [notificationCount] = useState(3);
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-56 sm:w-64">
                <div className="px-2 py-6">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 text-lg font-bold text-primary"
                  >
                    <span className="rounded-md bg-primary p-1 text-white">GG</span>
                    <span>GigGrindHub</span>
                  </Link>
                  <nav className="mt-8 flex flex-col gap-4">
                    <Link 
                      to="/" 
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/orders" 
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      Orders
                    </Link>
                    <Link 
                      to="/earnings" 
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      Earnings
                    </Link>
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      Profile
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="rounded-md bg-primary p-1 text-white text-lg font-bold">GG</span>
            {!isMobile && <span className="text-lg font-bold text-primary">GigGrindHub</span>}
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link 
              to="/orders" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Orders
            </Link>
            <Link 
              to="/earnings" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Earnings
            </Link>
          </nav>
        )}
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {notificationCount}
              </span>
            )}
          </Button>
          <Link to="/profile">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};
