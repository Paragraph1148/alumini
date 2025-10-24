import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useAuth } from "./AuthContext";
import { projectId } from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";
import { Calendar, Briefcase, Newspaper, Users, Trash2, Edit, Plus } from "lucide-react";

interface AdminDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminDashboard({ open, onOpenChange }: AdminDashboardProps) {
  const { user, isModerator } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && isModerator()) {
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    setLoading(true);
    try {
      const sessionData = localStorage.getItem("alumni_session");
      if (!sessionData) return;

      const session = JSON.parse(sessionData);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d96042de/admin/data`,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
        setJobs(data.jobs || []);
        setNews(data.news || []);
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Failed to load admin data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (type: string, id: string) => {
    try {
      const sessionData = localStorage.getItem("alumni_session");
      if (!sessionData) return;

      const session = JSON.parse(sessionData);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d96042de/admin/${type}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Item deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete item");
    }
  };

  if (!isModerator()) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Dashboard</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{events.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Active Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{jobs.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">News Articles</CardTitle>
                  <Newspaper className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{news.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{users.length}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Manage Events</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
            <div className="space-y-2">
              {events.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No events found</p>
              ) : (
                events.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h4>{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteItem("events", event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Manage Jobs</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Job
              </Button>
            </div>
            <div className="space-y-2">
              {jobs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No jobs found</p>
              ) : (
                jobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h4>{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteItem("jobs", job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Manage News</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            </div>
            <div className="space-y-2">
              {news.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No news articles found</p>
              ) : (
                news.map((article) => (
                  <Card key={article.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h4>{article.title}</h4>
                        <p className="text-sm text-gray-600">{article.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteItem("news", article.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <h3>Manage Users</h3>
            <div className="space-y-2">
              {users.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No users found</p>
              ) : (
                users.map((u) => (
                  <Card key={u.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h4>{u.name}</h4>
                        <p className="text-sm text-gray-600">{u.email}</p>
                      </div>
                      <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                        {u.role}
                      </Badge>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
