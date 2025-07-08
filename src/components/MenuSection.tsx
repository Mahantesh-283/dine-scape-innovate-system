
import React, { useState } from 'react';
import { Plus, Star, Clock, Flame } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  prepTime: number;
  spiceLevel?: number;
  isVegetarian?: boolean;
  isPopular?: boolean;
}

interface MenuSectionProps {
  onAddToOrder: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const categories = [
    { id: 'popular', name: 'Popular', icon: '🔥' },
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍛' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Quantum Fusion Curry',
      description: 'AI-optimized spice blend with lab-grown proteins and molecular gastronomy elements',
      price: 1299,
      category: 'popular',
      image: '🍛',
      rating: 4.9,
      prepTime: 18,
      spiceLevel: 3,
      isPopular: true
    },
    {
      id: 2,
      name: 'Holographic Sushi Platter',
      description: 'Fresh sashimi with AR-enhanced presentation and temperature-controlled serving',
      price: 1899,
      category: 'popular',
      image: '🍣',
      rating: 4.8,
      prepTime: 12,
      isPopular: true
    },
    {
      id: 3,
      name: 'Neural Network Noodles',
      description: 'Smart pasta that adapts flavor profile based on your taste preferences',
      price: 899,
      category: 'mains',
      image: '🍝',
      rating: 4.7,
      prepTime: 15,
      spiceLevel: 2
    },
    {
      id: 4,
      name: 'Zero-G Chocolate Sphere',
      description: 'Levitating dessert with temperature-reactive cocoa shell and surprise center',
      price: 699,
      category: 'desserts',
      image: '🍫',
      rating: 4.9,
      prepTime: 8
    },
    {
      id: 5,
      name: 'Mood-Sync Mocktail',
      description: 'Color-changing beverage that responds to ambient lighting and music',
      price: 399,
      category: 'beverages',
      image: '🍹',
      rating: 4.6,
      prepTime: 5
    }
  ];

  const filteredItems = selectedCategory === 'popular' 
    ? menuItems.filter(item => item.isPopular)
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white/10 backdrop-blur-lg text-gray-300 hover:text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/15 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            {/* Item Image & Badge */}
            <div className="relative mb-4">
              <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.image}
              </div>
              {item.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <Flame className="w-3 h-3" />
                  <span>Popular</span>
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Rating & Time */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{item.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{item.prepTime} min</span>
                </div>
                {item.spiceLevel && (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < item.spiceLevel ? 'bg-red-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Add Button */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-2xl font-bold text-cyan-400">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => onAddToOrder(item)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
