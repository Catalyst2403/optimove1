
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Dashboard from './Dashboard';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for auth status in local storage or a cookie
    const hasAuth = localStorage.getItem('optimove-auth') === 'true';
    setIsAuthenticated(hasAuth);
    setIsLoading(false);
  }, []);
  
  const handleAuthenticated = () => {
    // Store auth status
    localStorage.setItem('optimove-auth', 'true');
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
      <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 bg-primary/10 md:flex hidden">
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/60"></div>
            <img 
              src="/lovable-uploads/c2ebef09-3d38-4e15-b407-34da190f4f56.png"
              alt="Delivery Driver"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow">Earn More. Drive Less.</h1>
              <p className="text-xl md:text-2xl max-w-md text-center">
                The smartest way to manage your food delivery orders from multiple platforms.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div className="p-4 flex justify-end">
            <ThemeToggle />
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="bg-primary rounded-lg p-3 text-white text-3xl font-bold">OM</span>
                <h1 className="text-3xl font-bold text-primary">Optimove</h1>
              </div>
              <p className="text-muted-foreground text-center max-w-md mx-auto mb-8">
                Maximize your earnings by managing orders from Swiggy, Zomato, and more - all in one place.
              </p>
              
              <div className="bg-card rounded-lg shadow-lg border">
                <div className="p-6">
                  <AuthWrapper onAuthenticated={handleAuthenticated} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Optimove | All Rights Reserved</p>
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
