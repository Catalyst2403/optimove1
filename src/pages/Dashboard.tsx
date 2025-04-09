
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderList } from '@/components/orders/OrderList';
import { CircleDollarSign, Activity, MapPin } from 'lucide-react';
import { RecentOrderStats } from '@/components/dashboard/RecentOrderStats';
import { AppPerformance } from '@/components/dashboard/AppPerformance';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>('highestPay');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Optimove</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-900/50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Earnings</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹550</h3>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-900/50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Orders</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-900/50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Trips</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">38</h3>
              </div>
              <div className="h-12 w-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Button onClick={() => navigate('/orders')}>View All</Button>
        </div>
        
        <OrderList sortBy={sortBy} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <RecentOrderStats />
        <AppPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
