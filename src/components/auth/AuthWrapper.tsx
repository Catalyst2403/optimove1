
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthWrapperProps {
  onAuthenticated: () => void;
}

export const AuthWrapper = ({ onAuthenticated }: AuthWrapperProps) => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {isLogin ? (
        <LoginForm 
          onLogin={onAuthenticated}
          onSwitchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm 
          onRegister={onAuthenticated}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};
