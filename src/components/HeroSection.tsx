import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-rizal.jpg";

const HeroSection = () => {
  const scrollToTimeline = () => {
    const element = document.getElementById("timeline");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(59, 30, 30, 0.7), rgba(59, 30, 30, 0.8)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 text-center z-10">
        <div className="animate-fade-in-up">
          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-primary-foreground mb-6">
            The First Filipino
          </h1>
          <div className="max-w-3xl mx-auto mb-8">
            <p className="font-playfair text-2xl md:text-3xl italic text-accent mb-4">
              "He who does not know how to look back at where he came from will
              never get to his destination."
            </p>
            <p className="font-lato text-lg text-primary-foreground/90">
              — Dr. José Rizal
            </p>
          </div>
          <Button
            size="lg"
            onClick={scrollToTimeline}
            className="bg-accent hover:bg-accent/90 text-primary font-lato font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Explore His Legacy
            <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-accent" />
      </div>
    </section>
  );
};

export default HeroSection;
