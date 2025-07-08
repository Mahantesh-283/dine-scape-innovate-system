
import React, { useEffect } from 'react';
import { Clock, CheckCircle, Truck, ChefHat, Package } from 'lucide-react';

interface OrderTrackerProps {
  orders: any[];
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders, setOrders }) => {
  // Simulate order status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.status === 'Queued') {
            return { ...order, status: 'Preparing', estimatedTime: 15 };
          } else if (order.status === 'Preparing' && Math.random() > 0.7) {
            return { ...order, status: 'Cooking', estimatedTime: 8 };
          } else if (order.status === 'Cooking' && Math.random() > 0.8) {
            return { ...order, status: 'Ready', estimatedTime: 2 };
          } else if (order.status === 'Ready' && Math.random() > 0.9) {
            return { ...order, status: 'Delivered', estimatedTime: 0 };
          }
          return order;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [setOrders]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Queued': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'Preparing': return <Package className="w-5 h-5 text-blue-400" />;
      case 'Cooking': return <ChefHat className="w-5 h-5 text-orange-400" />;
      case 'Ready': return <Truck className="w-5 h-5 text-green-400" />;
      case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Queued': return 'from-yellow-500 to-orange-500';
      case 'Preparing': return 'from-blue-500 to-cyan-500';
      case 'Cooking': return 'from-orange-500 to-red-500';
      case 'Ready': return 'from-green-500 to-emerald-500';
      case 'Delivered': return 'from-green-600 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🍽️</div>
        <h2 className="text-2xl font-bold text-white mb-4">No Active Orders</h2>
        <p className="text-gray-300">Head to the menu to place your first order!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Order Tracking</h2>
        <p className="text-gray-300">Real-time updates from our smart kitchen</p>
      </div>

      {/* Order Timeline */}
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              {/* Order Image */}
              <div className="text-4xl">{order.image}</div>
              
              {/* Order Details */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{order.name}</h3>
                    <p className="text-gray-300 text-sm">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">₹{order.price}</div>
                    {order.estimatedTime > 0 && (
                      <div className="text-sm text-gray-300">
                        ~{order.estimatedTime} min remaining
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-white font-semibold">{order.status}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-gray-600 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getStatusColor(order.status)} transition-all duration-1000`}
                      style={{ 
                        width: order.status === 'Queued' ? '20%' : 
                               order.status === 'Preparing' ? '40%' :
                               order.status === 'Cooking' ? '70%' :
                               order.status === 'Ready' ? '90%' : '100%'
                      }}
                    />
                  </div>

                  {/* Status Steps */}
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className={order.status === 'Queued' ? 'text-yellow-400' : 'text-gray-400'}>
                      Queued
                    </span>
                    <span className={['Preparing', 'Cooking', 'Ready', 'Delivered'].includes(order.status) ? 'text-blue-400' : 'text-gray-400'}>
                      Preparing
                    </span>
                    <span className={['Cooking', 'Ready', 'Delivered'].includes(order.status) ? 'text-orange-400' : 'text-gray-400'}>
                      Cooking
                    </span>
                    <span className={['Ready', 'Delivered'].includes(order.status) ? 'text-green-400' : 'text-gray-400'}>
                      Ready
                    </span>
                    <span className={order.status === 'Delivered' ? 'text-green-500' : 'text-gray-400'}>
                      Delivered
                    </span>
                  </div>
                </div>

                {/* Smart Container Info */}
                {order.status === 'Preparing' && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-300 text-sm">
                        Smart container dispatched to ingredient station
                      </span>
                    </div>
                  </div>
                )}

                {order.status === 'Cooking' && (
                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <ChefHat className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-300 text-sm">
                        Chef is preparing your dish with precision ingredients
                      </span>
                    </div>
                  </div>
                )}

                {order.status === 'Ready' && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">
                        Container returning to your table via conveyor system
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Kitchen View */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <ChefHat className="w-5 h-5 text-orange-400" />
          <span>Live Kitchen View</span>
        </h3>
        <div className="bg-gray-800 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-4">👨‍🍳</div>
          <p className="text-gray-300">Smart kitchen camera would display here</p>
          <p className="text-sm text-gray-400 mt-2">Watch your food being prepared in real-time</p>
        </div>
      </div>
    </div>
  );
};
