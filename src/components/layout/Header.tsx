
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, PieChart, User } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="bg-primary rounded-lg p-1 text-white font-bold">OM</span>
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-lg">Optimove</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <nav className="flex overflow-auto border-t">
        <div className="container flex h-12 max-w-screen-2xl items-center justify-around">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              "flex-1 justify-center font-normal h-full rounded-none",
              location.pathname === '/' &&
                "border-b-2 border-primary"
            )}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
          <Link
            to="/orders"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              "flex-1 justify-center font-normal h-full rounded-none",
              location.pathname === '/orders' &&
                "border-b-2 border-primary"
            )}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Orders
          </Link>
          <Link
            to="/earnings"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              "flex-1 justify-center font-normal h-full rounded-none",
              location.pathname === '/earnings' &&
                "border-b-2 border-primary"
            )}
          >
            <PieChart className="w-4 h-4 mr-2" />
            Earnings
          </Link>
          <Link
            to="/profile"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              "flex-1 justify-center font-normal h-full rounded-none",
              location.pathname === '/profile' &&
                "border-b-2 border-primary"
            )}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
};
