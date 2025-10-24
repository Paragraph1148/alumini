import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const news = [
  {
    id: 1,
    title: "Alumni Network Reaches 50,000 Members Milestone",
    excerpt: "Our community continues to grow with successful professionals joining from around the world.",
    category: "Announcement",
    date: "October 20, 2025",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Class of 2015 Reunion: A Decade of Success Stories",
    excerpt: "Celebrating 10 years since graduation with inspiring stories of achievement and growth.",
    category: "Events",
    date: "October 18, 2025",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "New Mentorship Program Launched for Recent Graduates",
    excerpt: "Connect with experienced alumni to accelerate your career development and professional growth.",
    category: "Programs",
    date: "October 15, 2025",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "Alumni Spotlight: Sarah Johnson's Journey to Tech Leadership",
    excerpt: "From computer science student to senior engineer at Google, Sarah shares her inspiring journey.",
    category: "Spotlight",
    date: "October 12, 2025",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Industry Insights: The Future of AI and Technology",
    excerpt: "Leading alumni experts share their perspectives on emerging trends in artificial intelligence.",
    category: "Insights",
    date: "October 10, 2025",
    readTime: "7 min read"
  },
  {
    id: 6,
    title: "Annual Giving Campaign Exceeds $5M Goal",
    excerpt: "Thanks to generous alumni contributions, we've surpassed our fundraising goal for scholarship programs.",
    category: "Giving",
    date: "October 8, 2025",
    readTime: "3 min read"
  }
];

export function NewsSection() {
  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl">Latest News & Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with updates, achievements, and inspiring stories from our community
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button variant="outline" size="lg">
              Read More Articles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
