
import { EarningsStats } from '@/components/earnings/EarningsStats';
import { EarningsOverview } from '@/components/earnings/EarningsOverview';
import { OrderList } from '@/components/orders/OrderList';
import { RecentOrderStats } from '@/components/dashboard/RecentOrderStats';
import { AppPerformance } from '@/components/dashboard/AppPerformance';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <EarningsStats />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <EarningsOverview />
        </div>
        <div className="space-y-6">
          <RecentOrderStats />
          <AppPerformance />
        </div>
      </div>
      
      <div className="mt-8">
        <OrderList />
      </div>
    </div>
  );
};

export default Dashboard;
