import { Order } from '@/types';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface OrderNotificationCardProps {
  order: Order;
  isVisible: boolean;
  onDismiss: () => void;
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
  onDismiss,
}: OrderNotificationCardProps) => {
  const theme = appThemes[order.app];
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  const [swipeOffsetX, setSwipeOffsetX] = useState(0);
  const [swipeOffsetY, setSwipeOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset swipe state when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setSwipeOffsetX(0);
      setSwipeOffsetY(0);
      setIsDragging(false);
    }
  }, [isVisible]);

  const minSwipeDistance = 50; // Minimum distance for swipe to trigger dismiss
  const dismissThreshold = 100; // Distance to auto-dismiss

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const currentTouchX = e.targetTouches[0].clientX;
    const currentTouchY = e.targetTouches[0].clientY;
    const diffX = currentTouchX - touchStartX;
    const diffY = touchStartY - currentTouchY;

    // Allow horizontal swipes (left/right)
    setSwipeOffsetX(diffX);

    // Allow upward swipe only
    if (diffY > 0) {
      setSwipeOffsetY(-diffY);
    }

    setTouchEndX(currentTouchX);
    setTouchEndY(currentTouchY);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchStartY === null) {
      setIsDragging(false);
      setSwipeOffsetX(0);
      setSwipeOffsetY(0);
      return;
    }

    const distanceX = touchEndX !== null ? touchEndX - touchStartX : 0;
    const distanceY = touchEndY !== null ? touchStartY - touchEndY : 0;

    const isSwipeLeft = distanceX < -minSwipeDistance;
    const isSwipeRight = distanceX > minSwipeDistance;
    const isSwipeUp = distanceY > minSwipeDistance;

    const shouldDismiss =
      isSwipeLeft ||
      isSwipeRight ||
      isSwipeUp ||
      Math.abs(swipeOffsetX) > dismissThreshold ||
      Math.abs(swipeOffsetY) > dismissThreshold;

    if (shouldDismiss) {
      // Animate out in the direction of the swipe
      if (isSwipeLeft || swipeOffsetX < -dismissThreshold) {
        setSwipeOffsetX(-400); // Swipe left
      } else if (isSwipeRight || swipeOffsetX > dismissThreshold) {
        setSwipeOffsetX(400); // Swipe right
      } else if (isSwipeUp || swipeOffsetY < -dismissThreshold) {
        setSwipeOffsetY(-300); // Swipe up
      }

      setTimeout(() => {
        onDismiss();
      }, 200);
    } else {
      // Reset position
      setSwipeOffsetX(0);
      setSwipeOffsetY(0);
    }

    setIsDragging(false);
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
    setTouchEndY(null);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.clientX);
    setTouchStartY(e.clientY);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (touchStartX === null || touchStartY === null || !isDragging) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const diffX = currentX - touchStartX;
    const diffY = touchStartY - currentY;

    // Allow horizontal swipes
    setSwipeOffsetX(diffX);

    // Allow upward swipe only
    if (diffY > 0) {
      setSwipeOffsetY(-diffY);
    }

    setTouchEndX(currentX);
    setTouchEndY(currentY);
  };

  const onMouseUp = () => {
    if (touchStartX === null || touchStartY === null || !isDragging) {
      setIsDragging(false);
      setSwipeOffsetX(0);
      setSwipeOffsetY(0);
      return;
    }

    const distanceX = touchEndX !== null ? touchEndX - touchStartX : 0;
    const distanceY = touchEndY !== null ? touchStartY - touchEndY : 0;

    const isSwipeLeft = distanceX < -minSwipeDistance;
    const isSwipeRight = distanceX > minSwipeDistance;
    const isSwipeUp = distanceY > minSwipeDistance;

    const shouldDismiss =
      isSwipeLeft ||
      isSwipeRight ||
      isSwipeUp ||
      Math.abs(swipeOffsetX) > dismissThreshold ||
      Math.abs(swipeOffsetY) > dismissThreshold;

    if (shouldDismiss) {
      // Animate out in the direction of the swipe
      if (isSwipeLeft || swipeOffsetX < -dismissThreshold) {
        setSwipeOffsetX(-400); // Swipe left
      } else if (isSwipeRight || swipeOffsetX > dismissThreshold) {
        setSwipeOffsetX(400); // Swipe right
      } else if (isSwipeUp || swipeOffsetY < -dismissThreshold) {
        setSwipeOffsetY(-300); // Swipe up
      }

      setTimeout(() => {
        onDismiss();
      }, 200);
    } else {
      // Reset position
      setSwipeOffsetX(0);
      setSwipeOffsetY(0);
    }

    setIsDragging(false);
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
    setTouchEndY(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Notification Card */}
      <div
        ref={cardRef}
        className={`fixed top-0 left-0 right-0 z-50 px-4 pt-4 ${
          isDragging ? '' : 'transition-all duration-300'
        } ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: isVisible
            ? `translate(${swipeOffsetX}px, ${swipeOffsetY}px)`
            : 'translateY(-300px)',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="max-w-md mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none">
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

          </div>
        </div>
      </div>
    </>
  );
};
