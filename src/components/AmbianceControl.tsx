import { useState } from 'react';
import { Lightbulb, Thermometer, Volume2, Wind, Palette, Sun, Moon, Save, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAmbianceSettings } from '@/hooks/useAmbianceSettings';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AmbianceControl = () => {
  const [lighting, setLighting] = useState(75);
  const [temperature, setTemperature] = useState(22);
  const [musicVolume, setMusicVolume] = useState(60);
  const [ventilation, setVentilation] = useState(50);
  const [selectedMood, setSelectedMood] = useState('cozy');
  const [presetName, setPresetName] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { toast } = useToast();
  const { settings, loading, saveSettings, deleteSettings } = useAmbianceSettings();

  const moods = [
    { id: 'romantic', name: 'Romantic', icon: '💕', color: 'from-pink-500 to-rose-500' },
    { id: 'cozy', name: 'Cozy', icon: '🕯️', color: 'from-orange-500 to-amber-500' },
    { id: 'energetic', name: 'Energetic', icon: '⚡', color: 'from-blue-500 to-cyan-500' },
    { id: 'elegant', name: 'Elegant', icon: '✨', color: 'from-purple-500 to-indigo-500' },
    { id: 'casual', name: 'Casual', icon: '😊', color: 'from-green-500 to-teal-500' },
  ];

  const applyPreset = (mood: string) => {
    setSelectedMood(mood);
    
    const presets = {
      romantic: { lighting: 30, temperature: 20, musicVolume: 40, ventilation: 30 },
      cozy: { lighting: 50, temperature: 22, musicVolume: 60, ventilation: 40 },
      energetic: { lighting: 90, temperature: 24, musicVolume: 80, ventilation: 70 },
      elegant: { lighting: 65, temperature: 21, musicVolume: 50, ventilation: 45 },
      casual: { lighting: 75, temperature: 23, musicVolume: 65, ventilation: 55 },
    };

    const preset = presets[mood as keyof typeof presets];
    setLighting(preset.lighting);
    setTemperature(preset.temperature);
    setMusicVolume(preset.musicVolume);
    setVentilation(preset.ventilation);

    toast({
      title: "Ambiance Updated",
      description: `Applied ${mood} mood settings`,
    });
  };

  const applySavedPreset = (preset: any) => {
    setLighting(preset.lighting_level);
    setTemperature(preset.temperature);
    setMusicVolume(preset.music_volume);
    setVentilation(preset.air_flow);
    setSelectedMood('custom');

    toast({
      title: "Preset Applied",
      description: `Applied ${preset.preset_name} settings`,
    });
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a preset name",
        variant: "destructive",
      });
      return;
    }

    await saveSettings({
      preset_name: presetName,
      lighting_level: lighting,
      temperature: temperature,
      music_volume: musicVolume,
      air_flow: ventilation,
      is_default: false,
    });

    setPresetName('');
    setSaveDialogOpen(false);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Mood Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Mood Presets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.id}
                variant={selectedMood === mood.id ? "default" : "outline"}
                onClick={() => applyPreset(mood.id)}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <span className="text-2xl">{mood.icon}</span>
                <span className="text-sm font-medium">{mood.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lighting Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>Lighting</span>
            </div>
            <Badge variant="secondary">{lighting}%</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={[lighting]}
            max={100}
            step={1}
            onValueChange={(value) => setLighting(value[0])}
            className="w-full"
          />
          <div className="flex justify-between space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLighting(20)}
              className="flex items-center space-x-1"
            >
              <Moon className="h-3 w-3" />
              <span>Dim</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLighting(100)}
              className="flex items-center space-x-1"
            >
              <Sun className="h-3 w-3" />
              <span>Bright</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Temperature Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5" />
              <span>Temperature</span>
            </div>
            <Badge variant="secondary">{temperature}°C</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[temperature]}
            min={18}
            max={28}
            step={0.5}
            onValueChange={(value) => setTemperature(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>18°C</span>
            <span>28°C</span>
          </div>
        </CardContent>
      </Card>

      {/* Music Volume */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <span>Music Volume</span>
            </div>
            <Badge variant="secondary">{musicVolume}%</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[musicVolume]}
            max={100}
            step={1}
            onValueChange={(value) => setMusicVolume(value[0])}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Ventilation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5" />
              <span>Air Flow</span>
            </div>
            <Badge variant="secondary">{ventilation}%</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[ventilation]}
            max={100}
            step={1}
            onValueChange={(value) => setVentilation(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Still</span>
            <span>Breezy</span>
          </div>
        </CardContent>
      </Card>

      {/* Saved Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Saved Presets</span>
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Current Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="preset-name">Preset Name</Label>
                    <Input
                      id="preset-name"
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      placeholder="Enter preset name"
                    />
                  </div>
                  <Button onClick={handleSavePreset} className="w-full">
                    Save Preset
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-center py-4">Loading presets...</p>
          ) : settings.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No saved presets yet</p>
          ) : (
            <div className="space-y-2">
              {settings.map((preset) => (
                <div key={preset.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{preset.preset_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Light: {preset.lighting_level}% • Temp: {preset.temperature}°C • Volume: {preset.music_volume}%
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => applySavedPreset(preset)}
                    >
                      Apply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteSettings(preset.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <span>Current Ambiance</span>
            <Badge className="capitalize">{selectedMood}</Badge>
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lighting:</span>
              <span className="font-medium">{lighting}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temperature:</span>
              <span className="font-medium">{temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Music:</span>
              <span className="font-medium">{musicVolume}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Air Flow:</span>
              <span className="font-medium">{ventilation}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmbianceControl;