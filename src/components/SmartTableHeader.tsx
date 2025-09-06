
import React from 'react';
import { Clock, Wifi, Battery, Signal } from 'lucide-react';

interface SmartTableHeaderProps {
  tableNumber: string;
  ambientTheme: string;
  orderCount: number;
}

export const SmartTableHeader: React.FC<SmartTableHeaderProps> = ({
  tableNumber,
  ambientTheme,
  orderCount
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getThemeColor = (theme: string) => {
    const themes = {
      default: 'from-cyan-500 to-blue-600',
      romantic: 'from-pink-500 to-red-600',
      party: 'from-purple-500 to-pink-600',
      calm: 'from-green-500 to-blue-600',
      elegant: 'from-gold-500 to-amber-600'
    };
    return themes[theme] || themes.default;
  };

  return (
    <div className="relative overflow-hidden">
      {/* Header Background */}
      <div className={`bg-gradient-to-r ${getThemeColor(ambientTheme)} p-4 md:p-6 shadow-2xl`}>
        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          <div className="flex justify-between items-center">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30">
              <h1 className="text-xl font-bold text-white">{tableNumber}</h1>
              <p className="text-white/80 text-xs">Smart Dining</p>
            </div>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-lg rounded-xl px-3 py-2 border border-white/20">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-white font-medium text-sm">{currentTime}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="bg-black/20 backdrop-blur-lg rounded-xl px-3 py-2 border border-white/20">
              <p className="text-white/90 text-xs">Theme: <span className="font-semibold capitalize">{ambientTheme}</span></p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-lg rounded-xl px-2 py-1 border border-white/20">
                <Wifi className="w-3 h-3 text-green-400" />
                <Signal className="w-3 h-3 text-green-400" />
                <Battery className="w-3 h-3 text-green-400" />
              </div>
              
              {orderCount > 0 && (
                <div className="bg-red-500 backdrop-blur-lg rounded-full px-2 py-1 border border-red-400">
                  <span className="text-white font-bold text-xs">{orderCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/30">
              <h1 className="text-2xl font-bold text-white">{tableNumber}</h1>
              <p className="text-white/80 text-sm">Smart Dining Experience</p>
            </div>
            <div className="bg-black/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20">
              <p className="text-white/90 text-sm">Theme: <span className="font-semibold capitalize">{ambientTheme}</span></p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-lg rounded-xl px-3 py-2 border border-white/20">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-white font-medium">{currentTime}</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-lg rounded-xl px-3 py-2 border border-white/20">
              <div className="flex items-center space-x-1">
                <Wifi className="w-4 h-4 text-green-400" />
                <Signal className="w-4 h-4 text-green-400" />
                <Battery className="w-4 h-4 text-green-400" />
              </div>
            </div>

            {orderCount > 0 && (
              <div className="bg-red-500 backdrop-blur-lg rounded-full px-3 py-2 border border-red-400">
                <span className="text-white font-bold text-sm">{orderCount} Active Orders</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animated Light Strip */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-[pulse_2s_ease-in-out_infinite]"></div>
    </div>
  );
};
