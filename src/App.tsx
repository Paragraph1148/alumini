// src/App.tsx

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AlumniDirectory } from "./components/AlumniDirectory";
import { Events } from "./components/Events";
import { JobBoard } from "./components/JobBoard";
import { NewsSection } from "./components/NewsSection";
import { Footer } from "./components/Footer";
import { SearchProvider } from "./components/SearchContext";
import { AuthProvider } from "./components/AuthContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Hero />
            <AlumniDirectory />
            <Events />
            <JobBoard />
            <NewsSection />
          </main>
          <Footer />
        </div>
        <Toaster />
      </SearchProvider>
    </AuthProvider>
  );
}
