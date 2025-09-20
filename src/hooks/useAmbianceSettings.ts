import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface AmbianceSettings {
  id?: string;
  preset_name: string;
  lighting_level: number;
  temperature: number;
  music_volume: number;
  air_flow: number;
  is_default: boolean;
}

export const useAmbianceSettings = () => {
  const [settings, setSettings] = useState<AmbianceSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSettings = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('ambiance_settings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSettings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load ambiance settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: Omit<AmbianceSettings, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ambiance_settings')
        .insert({
          ...newSettings,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setSettings(prev => [data, ...prev]);
      toast({
        title: "Settings Saved",
        description: `Saved ${newSettings.preset_name} preset`,
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };

  const updateSettings = async (id: string, updates: Partial<AmbianceSettings>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ambiance_settings')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setSettings(prev => prev.map(s => s.id === id ? data : s));
      toast({
        title: "Settings Updated",
        description: "Your preset has been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const deleteSettings = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('ambiance_settings')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setSettings(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Preset Deleted",
        description: "Your preset has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete preset",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user]);

  return {
    settings,
    loading,
    saveSettings,
    updateSettings,
    deleteSettings,
    refetch: fetchSettings,
  };
};