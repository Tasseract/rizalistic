import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details: string;
}

const events: TimelineEvent[] = [
  {
    year: "1861",
    title: "Birth in Calamba",
    description: "Born José Protasio Rizal Mercado y Alonso Realonda",
    details:
      "Born on June 19 in Calamba, Laguna. The seventh of eleven children in a prosperous family. His early education was influenced by his mother, Teodora Alonso, who taught him the alphabet and prayers.",
  },
  {
    year: "1872-1877",
    title: "Ateneo Education",
    description: "Studied at Ateneo Municipal de Manila",
    details:
      "Excelled in his studies, earning the highest honors. He was a member of the Marian Congregation and showed early signs of his intellectual brilliance. Graduated with a Bachelor of Arts degree with highest honors.",
  },
  {
    year: "1882",
    title: "Departure for Spain",
    description: "Left for Europe to continue his education",
    details:
      "At age 21, he secretly left the Philippines for Spain to escape Spanish persecution and complete his medical studies. He enrolled at Universidad Central de Madrid and later earned his medical degree.",
  },
  {
    year: "1887",
    title: "Noli Me Tangere Published",
    description: "Published his revolutionary novel in Berlin",
    details:
      "His groundbreaking novel exposed the injustices of Spanish colonial rule in the Philippines. The title means 'Touch Me Not' and sparked the Philippine reform movement. Funded the printing himself through help from friends.",
  },
  {
    year: "1890",
    title: "Time in Brussels",
    description: "Annotated Morga's Sucesos de las Islas Filipinas",
    details:
      "While in Brussels, Rizal worked on annotating Antonio de Morga's historical work 'Sucesos de las Islas Filipinas' (Events in the Philippine Islands). His scholarly annotations challenged Spanish colonial narratives and highlighted the rich pre-colonial Filipino civilization.",
  },
  {
    year: "1892",
    title: "La Liga Filipina Founded",
    description: "Established a civic organization for reforms",
    details:
      "On July 3, 1892, Rizal founded La Liga Filipina in Manila, a progressive organization aimed at social reforms through peaceful means. It advocated for political representation, education, and unity among Filipinos. The organization was short-lived as Rizal was arrested days later.",
  },
  {
    year: "1892",
    title: "Exile to Dapitan",
    description: "Banished to Dapitan, Zamboanga del Norte",
    details:
      "Despite exile, he practiced medicine, taught children, built a water system, and conducted scientific research. He established a school and won the lottery, which he used to buy land. This period showed his dedication to uplifting his countrymen.",
  },
  {
    year: "1896",
    title: "Martyrdom",
    description: "Executed by firing squad at Bagumbayan",
    details:
      "On December 30, at age 35, he was executed by Spanish authorities for alleged rebellion. His last poem, 'Mi Último Adiós,' was hidden in an oil lamp. His death galvanized the Philippine Revolution and he became the national hero.",
  },
];

const TimelineSection = () => {
  const [visibleEvents, setVisibleEvents] = useState<Set<number>>(new Set());
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = eventRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setVisibleEvents((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    eventRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            Life's Journey
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            From humble beginnings to national hero, explore the pivotal moments
            that shaped Dr. José Rizal's extraordinary life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 transform md:-translate-x-1/2" />

          {events.map((event, index) => (
            <div
              key={index}
              ref={(el) => (eventRefs.current[index] = el)}
              className={`relative mb-12 transition-all duration-700 ${
                visibleEvents.has(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background z-10" />

                {/* Content */}
                <div className="ml-20 md:ml-0 md:w-5/12">
                  <Card
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-card border-border"
                    onClick={() =>
                      setExpandedEvent(expandedEvent === index ? null : index)
                    }
                  >
                    <Badge className="mb-3 bg-accent text-accent-foreground font-playfair">
                      {event.year}
                    </Badge>
                    <h3 className="font-playfair text-2xl font-bold text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="font-lato text-muted-foreground mb-3">
                      {event.description}
                    </p>
                    {expandedEvent === index && (
                      <p className="font-lato text-sm text-foreground mt-4 pt-4 border-t border-border animate-fade-in">
                        {event.details}
                      </p>
                    )}
                    <p className="font-lato text-xs text-accent mt-2">
                      {expandedEvent === index ? "Click to collapse" : "Click to learn more"}
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
