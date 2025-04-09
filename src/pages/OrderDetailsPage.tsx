
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { mockDataService } from '@/services/mockData';
import { ArrowLeft, Clock, Navigation2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: 23.0225,
  lng: 72.5714,
};

// To get a Google Maps API key:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select an existing one
// 3. Enable the Maps JavaScript API, Directions API, and Places API
// 4. Create API credentials (API key)
// 5. Restrict the API key to your domains for security
// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  
  useEffect(() => {
    if (!orderId) return;
    
    setIsLoading(true);
    // Fetch order
    setTimeout(() => {
      const foundOrder = mockDataService.getOrderById(orderId);
      setOrder(foundOrder);
      setIsLoading(false);
    }, 500);
  }, [orderId]);
  
  useEffect(() => {
    if (!isLoaded || !order) return;
    
    const directionsService = new google.maps.DirectionsService();
    
    // Convert addresses to coordinates (in real app, these would come from geocoding)
    const pickup = mockDataService.getCoordinatesFromAddress(order.pickupLocation);
    const dropoff = mockDataService.getCoordinatesFromAddress(order.dropLocation);
    
    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  }, [isLoaded, order]);
  
  const handleAccept = () => {
    if (!order) return;
    
    setIsAccepting(true);
    
    // Simulate a delay before redirection
    setTimeout(() => {
      toast.success(`Order accepted! Redirecting to ${order.app.charAt(0).toUpperCase() + order.app.slice(1)}`);
      navigate('/orders');
    }, 1000);
  };
  
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
  
  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-[300px] bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!order) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-bold mb-4">Order not found</h2>
          <Button onClick={() => navigate('/orders')}>Go Back to Orders</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-8 h-8 p-0" 
            onClick={() => navigate('/orders')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>
        
        <div className="relative">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={13}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: '#FF5722',
                      strokeWeight: 5,
                    },
                    suppressMarkers: true,
                  }}
                />
              )}
              
              {/* Custom markers */}
              {order && (
                <>
                  <Marker
                    position={mockDataService.getCoordinatesFromAddress(order.pickupLocation)}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                      scaledSize: new google.maps.Size(40, 40),
                    }}
                  />
                  <Marker
                    position={mockDataService.getCoordinatesFromAddress(order.dropLocation)}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                      scaledSize: new google.maps.Size(40, 40),
                    }}
                  />
                </>
              )}
            </GoogleMap>
          ) : (
            <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <p>Loading map...</p>
            </div>
          )}
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className={`app-badge ${getAppBadgeClass(order.app)}`}>
                {order.app.charAt(0).toUpperCase() + order.app.slice(1)}
              </Badge>
              <span className="text-2xl font-bold text-green-600">₹{order.pay}</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">Order Summary</h3>
              <div className="flex justify-between mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Navigation2 className="h-4 w-4 text-gray-500" />
                  <span>{order.distance} km</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{order.estimatedTime} mins</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Pickup</p>
                  <p className="text-sm text-muted-foreground">{order.pickupLocation}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Drop-off</p>
                  <p className="text-sm text-muted-foreground">{order.dropLocation}</p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleAccept}
              disabled={isAccepting}
            >
              {isAccepting ? 'Accepting...' : 'Accept Order'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
