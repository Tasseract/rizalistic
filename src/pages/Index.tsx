import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import LibrarySection from "@/components/LibrarySection";
import WomenSection from "@/components/WomenSection";
import MapSection from "@/components/MapSection";
import GallerySection from "@/components/GallerySection";
import TravelerSection from "@/components/TravelerSection";
import QuizSection from "@/components/QuizSection";
import LegacySection from "@/components/LegacySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-lato">
      <Navigation />
      <main>
        <HeroSection />
        <TimelineSection />
        <LibrarySection />
        <WomenSection />
        <MapSection />
        <GallerySection />
        <TravelerSection />
        <QuizSection />
        <LegacySection />
      </main>
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-playfair text-lg mb-2">
            Dr. José Rizal (1861-1896)
          </p>
          <p className="font-lato text-sm opacity-90">
            Philippine National Hero • Writer • Ophthalmologist • Polymath
          </p>
          <p className="font-lato text-xs mt-4 opacity-75">
            "The youth is the hope of our future."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
