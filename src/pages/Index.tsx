
import React, { useState } from 'react';
import { SmartTableHeader } from '../components/SmartTableHeader';
import { MenuSection } from '../components/MenuSection';
import { AmbientControls } from '../components/AmbientControls';
import { OrderTracker } from '../components/OrderTracker';
import { VRExperience } from '../components/VRExperience';
import { PaymentSection } from '../components/PaymentSection';
import { MusicPlayer } from '../components/MusicPlayer';
import { Menu, Lightbulb, Headset, ShoppingCart, CreditCard, Music } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('menu');
  const [currentOrders, setCurrentOrders] = useState([]);
  const [ambientTheme, setAmbientTheme] = useState('default');

  const navigationSections = [
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'ambiance', label: 'Ambiance', icon: Lightbulb },
    { id: 'entertainment', label: 'VR & Entertainment', icon: Headset },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'orders', label: 'My Orders', icon: ShoppingCart },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const addToOrder = (item) => {
    setCurrentOrders(prev => [...prev, { ...item, id: Date.now(), status: 'Queued' }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Ambient Background Effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>
      </div>

      <div className="relative z-10">
        <SmartTableHeader 
          tableNumber="Table 07" 
          ambientTheme={ambientTheme}
          orderCount={currentOrders.length}
        />
        
        {/* Navigation - Mobile Bottom Nav */}
        <div className="hidden md:flex justify-center py-6">
          <div className="flex space-x-2 bg-black/30 backdrop-blur-lg rounded-2xl p-2 border border-cyan-500/20">
            {navigationSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-6 pb-20 md:pb-8">
          {activeSection === 'menu' && (
            <MenuSection onAddToOrder={addToOrder} />
          )}
          {activeSection === 'ambiance' && (
            <AmbientControls 
              currentTheme={ambientTheme}
              onThemeChange={setAmbientTheme}
            />
          )}
          {activeSection === 'entertainment' && (
            <VRExperience />
          )}
          {activeSection === 'music' && (
            <MusicPlayer />
          )}
          {activeSection === 'orders' && (
            <OrderTracker orders={currentOrders} setOrders={setCurrentOrders} />
          )}
          {activeSection === 'payment' && (
            <PaymentSection orders={currentOrders} />
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-cyan-500/20 z-50">
          <div className="grid grid-cols-3 gap-1 p-2">
            {navigationSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {section.label.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
