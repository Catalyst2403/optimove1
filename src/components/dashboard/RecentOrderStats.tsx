
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockDataService } from '@/services/mockData';
import { ExternalLink } from 'lucide-react';

export const RecentOrderStats = () => {
  const [earnings, setEarnings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading data
    setTimeout(() => {
      const data = mockDataService.getEarnings();
      // Get just the last 5 earnings records
      setEarnings(data.records.slice(0, 5));
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get app badge class
  const getAppBadgeClass = (app: string): string => {
    switch (app) {
      case 'swiggy':
        return 'app-badge-swiggy';
      case 'zomato':
        return 'app-badge-zomato';
      case 'eatsure':
        return 'app-badge-eatsure';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 animate-pulse-light">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[280px]">
            <div className="space-y-4">
              {earnings.length === 0 ? (
                <p className="text-center py-6 text-muted-foreground">No recent orders</p>
              ) : (
                earnings.map((earning: any) => (
                  <div key={earning.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`app-badge ${getAppBadgeClass(earning.app)}`}>
                          {earning.app.charAt(0).toUpperCase() + earning.app.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(earning.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{earning.amount}</p>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span className="text-xs">View</span>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
