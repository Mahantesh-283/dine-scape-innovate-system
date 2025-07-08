
import React, { useState } from 'react';
import { CreditCard, Smartphone, QrCode, Wallet, Star, Receipt } from 'lucide-react';

interface PaymentSectionProps {
  orders: any[];
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ orders }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [tipPercentage, setTipPercentage] = useState(10);

  const subtotal = orders.reduce((sum, order) => sum + order.price, 0);
  const tip = Math.round((subtotal * tipPercentage) / 100);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tip + tax;

  const paymentMethods = [
    { id: 'card', name: 'Card Payment', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'PhonePe, GPay, Paytm' },
    { id: 'qr', name: 'QR Code', icon: QrCode, description: 'Scan and pay instantly' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Saved payment methods' }
  ];

  const tipOptions = [5, 10, 15, 20];

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">💳</div>
        <h2 className="text-2xl font-bold text-white mb-4">No Items to Pay</h2>
        <p className="text-gray-300">Add items to your order first!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Order Summary */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <Receipt className="w-6 h-6 text-cyan-400" />
          <span>Order Summary</span>
        </h2>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{order.image}</span>
                <div>
                  <h3 className="text-white font-medium">{order.name}</h3>
                  <p className="text-gray-400 text-sm">Quantity: 1</p>
                </div>
              </div>
              <span className="text-cyan-400 font-semibold">₹{order.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6">Payment Method</h3>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedPaymentMethod === method.id
                      ? 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/25'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <IconComponent className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h4 className="text-white font-medium">{method.name}</h4>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                    {selectedPaymentMethod === method.id && (
                      <div className="ml-auto text-cyan-400">✓</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Form */}
          {selectedPaymentMethod === 'card' && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {selectedPaymentMethod === 'qr' && (
            <div className="mt-6 text-center">
              <div className="bg-white rounded-2xl p-8 max-w-xs mx-auto">
                <div className="text-black text-4xl grid grid-cols-8 gap-1">
                  {/* QR Code representation */}
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mt-4">Scan this QR code with your payment app</p>
            </div>
          )}
        </div>

        {/* Bill Calculation */}
        <div className="space-y-6">
          {/* Tip Selection */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Add Tip</span>
            </h3>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              {tipOptions.map((tip) => (
                <button
                  key={tip}
                  onClick={() => setTipPercentage(tip)}
                  className={`py-3 rounded-xl text-center transition-all duration-300 ${
                    tipPercentage === tip
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                  }`}
                >
                  {tip}%
                </button>
              ))}
            </div>
            
            <input
              type="range"
              min="0"
              max="25"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(Number(e.target.value))}
              className="w-full slider"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>0%</span>
              <span className="text-white font-semibold">{tipPercentage}%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Final Bill */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Final Bill</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>GST (18%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tip ({tipPercentage}%)</span>
                <span>₹{tip}</span>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span className="text-cyan-400">₹{total}</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
              Pay ₹{total}
            </button>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Secure payment powered by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
