import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import segundaImage from "@/assets/segunda-katigbak.jpg";
import leonorImage from "@/assets/leonor-rivera.jpg";
import josephineImage from "@/assets/josephine-bracken.jpg";

interface Woman {
  name: string;
  image: string;
  relationship: string;
  description: string;
}

const women: Woman[] = [
  {
    name: "Segunda Katigbak",
    image: segundaImage,
    relationship: "First Love (1877)",
    description:
      "Rizal's first romantic interest during his teenage years in Manila. She was a young woman from Lipa, Batangas, whom he met at the house of his friend. Though their romance was brief and unfulfilled, she left a lasting impression on the young Rizal and inspired his early poetry.",
  },
  {
    name: "Leonor Valenzuela",
    image: segundaImage,
    relationship: "Orang (1878-1880)",
    description:
      "A talented young woman nicknamed 'Orang' whom Rizal courted while studying at the University of Santo Tomas. She was the niece of his landlady in Intramuros, and their relationship was characterized by youthful affection and shared literary interests during his university days.",
  },
  {
    name: "Leonor Rivera",
    image: leonorImage,
    relationship: "The Great Love (1882-1888)",
    description:
      "Often considered the love of Rizal's life, Leonor was his sweetheart for over six years. Their long-distance relationship was maintained through coded letters. She inspired many of his poems and the character of María Clara in Noli Me Tangere. Their love ended when she was forced to marry an Englishman.",
  },
  {
    name: "Consuelo Ortiga y Perez",
    image: leonorImage,
    relationship: "Parisian Romance (1883)",
    description:
      "The beautiful daughter of Don Pablo Ortiga y Rey, who gave Rizal hospitality in Madrid. Rizal fell deeply in love with Consuelo and even contemplated proposing, but his sense of duty to his country and financial limitations prevented him from pursuing marriage.",
  },
  {
    name: "O Sei San",
    image: josephineImage,
    relationship: "Japanese Romance (1888)",
    description:
      "A Japanese woman Rizal met during his month-long stay in Japan. Their brief but profound romance is considered one of the most romantic episodes in Rizal's life. O Sei San's gentle nature and Japanese culture deeply impressed Rizal, and their parting was filled with mutual sadness.",
  },
  {
    name: "Gertrude Beckett",
    image: josephineImage,
    relationship: "London Admirer (1888-1889)",
    description:
      "The eldest daughter of Rizal's landlord in London, Gertrude fell in love with him during his stay. Though Rizal was fond of her, he could not reciprocate her feelings as he was still devoted to Leonor Rivera. Gertrude's love remained unrequited, and she never married.",
  },
  {
    name: "Josephine Bracken",
    image: josephineImage,
    relationship: "Common-Law Wife (1895-1896)",
    description:
      "An Irish woman who became Rizal's companion during his exile in Dapitan. They lived together as husband and wife, though they were never formally married. She gave birth to a son who died shortly after birth. Josephine remained devoted to Rizal until his execution and was present during his final hours.",
  },
];

const WomenSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(women.length - cardsPerView, prev + 1));
  };

  return (
    <section id="women" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            The Women in Rizal's Life
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            Behind every great man are the women who shaped his heart and
            inspired his works.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-accent disabled:opacity-30"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentIndex >= women.length - cardsPerView}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-accent disabled:opacity-30"
            size="icon"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-12">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {women.map((woman, index) => (
                <Card
                  key={index}
                  className="flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border"
                  style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 24 / cardsPerView}px)` }}
                >
                  <div className="relative h-[400px] overflow-hidden rounded-t-lg">
                    <img
                      src={woman.image}
                      alt={woman.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-playfair text-3xl font-bold text-primary-foreground mb-2">
                        {woman.name}
                      </h3>
                      <p className="font-lato text-sm text-accent font-semibold">
                        {woman.relationship}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="font-lato text-foreground leading-relaxed">
                      {woman.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: women.length - cardsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? "bg-accent w-8" : "bg-border"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenSection;
