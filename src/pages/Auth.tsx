
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  
  const handleAuthenticated = () => {
    navigate('/');
  };
  
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
};

export default Auth;
