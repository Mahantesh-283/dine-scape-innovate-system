import { useState, useEffect } from 'react';
import { Play, Calendar, Trophy, Users, Clock, Star, GamepadIcon, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useUserActivities } from '@/hooks/useUserActivities';
import { supabase } from '@/integrations/supabase/client';

const Entertainment = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const { toast } = useToast();
  const { createActivity, getTotalScore, activities } = useUserActivities();

  useEffect(() => {
    fetchLiveEvents();
  }, []);

  const fetchLiveEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('entertainment_events')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setLiveEvents(data || []);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      // Fallback to static data
      setLiveEvents([
        {
          id: 1,
          title: "Jazz Night",
          start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
          description: "Live jazz performance by The Smooth Collective",
          event_type: "live_event",
          status: "live",
          current_participants: 156,
          max_participants: 200
        },
        {
          id: 2,
          title: "Wine Tasting",
          start_time: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
          description: "Curated wine tasting with Sommelier Marie",
          event_type: "wine_tasting",
          status: "upcoming",
          current_participants: 2,
          max_participants: 8
        }
      ]);
    } finally {
      setEventsLoading(false);
    }
  };

  const games = [
    {
      id: 1,
      name: "Restaurant Trivia",
      description: "Test your culinary knowledge",
      players: "1-8 players",
      duration: "15 min",
      difficulty: "Medium",
      icon: "🧠",
      category: "trivia"
    },
    {
      id: 2,
      name: "Menu Memory",
      description: "Remember the dishes you've seen",
      players: "1-4 players",
      duration: "10 min",
      difficulty: "Easy",
      icon: "🧩",
      category: "memory"
    },
    {
      id: 3,
      name: "Recipe Puzzle",
      description: "Solve cooking challenges",
      players: "1-2 players",
      duration: "20 min",
      difficulty: "Hard",
      icon: "🔧",
      category: "puzzle"
    },
    {
      id: 4,
      name: "Table Talk",
      description: "Conversation starter cards",
      players: "2+ players",
      duration: "30 min",
      difficulty: "Easy",
      icon: "💭",
      category: "social"
    }
  ];

  const startGame = async (gameId: number) => {
    setSelectedGame(gameId);
    const game = games.find(g => g.id === gameId);
    
    // Record activity
    await createActivity({
      activity_type: 'game_played',
      activity_data: { game_name: game?.name, game_id: gameId },
      score: 25,
      completed: true,
    });

    toast({
      title: "Game Started! 🎮",
      description: `Starting ${game?.name}. +25 points earned!`,
    });
  };

  const joinEvent = async (eventId: number) => {
    const event = liveEvents.find(e => e.id === eventId);
    
    // Record activity
    await createActivity({
      activity_type: 'event_joined',
      activity_data: { event_name: event?.title, event_id: eventId },
      score: 50,
      completed: true,
    });

    toast({
      title: "Event Joined! 🎉",
      description: `You've joined ${event?.title}. +50 points earned!`,
    });
  };

  const completeChallenge = async (challengeName: string, points: number) => {
    await createActivity({
      activity_type: 'challenge_completed',
      activity_data: { challenge_name: challengeName },
      score: points,
      completed: true,
    });

    toast({
      title: "Challenge Completed! 🏆",
      description: `+${points} points earned!`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4 pb-6">
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Live Events</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4 mt-4">
          {/* User Score Display */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Your Score</h4>
                  <p className="text-2xl font-bold text-primary">{getTotalScore()} points</p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          {/* Live Events */}
          {eventsLoading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading events...</p>
              </CardContent>
            </Card>
          ) : (
            liveEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="flex-1 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Badge 
                          variant={event.status === 'live' ? 'default' : 'secondary'}
                          className={event.status === 'live' ? 'bg-red-500 animate-pulse' : ''}
                        >
                          {event.status === 'live' ? '🔴 LIVE' : '⏰ Upcoming'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {event.start_time ? 
                              new Date(event.start_time).toLocaleString() : 
                              'Time TBA'
                            }
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.current_participants || 0} / {event.max_participants || 'unlimited'} participants
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-xs mt-2">{event.description}</p>
                        )}
                      </div>

                    <Button
                      onClick={() => joinEvent(event.id)}
                      className="w-full"
                      variant={event.status === 'live' ? 'default' : 'outline'}
                    >
                      {event.status === 'live' ? 'Join Live Event' : 'Reserve Seat'}
                    </Button>
                  </div>
                  
                    <div className="w-20 h-20 m-4 bg-primary/10 rounded-lg flex items-center justify-center text-3xl">
                      {event.event_type === 'live_event' ? '🎤' : 
                       event.event_type === 'wine_tasting' ? '🍷' : '🎉'}
                    </div>
                </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="games" className="space-y-4 mt-4">
          {/* Interactive Games */}
          <div className="grid gap-4">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      {game.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{game.name}</h3>
                        <div className={`w-2 h-2 rounded-full ${getDifficultyColor(game.difficulty)}`} />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{game.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {game.players}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {game.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {game.difficulty}
                        </Badge>
                      </div>
                      
                      <Button
                        onClick={() => startGame(game.id)}
                        className="w-full"
                        variant={selectedGame === game.id ? 'default' : 'outline'}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {selectedGame === game.id ? 'Playing...' : 'Start Game'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4 mt-4">
          {/* Other Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Today's Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Photo Challenge</p>
                  <p className="text-sm text-muted-foreground">Share a photo of your meal</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => completeChallenge('Photo Challenge', 50)}
                >
                  +50 pts
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Review Challenge</p>
                  <p className="text-sm text-muted-foreground">Leave a 5-star review</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => completeChallenge('Review Challenge', 100)}
                >
                  +100 pts
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Social Challenge</p>
                  <p className="text-sm text-muted-foreground">Tag 3 friends on social media</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => completeChallenge('Social Challenge', 75)}
                >
                  +75 pts
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-medium">Cooking Class</p>
                <p className="text-sm text-muted-foreground">Saturday 2:00 PM</p>
                <p className="text-xs text-muted-foreground">Learn to make pasta from scratch</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-medium">Live Music</p>
                <p className="text-sm text-muted-foreground">Sunday 7:00 PM</p>
                <p className="text-xs text-muted-foreground">Acoustic guitar performance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Entertainment;
