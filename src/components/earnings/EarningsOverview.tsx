
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DailyEarning, WeeklyEarning } from '@/types';
import { mockDataService } from '@/services/mockData';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

export const EarningsOverview = () => {
  const isMobile = useIsMobile();
  const [dailyEarnings, setDailyEarnings] = useState<DailyEarning[]>([]);
  const [weeklyEarnings, setWeeklyEarnings] = useState<WeeklyEarning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadEarnings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const data = mockDataService.getEarnings();
      setDailyEarnings(data.daily);
      setWeeklyEarnings(data.weekly);
      setIsLoading(false);
    }, 1000);
  };
  
  useEffect(() => {
    loadEarnings();
  }, []);
  
  // Colors for charts
  const COLORS = ['#FF5722', '#F44336', '#9C27B0'];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Prepare data for pie chart
  const getPieChartData = (earnings: WeeklyEarning[]) => {
    if (!earnings.length) return [];
    
    const breakdown = earnings[0].breakdown;
    return Object.entries(breakdown).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value
    }));
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="p-6 animate-pulse-light">
          <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="mt-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Earnings</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyEarnings.slice(0, 7).reverse()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value}`}
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value}`, 'Earnings']}
                    labelFormatter={formatDate}
                  />
                  <Bar dataKey="amount" fill="#FF5722" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Breakdown</h3>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className={isMobile ? "h-64 w-full mb-4" : "h-64 w-1/2"}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getPieChartData(weeklyEarnings)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getPieChartData(weeklyEarnings).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className={isMobile ? "w-full" : "w-1/2"}>
                <div className="grid grid-cols-1 gap-4">
                  {weeklyEarnings.length > 0 && (
                    <>
                      <div className="stat-card">
                        <span className="text-sm text-muted-foreground">Week's Total</span>
                        <span className="text-2xl font-bold text-primary">₹{weeklyEarnings[0].amount}</span>
                      </div>
                      
                      {Object.entries(weeklyEarnings[0].breakdown).map(([app, amount]) => (
                        <div key={app} className="stat-card">
                          <span className="text-sm text-muted-foreground">{app.charAt(0).toUpperCase() + app.slice(1)}</span>
                          <span className="text-xl font-bold">₹{amount}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
