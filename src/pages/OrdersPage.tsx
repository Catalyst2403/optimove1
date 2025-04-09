
import { useState } from 'react';
import { OrderList } from '@/components/orders/OrderList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

const OrdersPage = () => {
  const [sortBy, setSortBy] = useState<string>('highestPay');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Sort by:</span>
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="highestPay">Highest Pay</SelectItem>
            <SelectItem value="lowestPay">Lowest Pay</SelectItem>
            <SelectItem value="shortestDistance">Shortest Distance</SelectItem>
            <SelectItem value="shortestTime">Shortest Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <OrderList sortBy={sortBy} />
    </div>
  );
};

export default OrdersPage;
