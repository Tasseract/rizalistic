import { useState, useEffect, useRef } from "react";
import { MapPin, Play, Pause } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Slider } from "./ui/slider";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: number;
  name: string;
  country: string;
  coordinates: { lng: number; lat: number };
  period: string;
  description: string;
  significance: string;
}

const locations: Location[] = [
  {
    id: 1,
    name: "Calamba, Laguna",
    country: "Philippines",
    coordinates: { lng: 121.1535, lat: 14.2113 },
    period: "1861-1882, 1887-1888",
    description: "Birthplace and childhood home of José Rizal. This is where the young Pepe spent his formative years, nurtured by his mother Teodora Alonso who taught him to read and write.",
    significance:
      "Where Rizal spent his formative years, learning from his mother and developing his love for the Philippines. His idyllic childhood in Calamba would later inspire many scenes in his novels.",
  },
  {
    id: 2,
    name: "Madrid",
    country: "Spain",
    coordinates: { lng: -3.7038, lat: 40.4168 },
    period: "1882-1885",
    description: "Rizal studied medicine at Universidad Central de Madrid, immersing himself in European intellectual movements. He also studied painting, sculpture, and literature while developing his political consciousness.",
    significance:
      "Completed his medical studies and began writing Noli Me Tangere. Witnessed European intellectual movements and became involved with Filipino expatriate reformist circles, shaping his vision for Philippine independence.",
  },
  {
    id: 3,
    name: "Heidelberg",
    country: "Germany",
    coordinates: { lng: 8.6821, lat: 49.3988 },
    period: "1886",
    description: "Specialized in ophthalmology under the tutelage of Dr. Otto Becker, one of Europe's leading eye specialists. His motivation was to cure his mother's deteriorating eyesight.",
    significance:
      "Trained under the renowned ophthalmologist Dr. Otto Becker. Completed his eye specialization to help his mother. This period also saw him working intensively on completing Noli Me Tangere.",
  },
  {
    id: 4,
    name: "Brussels",
    country: "Belgium",
    coordinates: { lng: 4.3517, lat: 50.8503 },
    period: "1890-1891",
    description: "In Brussels, Rizal lived a modest life while working on his scholarly annotation of Antonio de Morga's historical work. He also completed El Filibusterismo during this period.",
    significance:
      "Worked on annotating Sucesos de las Islas Filipinas, challenging Spanish colonial narratives about Philippine history. His annotations proved that Filipinos had a rich, sophisticated civilization before Spanish colonization.",
  },
  {
    id: 5,
    name: "Dapitan",
    country: "Philippines",
    coordinates: { lng: 123.4181, lat: 8.6497 },
    period: "1892-1896",
    description: "Exiled to this remote town in Mindanao, Rizal transformed it into a model community. He practiced medicine, taught children, built infrastructure, and conducted scientific research.",
    significance:
      "Despite exile, established a school, practiced medicine, conducted scientific research, and improved the community. His successful eye surgeries, agricultural innovations, and civic projects demonstrated his commitment to uplifting Filipino society.",
  },
  {
    id: 6,
    name: "Manila",
    country: "Philippines",
    coordinates: { lng: 120.9842, lat: 14.5995 },
    period: "1892, 1896",
    description: "The capital city where Rizal founded La Liga Filipina and where his life journey ended. His execution at Bagumbayan (now Rizal Park) transformed him from reformist to martyr.",
    significance:
      "Founded La Liga Filipina in 1892. Executed at Bagumbayan (Luneta) on December 30, 1896. His martyrdom sparked the Philippine Revolution and made him the country's greatest national hero.",
  },
];

