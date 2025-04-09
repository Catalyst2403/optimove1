
import { ReactNode } from 'react';
import { Header } from './Header';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};
