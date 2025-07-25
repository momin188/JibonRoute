import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, MapPin, Clock } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Rashida Begum",
      location: "Dhanmondi",
      rating: 5,
      date: "2 days ago",
      review: "JibonRoute saved my husband's life during his heart attack. The ambulance arrived in just 6 minutes with full ICU equipment. The staff was professional and the tracking feature kept me informed throughout the journey.",
      service: "ICU Ambulance",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Dr. Mahmud Hassan",
      location: "Gulshan",
      rating: 5,
      date: "1 week ago",
      review: "As a doctor, I appreciate JibonRoute's coordination with hospitals. They send patient details ahead of time, which helps us prepare better. The app is user-friendly and the pricing is transparent.",
      service: "Paramedic Ambulance",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Fatima Khatun",
      location: "Uttara",
      rating: 5,
      date: "3 days ago",
      review: "My mother needed emergency transport to the hospital at midnight. JibonRoute's 24/7 service was incredible. The AC ambulance was clean, well-equipped, and the paramedic was very caring.",
      service: "AC Ambulance",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Rafiq Ahmed",
      location: "Old Dhaka",
      rating: 5,
      date: "5 days ago",
      review: "Traffic in Dhaka is terrible, but JibonRoute's AI routing helped the ambulance reach us quickly through alternative routes. The real-time tracking gave us peace of mind during a stressful time.",
      service: "Basic Ambulance",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "Nasreen Akter",
      location: "Mirpur",
      rating: 5,
      date: "1 week ago",
      review: "The best ambulance service in Dhaka! Quick response, professional staff, and reasonable pricing. The app made booking so easy even during an emergency. Highly recommended!",
      service: "Paramedic Ambulance",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      name: "Mohammad Karim",
      location: "Wari",
      rating: 5,
      date: "4 days ago",
      review: "JibonRoute's hospital coordination feature is amazing. They contacted the hospital beforehand and everything was ready when we arrived. This saved precious time and potentially saved a life.",
      service: "ICU Ambulance",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const stats = [
    { label: "Happy Patients", value: "10,000+", icon: "👥" },
    { label: "Average Rating", value: "4.9/5", icon: "⭐" },
    { label: "Response Time", value: "< 8 min", icon: "⚡" },
    { label: "Success Rate", value: "99.2%", icon: "✅" }
  ];

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-life-green">Patients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who trusted JibonRoute in their time of need
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-muted-foreground/20" />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback className="bg-life-green/10 text-life-green font-semibold">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">{review.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {review.location}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {review.service}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-muted-foreground/30'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {review.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{review.review}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join thousands of satisfied patients who trust JibonRoute
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="text-sm text-muted-foreground">
              ⭐ 4.9/5 rating • 10,000+ happy patients • 99.2% success rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;