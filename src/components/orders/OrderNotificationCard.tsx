import { Order } from '@/types';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderNotificationCardProps {
  order: Order;
  isVisible: boolean;
  onAccept: (order: Order) => void;
  onReject: () => void;
}

const appThemes = {
  swiggy: {
    gradient: 'from-orange-500 to-orange-600',
    badge: 'bg-orange-500',
    icon: 'text-orange-500',
    acceptButton: 'bg-orange-500 hover:bg-orange-600',
  },
  zomato: {
    gradient: 'from-red-500 to-red-600',
    badge: 'bg-red-500',
    icon: 'text-red-500',
    acceptButton: 'bg-red-500 hover:bg-red-600',
  },
  eatsure: {
    gradient: 'from-purple-500 to-purple-600',
    badge: 'bg-purple-500',
    icon: 'text-purple-500',
    acceptButton: 'bg-purple-500 hover:bg-purple-600',
  },
};

export const OrderNotificationCard = ({
  order,
  isVisible,
  onAccept,
  onReject,
}: OrderNotificationCardProps) => {
  const theme = appThemes[order.app];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onReject}
      />

      {/* Notification Card */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-md mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* App Header with Gradient */}
          <div className={`bg-gradient-to-r ${theme.gradient} px-4 py-3 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <div className={`${theme.badge} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                {order.app}
              </div>
            </div>
            <div className="text-white text-2xl font-bold">
              ₹{order.pay}
            </div>
          </div>

          {/* Order Details */}
          <div className="p-4 space-y-4">
            {/* Pickup Location */}
            <div className="flex items-start gap-3">
              <div className={`${theme.icon} mt-1`}>
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pickup
                </div>
                <div className="text-sm font-semibold text-foreground mt-0.5">
                  {order.pickupLocation}
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="flex items-center gap-2">
              <div className="h-px bg-border flex-1" />
              <Navigation className={`h-4 w-4 ${theme.icon} rotate-180`} />
              <div className="h-px bg-border flex-1" />
            </div>

            {/* Drop-off Location */}
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">
                <MapPin className="h-5 w-5 fill-current" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Drop-off
                </div>
                <div className="text-sm font-semibold text-foreground mt-0.5">
                  {order.dropLocation}
                </div>
              </div>
            </div>

            {/* Distance and Time */}
            <div className="flex items-center justify-around py-2 px-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{order.distance} km</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{order.estimatedTime} mins</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={onReject}
              >
                Reject
              </Button>
              <Button
                className={`flex-1 ${theme.acceptButton} text-white`}
                onClick={() => onAccept(order)}
              >
                Accept Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
