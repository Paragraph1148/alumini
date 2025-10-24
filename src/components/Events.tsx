import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Calendar, MapPin, Users, Clock, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "./AuthContext";

const events = [
  {
    id: 1,
    title: "Annual Alumni Gala 2025",
    date: "November 15, 2025",
    time: "6:00 PM - 11:00 PM",
    location: "Grand Hotel Ballroom",
    attendees: 250,
    category: "Networking",
    image: "https://images.unsplash.com/photo-1758599543157-bc1a94fec33c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG5ldHdvcmtpbmd8ZW58MXx8fHwxNzYxMTg2MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Career Development Workshop",
    date: "November 5, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    attendees: 180,
    category: "Professional Development",
    image: "https://images.unsplash.com/photo-1573165231977-3f0e27806045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwbWVldGluZ3xlbnwxfHx8fDE3NjExNTk1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Homecoming Weekend 2025",
    date: "December 1-3, 2025",
    time: "All Day",
    location: "University Campus",
    attendees: 500,
    category: "Reunion",
    image: "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYxMTU0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "upcoming"
  }
];

export function Events() {
  const { isModerator } = useAuth();

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl">Upcoming Events</h2>
                {isModerator() && (
                  <Badge variant="secondary" className="h-6">
                    <Shield className="h-3 w-3 mr-1" />
                    Moderator
                  </Badge>
                )}
              </div>
              <p className="text-lg text-gray-600">
                Stay connected through our exclusive alumni gatherings
              </p>
            </div>
            <Button>View All Events</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                    {event.category}
                  </Badge>
                </div>
                <CardHeader>
                  <h3 className="line-clamp-2">{event.title}</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    <span>{event.attendees} attending</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Register Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
