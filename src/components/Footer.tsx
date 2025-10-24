import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
                <span className="font-semibold text-white">Alumni Portal</span>
              </div>
              <p className="text-sm">
                Connecting graduates worldwide and fostering lifelong relationships with our university community.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Alumni Directory</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentorship Program</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Alumni Benefits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Give Back</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News & Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white">Stay Updated</h4>
              <p className="text-sm">Subscribe to our newsletter for the latest alumni news and events.</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p>© 2025 Alumni Portal. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
