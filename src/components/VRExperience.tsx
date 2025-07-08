
import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Eye, Globe } from 'lucide-react';

export const VRExperience: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const vrExperiences = [
    {
      id: 1,
      title: 'Underwater Dining',
      description: 'Immerse yourself in an ocean depths restaurant with marine life swimming around',
      duration: '15 min',
      category: 'Environment',
      thumbnail: '🌊',
      type: 'VR'
    },
    {
      id: 2,
      title: 'Space Station Cafe',
      description: 'Float in zero gravity while enjoying your meal with Earth views',
      duration: '20 min',
      category: 'Sci-Fi',
      thumbnail: '🚀',
      type: 'VR'
    },
    {
      id: 3,
      title: 'Ancient Rome Feast',
      description: 'Dine like emperors in a grand Roman banquet hall',
      duration: '25 min',
      category: 'Historical',
      thumbnail: '🏛️',
      type: 'VR'
    },
    {
      id: 4,
      title: 'Enchanted Forest',
      description: 'Magical woodland dining with fairy lights and mystical creatures',
      duration: '18 min',
      category: 'Fantasy',
      thumbnail: '🧚',
      type: 'VR'
    },
    {
      id: 5,
      title: 'Top Chef Kitchen',
      description: 'Watch master chefs prepare your meal in a professional kitchen',
      duration: '12 min',
      category: 'Documentary',
      thumbnail: '👨‍🍳',
      type: '360°'
    },
    {
      id: 6,
      title: 'Avengers: Endgame',
      description: 'Epic superhero adventure on the dining room walls',
      duration: '181 min',
      category: 'Movie',
      thumbnail: '🦸‍♂️',
      type: 'Wall Projection'
    }
  ];

  const categories = ['All', 'VR', '360°', 'Wall Projection'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredExperiences = activeCategory === 'All' 
    ? vrExperiences 
    : vrExperiences.filter(exp => exp.type === activeCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Immersive Entertainment</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Transform your dining space with VR experiences, 360° content, and wall projections 
          while you enjoy your meal
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/10 backdrop-blur-lg text-gray-300 hover:text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience) => (
          <div
            key={experience.id}
            className="group bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {experience.thumbnail}
              </div>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-lg rounded-full px-3 py-1 text-xs text-white font-medium">
                {experience.type}
              </div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-lg rounded-full px-3 py-1 text-xs text-white">
                {experience.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                  {experience.title}
                </h3>
                <p className="text-sm text-gray-300 mt-2">
                  {experience.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-sm text-purple-400 font-medium">
                  {experience.category}
                </span>
                <button
                  onClick={() => setSelectedExperience(experience)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-purple-500/25"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VR Controls Panel */}
      {selectedExperience && (
        <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Now Playing: {selectedExperience.title}</h3>
              <p className="text-gray-300">Immersive experience active</p>
            </div>
            <button
              onClick={() => setSelectedExperience(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Playback Controls */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Playback</span>
              </h4>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div className="flex-1 bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-1/3"></div>
                </div>
                <span className="text-white text-sm">5:23</span>
              </div>
            </div>

            {/* View Controls */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>View Mode</span>
              </h4>
              <div className="space-y-2">
                <button className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-300 py-2 px-4 rounded-lg text-sm">
                  VR Headset
                </button>
                <button className="w-full bg-white/10 border border-white/20 text-gray-300 hover:text-white py-2 px-4 rounded-lg text-sm transition-colors">
                  Wall Projection
                </button>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <span>Audio</span>
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">Volume</span>
                  <input type="range" className="flex-1 slider" />
                  <span className="text-white text-sm">75%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">3D Audio</span>
                  <div className="bg-purple-500 w-8 h-4 rounded-full relative">
                    <div className="bg-white w-3 h-3 rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
