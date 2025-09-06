import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Music } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  album: string;
  genre: string;
}

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes default
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one

  const tracks: Track[] = [
    { id: 1, title: 'Ambient Dining', artist: 'FutureSounds', duration: '3:24', album: 'Restaurant Vibes', genre: 'Ambient' },
    { id: 2, title: 'Quantum Beats', artist: 'TechnoChef', duration: '4:12', album: 'Digital Kitchen', genre: 'Electronic' },
    { id: 3, title: 'Holographic Jazz', artist: 'Neo-Swing', duration: '5:08', album: 'Virtual Lounge', genre: 'Jazz' },
    { id: 4, title: 'Neural Harmony', artist: 'AI Orchestra', duration: '3:45', album: 'Machine Dreams', genre: 'Classical' },
    { id: 5, title: 'Cyber Chill', artist: 'DataBeats', duration: '4:33', album: 'Binary Relaxation', genre: 'Chillout' },
    { id: 6, title: 'Molecular Music', artist: 'Sonic Chemistry', duration: '3:56', album: 'Lab Sessions', genre: 'Experimental' },
    { id: 7, title: 'Levitating Love', artist: 'Gravity Defied', duration: '4:21', album: 'Weightless Romance', genre: 'Pop' },
    { id: 8, title: 'Blockchain Blues', artist: 'Crypto Kings', duration: '3:18', album: 'Decentralized Soul', genre: 'Blues' }
  ];

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime(prev => {
          if (prev >= duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTime > 10) {
      setCurrentTime(0);
    } else {
      setCurrentTrack(prev => prev === 0 ? tracks.length - 1 : prev - 1);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    if (repeatMode === 2) {
      setCurrentTime(0);
      return;
    }

    if (isShuffling) {
      const randomTrack = Math.floor(Math.random() * tracks.length);
      setCurrentTrack(randomTrack);
    } else {
      if (currentTrack === tracks.length - 1) {
        if (repeatMode === 1) {
          setCurrentTrack(0);
        } else {
          setIsPlaying(false);
        }
      } else {
        setCurrentTrack(prev => prev + 1);
      }
    }
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Smart Player</h3>
            <p className="text-sm text-gray-400">Restaurant Ambiance</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-cyan-400">{tracks.length} tracks</p>
          <p className="text-xs text-gray-500">Premium Quality</p>
        </div>
      </div>

      {/* Current Track Info */}
      <div className="bg-white/10 rounded-2xl p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center animate-pulse">
            <Music className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg">{tracks[currentTrack]?.title}</h4>
            <p className="text-gray-300 text-sm">{tracks[currentTrack]?.artist}</p>
            <p className="text-gray-400 text-xs">{tracks[currentTrack]?.album} • {tracks[currentTrack]?.genre}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{tracks[currentTrack]?.duration || '3:24'}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsShuffling(!isShuffling)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isShuffling 
                ? 'bg-cyan-500 text-white' 
                : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrevious}
            className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300"
          >
            <SkipBack className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={togglePlay}
          className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleNext}
            className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <button
            onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
            className={`p-2 rounded-full transition-all duration-300 ${
              repeatMode > 0 
                ? 'bg-cyan-500 text-white' 
                : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
            }`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === 2 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white">1</span>
            )}
          </button>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3 mb-4">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <span className="text-sm text-gray-400 w-12 text-right">{volume}%</span>
      </div>

      {/* Track List */}
      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
        <h5 className="text-sm font-semibold text-gray-300 mb-3">Playlist</h5>
        {tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => {
              setCurrentTrack(index);
              setCurrentTime(0);
              setIsPlaying(true);
            }}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
              index === currentTrack
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                index === currentTrack ? 'bg-cyan-500' : 'bg-gray-600'
              }`}>
                {index === currentTrack && isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  index === currentTrack ? 'text-cyan-400' : 'text-white'
                }`}>
                  {track.title}
                </p>
                <p className="text-xs text-gray-400">{track.artist}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{track.duration}</span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          border-radius: 2px;
        }
        `
      }} />
    </div>
  );
};