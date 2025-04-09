
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import Dashboard from './Dashboard';
import { AuthWrapper } from '@/components/auth/AuthWrapper';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for auth status in local storage or a cookie
    const hasAuth = localStorage.getItem('giggrind-auth') === 'true';
    setIsAuthenticated(hasAuth);
    setIsLoading(false);
  }, []);
  
  const handleAuthenticated = () => {
    // Store auth status
    localStorage.setItem('giggrind-auth', 'true');
    setIsAuthenticated(true);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-light">
          <div className="h-12 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="bg-primary rounded-lg p-3 text-white text-3xl font-bold">GG</span>
            <h1 className="text-3xl font-bold text-primary">GigGrindHub</h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Maximize your earnings by managing orders from Swiggy, Zomato, and more - all in one place.
          </p>
        </div>
        
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <AuthWrapper onAuthenticated={handleAuthenticated} />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
