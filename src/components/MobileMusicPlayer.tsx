import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  coverArt: string;
}

const playlist: Track[] = [
  { id: 1, title: "Ambient Dining", artist: "Restaurant Vibes", duration: "3:24", coverArt: "🎵" },
  { id: 2, title: "Jazz Lounge", artist: "Smooth Collective", duration: "4:12", coverArt: "🎷" },
  { id: 3, title: "Classical Evening", artist: "String Quartet", duration: "5:33", coverArt: "🎻" },
  { id: 4, title: "Chill House", artist: "Electronic Café", duration: "3:45", coverArt: "🎧" },
];

const MobileMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const duration = parseInt(playlist[currentTrack].duration.split(':')[0]) * 60 + 
                          parseInt(playlist[currentTrack].duration.split(':')[1]);
          if (prev >= duration) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDuration = (duration: string) => {
    const [mins, secs] = duration.split(':').map(Number);
    return mins * 60 + secs;
  };

  const track = playlist[currentTrack];

  return (
    <div className="space-y-4">
      {/* Now Playing Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center text-2xl">
              {track.coverArt}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{track.title}</h3>
              <p className="text-muted-foreground truncate">{track.artist}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-4">
            <Slider
              value={[currentTime]}
              max={getDuration(track.duration)}
              step={1}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShuffle(!shuffle)}
              className={shuffle ? 'text-primary' : 'text-muted-foreground'}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={prevTrack}>
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={nextTrack}>
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRepeat(!repeat)}
              className={repeat ? 'text-primary' : 'text-muted-foreground'}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8">{volume}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Playlist */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3">Restaurant Playlist</h4>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <div
                key={track.id}
                onClick={() => setCurrentTrack(index)}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  index === currentTrack ? 'bg-primary/10' : 'hover:bg-muted'
                }`}
              >
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm">
                  {index === currentTrack && isPlaying ? (
                    <div className="flex space-x-0.5">
                      <div className="w-1 h-3 bg-primary animate-pulse"></div>
                      <div className="w-1 h-2 bg-primary animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  ) : (
                    track.coverArt
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    index === currentTrack ? 'text-primary' : ''
                  }`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
                <span className="text-xs text-muted-foreground">{track.duration}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileMusicPlayer;