import { useState, useMemo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, MapPin, Briefcase, Mail, Linkedin } from "lucide-react";
import { useSearch } from "./SearchContext";

const alumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    class: "2018",
    major: "Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    industries: ["Technology", "AI"]
  },
  {
    id: 2,
    name: "Michael Chen",
    class: "2015",
    major: "Business Administration",
    company: "Goldman Sachs",
    position: "VP of Finance",
    location: "New York, NY",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    industries: ["Finance", "Investment"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    class: "2020",
    major: "Marketing",
    company: "Meta",
    position: "Product Marketing Manager",
    location: "Austin, TX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    industries: ["Technology", "Marketing"]
  },
  {
    id: 4,
    name: "David Park",
    class: "2017",
    major: "Engineering",
    company: "Tesla",
    position: "Lead Engineer",
    location: "Palo Alto, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    industries: ["Engineering", "Automotive"]
  },
  {
    id: 5,
    name: "Jessica Williams",
    class: "2019",
    major: "Medicine",
    company: "Johns Hopkins",
    position: "Resident Physician",
    location: "Baltimore, MD",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    industries: ["Healthcare", "Medicine"]
  },
  {
    id: 6,
    name: "Alex Thompson",
    class: "2016",
    major: "Data Science",
    company: "Amazon",
    position: "Data Science Manager",
    location: "Seattle, WA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    industries: ["Technology", "Analytics"]
  }
];

export function AlumniDirectory() {
  const { searchQuery: globalSearchQuery, setSearchQuery: setGlobalSearchQuery } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [classYear, setClassYear] = useState("all");
  const [industry, setIndustry] = useState("all");

  // Sync global search with local search
  useEffect(() => {
    if (globalSearchQuery) {
      setLocalSearchQuery(globalSearchQuery);
    }
  }, [globalSearchQuery]);

  // Use local search if it exists, otherwise use global search
  const searchQuery = localSearchQuery || globalSearchQuery;

  const filteredAlumni = useMemo(() => {
    return alumni.filter((person) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        person.name.toLowerCase().includes(searchLower) ||
        person.company.toLowerCase().includes(searchLower) ||
        person.major.toLowerCase().includes(searchLower) ||
        person.position.toLowerCase().includes(searchLower);

      // Class year filter
      const matchesYear = classYear === "all" || person.class === classYear;

      // Industry filter
      const matchesIndustry = industry === "all" || 
        person.industries.some(ind => {
          if (industry === "tech") return ind.toLowerCase().includes("technology");
          if (industry === "finance") return ind.toLowerCase().includes("finance") || ind.toLowerCase().includes("investment");
          if (industry === "healthcare") return ind.toLowerCase().includes("healthcare") || ind.toLowerCase().includes("medicine");
          return false;
        });

      return matchesSearch && matchesYear && matchesIndustry;
    });
  }, [searchQuery, classYear, industry]);

  return (
    <section id="directory" className="py-16 bg-white">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl">Alumni Directory</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with alumni across industries, locations, and graduation years
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, company, or major..."
                className="pl-10"
                value={localSearchQuery}
                onChange={(e) => {
                  setLocalSearchQuery(e.target.value);
                  setGlobalSearchQuery(e.target.value);
                }}
              />
            </div>
            <Select value={classYear} onValueChange={setClassYear}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Class Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
                <SelectItem value="2017">2017</SelectItem>
                <SelectItem value="2016">2016</SelectItem>
                <SelectItem value="2015">2015</SelectItem>
              </SelectContent>
            </Select>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAlumni.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No alumni found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setLocalSearchQuery("");
                  setGlobalSearchQuery("");
                  setClassYear("all");
                  setIndustry("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-600">
                Showing {filteredAlumni.length} of {alumni.length} alumni
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAlumni.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="truncate">{person.name}</h3>
                      <p className="text-sm text-gray-600">Class of {person.class}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="truncate">{person.position}</div>
                        <div className="text-gray-600 truncate">{person.company}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 truncate">{person.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {person.industries.map((industry) => (
                      <Badge key={industry} variant="secondary">
                        {industry}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
                ))}
              </div>

              <div className="text-center pt-4">
                <Button variant="outline" size="lg">
                  Load More Alumni
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
