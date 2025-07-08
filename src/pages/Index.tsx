
import React, { useState } from 'react';
import { SmartTableHeader } from '../components/SmartTableHeader';
import { MenuSection } from '../components/MenuSection';
import { AmbientControls } from '../components/AmbientControls';
import { OrderTracker } from '../components/OrderTracker';
import { VRExperience } from '../components/VRExperience';
import { PaymentSection } from '../components/PaymentSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('menu');
  const [currentOrders, setCurrentOrders] = useState([]);
  const [ambientTheme, setAmbientTheme] = useState('default');

  const navigationSections = [
    { id: 'menu', label: 'Menu', icon: '🍽️' },
    { id: 'ambiance', label: 'Ambiance', icon: '🎨' },
    { id: 'entertainment', label: 'VR & Entertainment', icon: '🥽' },
    { id: 'orders', label: 'My Orders', icon: '📋' },
    { id: 'payment', label: 'Payment', icon: '💳' },
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
        
        {/* Navigation */}
        <div className="flex justify-center py-6">
          <div className="flex space-x-2 bg-black/30 backdrop-blur-lg rounded-2xl p-2 border border-cyan-500/20">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-8">
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
          {activeSection === 'orders' && (
            <OrderTracker orders={currentOrders} setOrders={setCurrentOrders} />
          )}
          {activeSection === 'payment' && (
            <PaymentSection orders={currentOrders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
