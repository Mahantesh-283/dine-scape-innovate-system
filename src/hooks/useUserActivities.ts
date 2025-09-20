import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserActivity {
  id?: string;
  activity_type: string;
  activity_data: any;
  score: number;
  completed: boolean;
  completed_at?: string;
  created_at?: string;
}

export const useUserActivities = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchActivities = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load activities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (activity: Omit<UserActivity, 'id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_activities')
        .insert({
          ...activity,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setActivities(prev => [data, ...prev]);
      toast({
        title: "Activity Recorded",
        description: `+${activity.score} points earned!`,
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to record activity",
        variant: "destructive",
      });
    }
  };

  const completeActivity = async (id: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_activities')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setActivities(prev => prev.map(a => a.id === id ? data : a));
      toast({
        title: "Activity Completed!",
        description: "Great job! Keep it up!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to complete activity",
        variant: "destructive",
      });
    }
  };

  const getTotalScore = () => {
    return activities
      .filter(a => a.completed)
      .reduce((total, activity) => total + activity.score, 0);
  };

  useEffect(() => {
    fetchActivities();
  }, [user]);

  return {
    activities,
    loading,
    createActivity,
    completeActivity,
    getTotalScore,
    refetch: fetchActivities,
  };
};