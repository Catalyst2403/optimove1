
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockDataService } from '@/services/mockData';

export const AppPerformance = () => {
  const [appData, setAppData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading data
    setTimeout(() => {
      const data = mockDataService.getEarnings();
      
      // Calculate earnings per app
      const earnings = data.records.reduce((acc: any, record: any) => {
        if (!acc[record.app]) {
          acc[record.app] = 0;
        }
        acc[record.app] += record.amount;
        return acc;
      }, {});
      
      // Calculate total earnings
      const totalEarnings = Object.values(earnings).reduce((sum: any, val: any) => sum + val, 0);
      
      // Calculate percentages
      const percentages = Object.entries(earnings).reduce((acc: any, [app, amount]: any) => {
        acc[app] = Math.round((amount / totalEarnings) * 100);
        return acc;
      }, {});
      
      setAppData({
        earnings,
        percentages,
        totalEarnings
      });
      
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Get color class for app
  const getAppColorClass = (app: string): string => {
    switch (app) {
      case 'swiggy':
        return 'text-delivery-orange';
      case 'zomato':
        return 'text-red-600';
      case 'eatsure':
        return 'text-delivery-purple';
      default:
        return 'text-gray-800';
    }
  };
  
  // Get progress color for app
  const getProgressColorClass = (app: string): string => {
    switch (app) {
      case 'swiggy':
        return 'bg-delivery-orange';
      case 'zomato':
        return 'bg-red-600';
      case 'eatsure':
        return 'bg-delivery-purple';
      default:
        return 'bg-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>App Performance</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-6 animate-pulse-light">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(appData.percentages || {}).length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">No app data available</p>
            ) : (
              Object.entries(appData.percentages || {}).map(([app, percentage]: [string, any]) => (
                <div key={app} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${getAppColorClass(app)}`}>
                      {app.charAt(0).toUpperCase() + app.slice(1)}
                    </span>
                    <span className="text-sm">
                      ₹{appData.earnings[app]} ({percentage}%)
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                    indicatorClassName={getProgressColorClass(app)}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
