
import { OrderList } from '@/components/orders/OrderList';

const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <OrderList />
    </div>
  );
};

export default OrdersPage;
