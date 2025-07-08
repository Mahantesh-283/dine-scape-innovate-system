
import React, { useState } from 'react';
import { Palette, Music, Lightbulb, Thermometer, Volume2 } from 'lucide-react';

interface AmbientControlsProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const AmbientControls: React.FC<AmbientControlsProps> = ({
  currentTheme,
  onThemeChange
}) => {
  const [lightingIntensity, setLightingIntensity] = useState(70);
  const [temperature, setTemperature] = useState(22);
  const [volume, setVolume] = useState(60);

  const ambientThemes = [
    {
      id: 'romantic',
      name: 'Romantic Evening',
      description: 'Soft pink lighting with gentle jazz music',
      colors: ['#FF6B9D', '#FF8E8E', '#FFB4B4'],
      icon: '💕'
    },
    {
      id: 'party',
      name: 'Party Vibes',
      description: 'Dynamic RGB lights with upbeat music',
      colors: ['#9D4EDD', '#FF006E', '#FB8500'],
      icon: '🎉'
    },
    {
      id: 'calm',
      name: 'Zen Garden',
      description: 'Cool blue-green tones with nature sounds',
      colors: ['#06FFA5', '#1CFFC5', '#39E5FF'],
      icon: '🧘'
    },
    {
      id: 'elegant',
      name: 'Golden Hour',
      description: 'Warm golden lighting with classical ambience',
      colors: ['#FFD700', '#FFA500', '#FF8C42'],
      icon: '✨'
    },
    {
      id: 'default',
      name: 'Smart Table Default',
      description: 'Futuristic cyan-blue theme',
      colors: ['#06B6D4', '#3B82F6', '#8B5CF6'],
      icon: '🤖'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <Palette className="w-6 h-6 text-cyan-400" />
          <span>Ambient Themes</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ambientThemes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                currentTheme === theme.id
                  ? 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/25'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }`}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl">{theme.icon}</div>
                <h3 className="text-lg font-bold text-white">{theme.name}</h3>
                <p className="text-gray-300 text-sm">{theme.description}</p>
                
                {/* Color Preview */}
                <div className="flex justify-center space-x-2">
                  {theme.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                {currentTheme === theme.id && (
                  <div className="text-cyan-400 font-semibold text-sm">
                    ✓ Currently Active
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lighting Control */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Lighting</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Intensity</span>
              <span className="text-white font-semibold">{lightingIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={lightingIntensity}
              onChange={(e) => setLightingIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Dim</span>
              <span>Bright</span>
            </div>
          </div>
        </div>

        {/* Temperature Control */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <Thermometer className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-white">Temperature</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Climate</span>
              <span className="text-white font-semibold">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="16"
              max="28"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Cool</span>
              <span>Warm</span>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <Volume2 className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-white">Audio</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Volume</span>
              <span className="text-white font-semibold">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Silent</span>
              <span>Loud</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Dinner Mode', icon: '🕯️', action: () => {} },
            { name: 'Celebration', icon: '🎊', action: () => {} },
            { name: 'Business Meet', icon: '💼', action: () => {} },
            { name: 'Date Night', icon: '🌹', action: () => {} }
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={preset.action}
              className="bg-white/5 hover:bg-white/15 border border-white/20 hover:border-cyan-500/50 rounded-xl p-4 text-center transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-2xl mb-2">{preset.icon}</div>
              <div className="text-white text-sm font-medium">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
