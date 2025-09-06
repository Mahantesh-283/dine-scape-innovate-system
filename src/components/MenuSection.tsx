
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
    // Popular Items
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
      name: 'Neural Network Pizza',
      description: 'Self-assembling pizza with AI-selected toppings based on your biometric data',
      price: 1599,
      category: 'popular',
      image: '🍕',
      rating: 4.9,
      prepTime: 20,
      spiceLevel: 2,
      isPopular: true
    },
    {
      id: 4,
      name: 'Levitating Burger',
      description: 'Magnetic suspension system keeps ingredients floating until first bite',
      price: 1299,
      category: 'popular',
      image: '🍔',
      rating: 4.7,
      prepTime: 16,
      isPopular: true
    },

    // Appetizers
    {
      id: 5,
      name: 'Nano Samosas',
      description: 'Microscopic samosas that expand to full size when they hit your tongue',
      price: 599,
      category: 'appetizers',
      image: '🥟',
      rating: 4.6,
      prepTime: 8,
      spiceLevel: 2
    },
    {
      id: 6,
      name: 'Hologram Spring Rolls',
      description: 'Translucent rice paper with AR-projected filling visualization',
      price: 699,
      category: 'appetizers',
      image: '🥢',
      rating: 4.5,
      prepTime: 10,
      spiceLevel: 1
    },
    {
      id: 7,
      name: 'Molecular Soup Spheres',
      description: 'Liquid soup encased in edible membranes that burst with flavor',
      price: 799,
      category: 'appetizers',
      image: '🍲',
      rating: 4.8,
      prepTime: 12,
      spiceLevel: 3
    },
    {
      id: 8,
      name: 'Quantum Bread Sticks',
      description: 'Breadsticks that exist in multiple dimensions simultaneously',
      price: 399,
      category: 'appetizers',
      image: '🥖',
      rating: 4.4,
      prepTime: 6
    },
    {
      id: 9,
      name: 'Levitating Mozzarella',
      description: 'Anti-gravity cheese sticks with marinara dipping portal',
      price: 899,
      category: 'appetizers',
      image: '🧀',
      rating: 4.7,
      prepTime: 9
    },
    {
      id: 10,
      name: 'Digital Dumplings',
      description: 'Steam dumplings with QR code patterns that tell their origin story',
      price: 649,
      category: 'appetizers',
      image: '🥟',
      rating: 4.6,
      prepTime: 11,
      spiceLevel: 2
    },

    // Main Course
    {
      id: 11,
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
      id: 12,
      name: 'Time-Warp Biryani',
      description: 'Biryani cooked using temporal acceleration chambers for perfect aging',
      price: 1199,
      category: 'mains',
      image: '🍚',
      rating: 4.9,
      prepTime: 5,
      spiceLevel: 4
    },
    {
      id: 13,
      name: 'Plasma-Grilled Steak',
      description: 'Premium beef seared with controlled plasma for perfect molecular structure',
      price: 2199,
      category: 'mains',
      image: '🥩',
      rating: 4.8,
      prepTime: 22
    },
    {
      id: 14,
      name: 'Quantum Entangled Tacos',
      description: 'Twin tacos that share the same flavor - eat one, taste both',
      price: 1099,
      category: 'mains',
      image: '🌮',
      rating: 4.6,
      prepTime: 14,
      spiceLevel: 3
    },
    {
      id: 15,
      name: 'Holographic Fish Curry',
      description: 'Sustainable lab-grown fish in traditional spices with AR garnish',
      price: 1399,
      category: 'mains',
      image: '🐟',
      rating: 4.5,
      prepTime: 18,
      spiceLevel: 4
    },
    {
      id: 16,
      name: 'Metamorphic Mushroom Risotto',
      description: 'Shape-shifting mushrooms that change flavor as you eat',
      price: 1149,
      category: 'mains',
      image: '🍄',
      rating: 4.7,
      prepTime: 20,
      isVegetarian: true
    },
    {
      id: 17,
      name: 'Cyber Chicken Tikka',
      description: 'Precision-cooked chicken with nano-spice injection system',
      price: 1299,
      category: 'mains',
      image: '🍗',
      rating: 4.8,
      prepTime: 16,
      spiceLevel: 3
    },
    {
      id: 18,
      name: 'Infinite Loop Lasagna',
      description: 'Self-regenerating layers that appear as you eat the previous ones',
      price: 1449,
      category: 'mains',
      image: '🍝',
      rating: 4.6,
      prepTime: 25
    },

    // Desserts
    {
      id: 19,
      name: 'Zero-G Chocolate Sphere',
      description: 'Levitating dessert with temperature-reactive cocoa shell and surprise center',
      price: 699,
      category: 'desserts',
      image: '🍫',
      rating: 4.9,
      prepTime: 8
    },
    {
      id: 20,
      name: 'Teleporting Tiramisu',
      description: 'Layers that transport your taste buds to different dimensions',
      price: 799,
      category: 'desserts',
      image: '🍰',
      rating: 4.8,
      prepTime: 12
    },
    {
      id: 21,
      name: 'Quantum Ice Cream',
      description: 'Superposition flavor - vanilla and chocolate until observed',
      price: 549,
      category: 'desserts',
      image: '🍦',
      rating: 4.7,
      prepTime: 5
    },
    {
      id: 22,
      name: 'Holographic Cheesecake',
      description: 'Appears differently to each diner based on their favorite memories',
      price: 849,
      category: 'desserts',
      image: '🍰',
      rating: 4.6,
      prepTime: 10
    },
    {
      id: 23,
      name: 'Time-Dilation Donuts',
      description: 'Each bite extends the sweetness experience by 5 minutes',
      price: 449,
      category: 'desserts',
      image: '🍩',
      rating: 4.5,
      prepTime: 7
    },
    {
      id: 24,
      name: 'Levitating Soufflé',
      description: 'Anti-gravity soufflé that floats above your plate while you eat',
      price: 899,
      category: 'desserts',
      image: '🧁',
      rating: 4.9,
      prepTime: 15
    },
    {
      id: 25,
      name: 'Digital Macarons',
      description: 'Color-changing macarons with programmable flavor sequences',
      price: 649,
      category: 'desserts',
      image: '🍪',
      rating: 4.4,
      prepTime: 6
    },

    // Beverages
    {
      id: 26,
      name: 'Mood-Sync Mocktail',
      description: 'Color-changing beverage that responds to ambient lighting and music',
      price: 399,
      category: 'beverages',
      image: '🍹',
      rating: 4.6,
      prepTime: 5
    },
    {
      id: 27,
      name: 'Quantum Coffee',
      description: 'Coffee beans from parallel universes blended to perfection',
      price: 299,
      category: 'beverages',
      image: '☕',
      rating: 4.8,
      prepTime: 3
    },
    {
      id: 28,
      name: 'Holographic Tea',
      description: 'Traditional tea leaves with AR steam patterns and floating cups',
      price: 249,
      category: 'beverages',
      image: '🍵',
      rating: 4.5,
      prepTime: 4
    },
    {
      id: 29,
      name: 'Levitating Lemonade',
      description: 'Self-stirring lemonade with gravity-defying ice cubes',
      price: 349,
      category: 'beverages',
      image: '🍋',
      rating: 4.4,
      prepTime: 3
    },
    {
      id: 30,
      name: 'Time-Warped Wine',
      description: 'Aged through temporal acceleration for centuries of flavor in minutes',
      price: 1299,
      category: 'beverages',
      image: '🍷',
      rating: 4.9,
      prepTime: 2
    },
    {
      id: 31,
      name: 'Neural Smoothie',
      description: 'Adapts nutrients based on your body\'s real-time health data',
      price: 449,
      category: 'beverages',
      image: '🥤',
      rating: 4.7,
      prepTime: 6
    },
    {
      id: 32,
      name: 'Quantum Bubble Tea',
      description: 'Pearls exist in superposition until you bite them',
      price: 399,
      category: 'beverages',
      image: '🧋',
      rating: 4.6,
      prepTime: 4
    },
    {
      id: 33,
      name: 'Digital Energy Drink',
      description: 'Downloads energy directly to your nervous system via nano-particles',
      price: 549,
      category: 'beverages',
      image: '⚡',
      rating: 4.5,
      prepTime: 2
    }
  ];

  const filteredItems = selectedCategory === 'popular' 
    ? menuItems.filter(item => item.isPopular)
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 touch-manipulation ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white/10 backdrop-blur-lg text-gray-300 hover:text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <span className="text-lg md:text-xl">{category.icon}</span>
            <span className="font-medium text-sm md:text-base">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/20 hover:bg-white/15 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 touch-manipulation"
          >
            {/* Item Image & Badge */}
            <div className="relative mb-3 md:mb-4">
              <div className="text-4xl md:text-6xl text-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
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
            <div className="space-y-2 md:space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2">
                {item.description}
              </p>

              {/* Rating & Time */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                  <span>{item.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{item.prepTime} min</span>
                </div>
                {item.spiceLevel && (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                          i < item.spiceLevel ? 'bg-red-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Add Button */}
              <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/20">
                <span className="text-lg md:text-2xl font-bold text-cyan-400">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => onAddToOrder(item)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 md:px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 touch-manipulation min-h-[44px]"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm md:text-base">Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
