import { useState } from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NavigationDrawer } from './NavigationDrawer';

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="bg-primary rounded-lg p-1 text-white font-bold">OM</span>
              <span className="font-bold text-lg">Optimove</span>
            </button>

            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <NavigationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};
