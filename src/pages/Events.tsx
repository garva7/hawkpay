import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, Users, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Event {
  id: string;
  title: string;
  category: 'course' | 'event' | 'workshop';
  date: string;
  time: string;
  location: string;
  instructor: string;
  participants: number;
  maxParticipants: number;
  price: number;
  status: 'enrolled' | 'completed' | 'upcoming';
  rating?: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Advanced React Development',
    category: 'course',
    date: '2024-02-15',
    time: '10:00 AM',
    location: 'Computer Lab 101',
    instructor: 'Dr. Sarah Johnson',
    participants: 24,
    maxParticipants: 30,
    price: 150,
    status: 'enrolled',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Campus Career Fair 2024',
    category: 'event',
    date: '2024-02-20',
    time: '9:00 AM',
    location: 'Main Auditorium',
    instructor: 'Career Services',
    participants: 150,
    maxParticipants: 200,
    price: 0,
    status: 'enrolled'
  },
  {
    id: '3',
    title: 'Digital Marketing Workshop',
    category: 'workshop',
    date: '2024-01-30',
    time: '2:00 PM',
    location: 'Business Building 205',
    instructor: 'Prof. Michael Chen',
    participants: 18,
    maxParticipants: 25,
    price: 75,
    status: 'completed',
    rating: 4.5
  }
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'course':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'event':
        return 'bg-success/10 text-success border-success/20';
      case 'workshop':
        return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'enrolled':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'upcoming':
        return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">My Events & Courses</h1>
          <p className="text-muted-foreground">Manage your enrolled courses and upcoming events</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Register New Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register for New Event</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>Event registration system coming soon!</p>
              <p className="text-sm mt-2">You'll be able to browse and register for new courses and events here.</p>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedEvent(event)}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  <Badge variant="outline" className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  {event.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{event.rating}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{event.participants}/{event.maxParticipants} participants</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Instructor</span>
                    <span className="text-sm font-medium">{event.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-sm font-medium">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className={getCategoryColor(selectedEvent.category)}>
                    {selectedEvent.category}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(selectedEvent.status)}>
                    {selectedEvent.status}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-muted-foreground">Instructor: </span>
                      <span className="font-medium">{selectedEvent.instructor}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Participants: </span>
                      <span className="font-medium">{selectedEvent.participants}/{selectedEvent.maxParticipants}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price: </span>
                      <span className="font-medium">
                        {selectedEvent.price === 0 ? 'Free' : `$${selectedEvent.price}`}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedEvent.status === 'enrolled' && (
                  <div className="pt-4 border-t">
                    <Button className="w-full" disabled>
                      Already Enrolled
                    </Button>
                  </div>
                )}
                
                {selectedEvent.status === 'completed' && selectedEvent.rating && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Your Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{selectedEvent.rating}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}