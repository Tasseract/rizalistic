import { useState } from "react";
import noliImage from "@/assets/noli-me-tangere.jpg";
import filiImage from "@/assets/el-filibusterismo.jpg";
import adiósImage from "@/assets/mi-ultimo-adios.jpg";
import womenImage from "@/assets/to-young-women.jpg";

interface Book {
  title: string;
  image: string;
  year: string;
  summary: string;
  significance: string;
}

const books: Book[] = [
  {
    title: "Noli Me Tangere",
    image: noliImage,
    year: "1887",
    summary:
      "A social novel that exposed the corruption and abuse of the Spanish colonial government and clergy in the Philippines.",
    significance:
      "This groundbreaking work awakened Filipino national consciousness and sparked the reform movement. It is considered one of the greatest novels in Philippine literature.",
  },
  {
    title: "El Filibusterismo",
    image: filiImage,
    year: "1891",
    summary:
      "The sequel to Noli Me Tangere, depicting a darker and more revolutionary narrative of Philippine society under Spanish rule.",
    significance:
      "This novel showed a more radical approach to reform, reflecting Rizal's growing frustration with Spanish colonial policies. It inspired revolutionary movements.",
  },
  {
    title: "Mi Último Adiós",
    image: adiósImage,
    year: "1896",
    summary:
      "His final poem, written hours before his execution, expressing his love for the Philippines and hope for its future.",
    significance:
      "This farewell poem has become one of the most famous pieces of Philippine literature. Hidden in an oil lamp, it was discovered after his death and inspired generations.",
  },
  {
    title: "To the Young Women of Malolos",
    image: womenImage,
    year: "1889",
    summary:
      "An essay celebrating Filipino women who fought for the right to education and advocating for women's empowerment.",
    significance:
      "This work demonstrated Rizal's progressive views on gender equality and education, inspiring Filipino women to pursue knowledge and independence.",
  },
];

const LibrarySection = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section id="library" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            The Library
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the literary masterpieces that ignited a revolution and
            continue to inspire millions.
          </p>
        </div>

        {/* Mi Último Adiós Spotlight */}
        <div className="max-w-6xl mx-auto mb-20 bg-card rounded-lg shadow-2xl overflow-hidden border border-border">
          <div className="bg-primary text-primary-foreground p-8 text-center">
            <h3 className="font-playfair text-4xl font-bold mb-3 text-accent">
              Mi Último Adiós
            </h3>
            <p className="font-lato text-lg opacity-90">
              Rizal's Final Poem — December 29, 1896
            </p>
          </div>
          
          {/* Audio Player */}
          <div className="bg-muted p-6 flex justify-center">
            <audio controls className="w-full max-w-md">
              <source src="/audio/mi-ultimo-adios.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Split Column Text */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Spanish Text */}
            <div className="space-y-4">
              <h4 className="font-playfair text-2xl font-bold text-primary mb-4 text-center">
                Español (Original)
              </h4>
              <div className="font-lato text-sm leading-relaxed text-foreground space-y-3 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                <p className="italic">
                  Adiós, Patria adorada, región del sol querida,<br />
                  Perla del Mar de Oriente, nuestro perdido Edén,<br />
                  A darte voy, alegre, la triste mustia vida;<br />
                  Y fuera más brillante, más fresca, más florida,<br />
                  También por tí la diera, la diera por tu bien.
                </p>
                <p className="italic">
                  En campos de batalla, luchando con delirio,<br />
                  Otros te dan sus vidas sin dudas, sin pesar;<br />
                  El sitio nada importa, ciprés, laurel o lirio,<br />
                  Cadalso o campo abierto, combate o cruel martirio,<br />
                  Lo mismo es si lo piden la patria y el hogar.
                </p>
                <p className="italic">
                  Yo muero cuando veo que el cielo se colora<br />
                  Y al fin anuncia el día tras lóbrego capuz;<br />
                  Si grana necesitas para teñir tu aurora,<br />
                  Vierte la sangre mía, derrámala en buen hora<br />
                  Y dórela un reflejo de su naciente luz.
                </p>
                <p className="text-muted-foreground text-xs mt-4 text-center">
                  [Excerpt - First three stanzas of fourteen]
                </p>
              </div>
            </div>

            {/* English Translation */}
            <div className="space-y-4">
              <h4 className="font-playfair text-2xl font-bold text-primary mb-4 text-center">
                English Translation
              </h4>
              <div className="font-lato text-sm leading-relaxed text-foreground space-y-3 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                <p>
                  Farewell, dear Fatherland, clime of the sun caress'd,<br />
                  Pearl of the Orient seas, our Eden lost!<br />
                  Gladly now I go to give thee this faded life's best,<br />
                  And were it brighter, fresher, or more blest,<br />
                  Still would I give it thee, nor count the cost.
                </p>
                <p>
                  On the field of battle, 'mid the frenzy of fight,<br />
                  Others have given their lives, without doubt or heed;<br />
                  The place matters not—cypress or laurel or lily white,<br />
                  Scaffold or open plain, combat or martyrdom's plight,<br />
                  'Tis ever the same, to serve our home and country's need.
                </p>
                <p>
                  I die just when I see the dawn break,<br />
                  Through the gloom of night, to herald the day;<br />
                  And if color is lacking my blood thou shalt take,<br />
                  Pour'd out at need for thy dear sake,<br />
                  To dye with its crimson the waking ray.
                </p>
                <p className="text-muted-foreground text-xs mt-4 text-center">
                  [Translated by Charles Derbyshire]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Book Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {books.map((book, index) => (
            <div
              key={index}
              className="perspective-1000"
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className={`relative h-[500px] transition-transform duration-700 transform-style-3d ${
                  flippedCard === index ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    flippedCard === index ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                    <h3 className="font-playfair text-2xl font-bold text-primary-foreground">
                      {book.title}
                    </h3>
                    <p className="font-lato text-primary-foreground/80">
                      {book.year}
                    </p>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 backface-hidden bg-primary text-primary-foreground rounded-lg p-6 flex flex-col justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-accent">
                    {book.title}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-lato font-semibold text-sm uppercase tracking-wide mb-2">
                        Summary
                      </h4>
                      <p className="font-lato text-sm text-primary-foreground/90">
                        {book.summary}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-lato font-semibold text-sm uppercase tracking-wide mb-2">
                        Significance
                      </h4>
                      <p className="font-lato text-sm text-primary-foreground/90">
                        {book.significance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 font-lato text-muted-foreground italic">
          Hover over each book to reveal its story
        </p>
      </div>
    </section>
  );
};

export default LibrarySection;
