import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card } from "./ui/card";
import { MapPin } from "lucide-react";

interface Location {
  name: string;
  country: string;
  period: string;
  description: string;
  significance: string;
  color: string;
}

const locations: Location[] = [
  {
    name: "Calamba",
    country: "Philippines",
    period: "1861-1882, 1887-1888, 1892",
    description:
      "His birthplace and the place where his love for his country was born. A prosperous town in Laguna province with rich agricultural land.",
    significance:
      "The foundation of his nationalism. Witnessing his family's persecution by Spanish authorities here would shape his revolutionary ideals. He returned briefly and later was exiled to Dapitan.",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Madrid",
    country: "Spain",
    period: "1882-1885",
    description:
      "The capital where he studied medicine and philosophy at Universidad Central de Madrid. He immersed himself in European culture and politics.",
    significance:
      "Here he completed his medical degree and began writing Noli Me Tangere. He joined Filipino expatriates in advocating for reforms in the Philippines.",
    color: "from-red-600 to-red-800",
  },
  {
    name: "Heidelberg",
    country: "Germany",
    period: "1886",
    description:
      "A renowned university town where he specialized in ophthalmology under Dr. Otto Becker. He perfected his German language skills here.",
    significance:
      "This period refined his medical expertise, particularly in treating his mother's eye condition. The scholarly environment influenced his scientific approach to social reform.",
    color: "from-amber-600 to-amber-800",
  },
  {
    name: "Dapitan",
    country: "Philippines",
    period: "1892-1896",
    description:
      "A remote town in Mindanao where he was exiled for four years. Despite isolation, he established schools, hospitals, and conducted scientific research.",
    significance:
      "His exile demonstrated his commitment to serving Filipinos. He built a water system, practiced medicine, taught children, and won a lottery. His work here showed practical nationalism in action.",
    color: "from-green-600 to-green-800",
  },
];

const TravelerSection = () => {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <section id="traveler" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            The Traveler
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow Rizal's global footprint across continents, where each
            destination shaped his vision for Philippine independence.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs
            defaultValue={locations[0].name}
            className="w-full"
            onValueChange={(value) => {
              const location = locations.find((loc) => loc.name === value);
              if (location) setActiveLocation(location);
            }}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-secondary h-auto p-2">
              {locations.map((location) => (
                <TabsTrigger
                  key={location.name}
                  value={location.name}
                  className="font-lato data-[state=active]:bg-accent data-[state=active]:text-accent-foreground py-3"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {location.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {locations.map((location) => (
              <TabsContent
                key={location.name}
                value={location.name}
                className="animate-fade-in"
              >
                <Card className="overflow-hidden border-border">
                  <div
                    className={`h-48 bg-gradient-to-br ${location.color} flex items-center justify-center`}
                  >
                    <div className="text-center text-white">
                      <h3 className="font-playfair text-4xl font-bold mb-2">
                        {location.name}
                      </h3>
                      <p className="font-lato text-xl">{location.country}</p>
                      <p className="font-lato text-sm mt-2 opacity-90">
                        {location.period}
                      </p>
                    </div>
                  </div>
                  <div className="p-8 bg-card">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-playfair text-xl font-semibold text-primary mb-3">
                          About the Location
                        </h4>
                        <p className="font-lato text-foreground leading-relaxed">
                          {location.description}
                        </p>
                      </div>
                      <div className="border-t border-border pt-6">
                        <h4 className="font-playfair text-xl font-semibold text-primary mb-3">
                          Historical Significance
                        </h4>
                        <p className="font-lato text-foreground leading-relaxed">
                          {location.significance}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TravelerSection;
