import { useState } from "react";
import { Button } from "./ui/button";
import { Bell, Menu, Search, User, LogOut, Settings, Shield } from "lucide-react";
import { Input } from "./ui/input";
import { useSearch } from "./SearchContext";
import { useAuth } from "./AuthContext";
import { LoginDialog } from "./LoginDialog";
import { UserProfile } from "./UserProfile";
import { AdminDashboard } from "./AdminDashboard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { user, logout, isModerator } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Scroll to directory section when user searches
    if (value) {
      const directorySection = document.getElementById('directory');
      if (directorySection) {
        directorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
            <span className="font-semibold">Alumni Portal</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#directory" className="text-sm hover:text-blue-600 transition-colors">
              Directory
            </a>
            <a href="#events" className="text-sm hover:text-blue-600 transition-colors">
              Events
            </a>
            <a href="#jobs" className="text-sm hover:text-blue-600 transition-colors">
              Jobs
            </a>
            <a href="#news" className="text-sm hover:text-blue-600 transition-colors">
              News
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search alumni..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          {user && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                {isModerator() && (
                  <DropdownMenuItem onClick={() => setAdminOpen(true)}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setLoginOpen(true)}>
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <UserProfile open={profileOpen} onOpenChange={setProfileOpen} />
      <AdminDashboard open={adminOpen} onOpenChange={setAdminOpen} />
    </header>
  );
}
