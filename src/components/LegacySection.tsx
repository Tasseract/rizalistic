import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookOpen, Globe2, Heart } from "lucide-react";

const LegacySection = () => {
  return (
    <section id="legacy" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            Rizal's Enduring Legacy
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            More than a century after his death, Dr. José Rizal continues to
            inspire millions as a symbol of peaceful reform and national pride.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* The Rizal Law */}
          <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="font-playfair text-3xl text-primary">
                The Rizal Law
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-lato text-foreground leading-relaxed mb-4">
                Republic Act No. 1425, enacted in 1956, mandates that all
                Filipino students study the life, works, and writings of José
                Rizal, particularly his novels <em>Noli Me Tangere</em> and{" "}
                <em>El Filibusterismo</em>.
              </p>
              <p className="font-lato text-muted-foreground">
                This law ensures that every generation of Filipinos understands
                the sacrifices made for their freedom and the importance of
                national identity, critical thinking, and peaceful reform.
              </p>
            </CardContent>
          </Card>

          {/* Global Monuments */}
          <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Globe2 className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="font-playfair text-3xl text-primary">
                Global Monuments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-lato text-foreground leading-relaxed mb-4">
                Monuments honoring Dr. Rizal stand in countries across the
                globe, including Spain, Germany, the United States, Japan, and
                many others, recognizing his international significance and
                intellectual contributions.
              </p>
              <p className="font-lato text-muted-foreground">
                These memorials serve as a testament to his universal message of
                justice, education, and the power of the pen over the sword in
                achieving social change.
              </p>
            </CardContent>
          </Card>

          {/* Symbol of Nationalism */}
          <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="font-playfair text-3xl text-primary">
                Symbol of Nationalism
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-lato text-foreground leading-relaxed mb-4">
                Rizal remains the primary symbol of Filipino nationalism,
                representing the ideals of peaceful reform, intellectual
                excellence, and unwavering love for one's country. His example
                continues to inspire activists and reformers worldwide.
              </p>
              <p className="font-lato text-muted-foreground">
                His life demonstrates that true patriotism is expressed through
                education, cultural pride, and the courage to speak truth to
                power, even at the cost of one's life.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Closing Quote */}
        <div className="mt-16 text-center">
          <blockquote className="font-playfair text-2xl md:text-3xl text-primary italic max-w-3xl mx-auto">
            "The glory of saving a country is not for him who has contributed
            to its ruin."
          </blockquote>
          <p className="font-lato text-muted-foreground mt-4">
            — Dr. José Rizal
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
