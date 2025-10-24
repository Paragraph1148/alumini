import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Briefcase, MapPin, DollarSign, Clock, Building2 } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150K - $200K",
    posted: "2 days ago",
    postedBy: "Sarah Johnson '18",
    tags: ["Product", "Management", "SaaS"]
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Innovation Labs",
    location: "Remote",
    type: "Full-time",
    salary: "$120K - $180K",
    posted: "5 days ago",
    postedBy: "Michael Chen '15",
    tags: ["Engineering", "React", "Node.js"]
  },
  {
    id: 3,
    title: "Marketing Director",
    company: "Growth Marketing Co.",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130K - $170K",
    posted: "1 week ago",
    postedBy: "Emily Rodriguez '20",
    tags: ["Marketing", "Growth", "B2B"]
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$140K - $190K",
    posted: "3 days ago",
    postedBy: "Alex Thompson '16",
    tags: ["Data Science", "ML", "Python"]
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Contract",
    salary: "$100K - $140K",
    posted: "4 days ago",
    postedBy: "Alumni Network",
    tags: ["Design", "UX", "Figma"]
  },
  {
    id: 6,
    title: "Financial Analyst",
    company: "Finance Partners",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$90K - $120K",
    posted: "1 week ago",
    postedBy: "Alumni Career Services",
    tags: ["Finance", "Analysis", "Excel"]
  }
];

export function JobBoard() {
  return (
    <section id="jobs" className="py-16 bg-white">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl">Job Board</h2>
              <p className="text-lg text-gray-600">
                Exclusive opportunities shared by fellow alumni
              </p>
            </div>
            <Button variant="outline">Post a Job</Button>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="line-clamp-1">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 flex-shrink-0" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 flex-shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600">
                    Posted by <span className="text-blue-600">{job.postedBy}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button variant="outline" size="lg">
              View All Jobs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