const MapSection = () => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(locations[0]);
  const [timelineYear, setTimelineYear] = useState(1861);
  const [isPlaying, setIsPlaying] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const journeyLine = useRef<L.Polyline | null>(null);
  const playInterval = useRef<NodeJS.Timeout | null>(null);

  // Get the start year from a location's period string
  const getStartYear = (period: string): number => {
    const match = period.match(/(\d{4})/);
    return match ? parseInt(match[1]) : 1861;
  };

  // Get visible locations based on timeline year
  const getVisibleLocations = () => {
    return locations.filter(loc => getStartYear(loc.period) <= timelineYear);
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize Leaflet map with OpenStreetMap
    map.current = L.map(mapContainer.current).setView([20, 30], 2);

    // Add OpenStreetMap tile layer (completely free, no API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Initialize empty polyline
    journeyLine.current = L.polyline([], {
      color: 'hsl(var(--accent))',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10',
      className: 'journey-path',
    }).addTo(map.current);

    // Animate the path
    let offset = 0;
    const animatePath = () => {
      offset += 1;
      if (offset > 20) offset = 0;
      const line = document.querySelector('.journey-path') as HTMLElement;
      if (line) {
        line.style.strokeDashoffset = offset.toString();
      }
      requestAnimationFrame(animatePath);
    };
    animatePath();

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      journeyLine.current?.remove();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers and route based on timeline
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const visibleLocations = getVisibleLocations();
    
    // Journey path up to current timeline
    const journeyPath: L.LatLngExpression[] = visibleLocations.map(loc => 
      [loc.coordinates.lat, loc.coordinates.lng]
    );

    // Update polyline
    if (journeyLine.current) {
      journeyLine.current.setLatLngs(journeyPath);
    }

    // Custom icon for markers
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="width: 30px; height: 30px; border-radius: 50%; background-color: hsl(var(--accent)); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.3s ease;"></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Add markers for visible locations
    visibleLocations.forEach((location, index) => {
      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon: customIcon,
      }).addTo(map.current!);

      // Add number labels
      const numberLabel = L.divIcon({
        className: 'location-number',
        html: `<div style="width: 20px; height: 20px; border-radius: 50%; background-color: hsl(var(--primary)); color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${index + 1}</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 30],
      });

      L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon: numberLabel,
      }).addTo(map.current!);

      marker.on('click', () => {
        setActiveLocation(location);
        map.current?.flyTo([location.coordinates.lat, location.coordinates.lng], 6, {
          duration: 2,
        });
      });

      markers.current.push(marker);
    });

    // Update active location to the most recent visible one
    if (visibleLocations.length > 0) {
      setActiveLocation(visibleLocations[visibleLocations.length - 1]);
    }
  }, [timelineYear]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      playInterval.current = setInterval(() => {
        setTimelineYear(prev => {
          if (prev >= 1896) {
            setIsPlaying(false);
            return 1896;
          }
          return prev + 1;
        });
      }, 500);
    } else {
      if (playInterval.current) {
        clearInterval(playInterval.current);
      }
    }

    return () => {
      if (playInterval.current) {
        clearInterval(playInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (timelineYear >= 1896) {
      setTimelineYear(1861);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="map" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            The World Traveler
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow Rizal's journey across continents, from Manila to Madrid,
            and discover how his travels shaped his vision for the Philippines.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout: Sticky Map + Scrolling Content */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Sticky Map with Timeline */}
            <div className="md:sticky md:top-24 space-y-4">
              <div 
                ref={mapContainer} 
                className="w-full h-[500px] rounded-lg shadow-xl border border-border overflow-hidden"
              />
              
              {/* Timeline Slider */}
              <Card className="bg-card border-border p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-playfair text-2xl font-bold text-primary">
                      Journey Timeline
                    </h3>
                    <button
                      onClick={togglePlay}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
                    >
                      {isPlaying ? (
                        <>
                          <Pause size={16} />
                          <span className="font-lato text-sm">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          <span className="font-lato text-sm">Play</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-lato text-sm text-muted-foreground">1861</span>
                      <span className="font-playfair text-3xl font-bold text-accent">{timelineYear}</span>
                      <span className="font-lato text-sm text-muted-foreground">1896</span>
                    </div>
                    
                    <Slider
                      value={[timelineYear]}
                      onValueChange={(value) => setTimelineYear(value[0])}
                      min={1861}
                      max={1896}
                      step={1}
                      className="w-full"
                    />
                    
                    <p className="font-lato text-sm text-muted-foreground text-center mt-2">
                      {getVisibleLocations().length} of {locations.length} locations visited
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Scrolling Location Details */}
            <div className="space-y-6">
              {locations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeLocation?.id === location.id
                      ? "ring-2 ring-accent shadow-xl"
                      : "hover:shadow-lg border-border"
                  }`}
                  onClick={() => setActiveLocation(location)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-accent mt-1 flex-shrink-0" size={24} />
                      <div className="flex-1">
                        <h3 className="font-playfair text-3xl font-bold text-primary mb-1">
                          {location.name}
                        </h3>
                        <p className="font-lato text-sm text-muted-foreground mb-2">
                          {location.country}
                        </p>
                        <p className="font-lato text-sm text-accent font-semibold">
                          {location.period}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-4 space-y-4">
                      <p className="font-lato text-foreground leading-relaxed text-base">
                        {location.description}
                      </p>
                      
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-lato font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                          Historical Significance
                        </h4>
                        <p className="font-lato text-sm text-foreground leading-relaxed">
                          {location.significance}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
