import { useState } from "react";
import { X } from "lucide-react";
import photo1 from "@/assets/gallery-1.jpg";
import photo2 from "@/assets/gallery-2.jpg";
import photo3 from "@/assets/gallery-3.jpg";
import photo4 from "@/assets/gallery-4.jpg";
import photo5 from "@/assets/gallery-5.jpg";
import photo6 from "@/assets/gallery-6.jpg";

interface Photo {
  id: number;
  src: string;
  title: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: photo1,
    title: "Young Rizal",
    description: "Portrait of José Rizal during his student years",
  },
  {
    id: 2,
    src: photo2,
    title: "Rizal in Europe",
    description: "Rizal during his travels across Europe",
  },
  {
    id: 3,
    src: photo3,
    title: "The Execution Site",
    description: "Bagumbayan Field (now Luneta Park) where Rizal was executed",
  },
  {
    id: 4,
    src: photo4,
    title: "Rizal Monument",
    description: "The iconic monument in Rizal Park, Manila",
  },
  {
    id: 5,
    src: photo5,
    title: "Dapitan Exile",
    description: "Rizal's home during his exile in Dapitan",
  },
  {
    id: 6,
    src: photo6,
    title: "Original Manuscripts",
    description: "Rizal's handwritten manuscripts and letters",
  },
];

const GallerySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <section id="gallery" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            Photo Gallery
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            A visual journey through the life and legacy of the Philippines'
            national hero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[4/3] bg-muted"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-playfair text-2xl font-bold text-primary-foreground mb-2">
                    {photo.title}
                  </h3>
                  <p className="font-lato text-sm text-primary-foreground/90">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>
            <div
              className="max-w-5xl w-full bg-card rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6 bg-card">
                <h3 className="font-playfair text-3xl font-bold text-primary mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="font-lato text-lg text-foreground">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
