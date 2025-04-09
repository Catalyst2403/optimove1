
import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import { mockDataService } from '@/services/mockData';
import { Card, CardContent } from '@/components/ui/card';

export const EarningsStats = () => {
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [weekEarnings, setWeekEarnings] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const data = mockDataService.getEarnings();
      
      // Get today's earnings
      const todayAmount = data.todayAmount || 0;
      
      // Get week's earnings
      const weekAmount = data.weekAmount || 0;
      
      // Calculate average order value
      const totalOrders = data.records.length;
      const totalEarnings = data.records.reduce((sum, record) => sum + record.amount, 0);
      const avgOrder = totalOrders > 0 ? Math.round(totalEarnings / totalOrders) : 0;
      
      setTodayEarnings(todayAmount);
      setWeekEarnings(weekAmount);
      setAvgOrderValue(avgOrder);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse-light">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Today's Earnings</p>
              <p className="text-2xl font-bold">₹{todayEarnings}</p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold">₹{weekEarnings}</p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary/10">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-2xl font-bold">₹{avgOrderValue}</p>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-delivery-blue/10">
              <Clock className="h-5 w-5 text-delivery-blue" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
