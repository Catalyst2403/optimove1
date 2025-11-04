import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, PieChart } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      icon: Home,
      label: 'Home',
      isActive: location.pathname === '/',
    },
    {
      to: '/orders',
      icon: ShoppingBag,
      label: 'Orders',
      isActive: location.pathname === '/orders',
    },
    {
      to: '/earnings',
      icon: PieChart,
      label: 'Earnings',
      isActive: location.pathname === '/earnings',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-lg">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-1 flex-col items-center justify-center h-full gap-1 transition-colors",
                item.isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-6 h-6",
                item.isActive && "stroke-[2.5]"
              )} />
              <span className={cn(
                "text-xs",
                item.isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
