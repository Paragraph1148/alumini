import { Button } from "./ui/button";
import { ArrowRight, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              <Users className="h-4 w-4" />
              <span>Join 50,000+ alumni worldwide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Welcome to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Alumni Network</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Connect with fellow graduates, discover career opportunities, attend exclusive events, and stay engaged with your alma mater.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Update Your Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Directory
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl">50K+</div>
                <div className="text-sm text-gray-600">Alumni Members</div>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div>
                <div className="text-3xl">120+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div>
                <div className="text-3xl">5K+</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYxMTMzOTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Campus community"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-20 blur-3xl" />
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
