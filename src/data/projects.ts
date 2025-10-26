export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  year?: number;
  cover: string;
  gallery?: string[];
  description?: string;
};

export const projects: Project[] = [
  {
    slug: "moon-in-the-12th",
    title: "Moon in the 12th House",
    subtitle: "Feature Film · 2014",
    year: 2014,
    cover: "/images/image1.jpg",
    gallery: ["/images/palettes/palette1.jpg", 
        "/images/palettes/palette2.jpg",
        "/images/palettes/palette3.jpg",
        "/images/palettes/palette4.jpg",
        "/images/palettes/palette5.jpg",
        "/images/palettes/palette6.jpg",
        "/images/palettes/palette7.jpg"
    ],
    description: "Breve sinopsis o texto del proyecto...",
  },
  {
    slug: "ana-maxim",
    title: "Ana Maxim",
    subtitle: "Short Film · 2024",
    year: 2024,
    cover: "/images/image2.jpg",
    gallery: ["/images/palettes/palette1.jpg", 
        "/images/palettes/palette2.jpg",
        "/images/palettes/palette3.jpg",
        "/images/palettes/palette4.jpg",
        "/images/palettes/palette5.jpg",
        "/images/palettes/palette6.jpg",
        "/images/palettes/palette7.jpg"
    ],
    description: "Breve sinopsis o texto del proyecto...",
  },
    {
    slug: "locked-in",
    title: "Locked In",
    subtitle: "Radom monkey 2",
    year: 2024,
    cover: "/images/image3.jpg",
    gallery: ["/images/palettes/palette1.jpg", 
        "/images/palettes/palette2.jpg",
        "/images/palettes/palette3.jpg",
        "/images/palettes/palette4.jpg",
        "/images/palettes/palette5.jpg",
        "/images/palettes/palette6.jpg",
        "/images/palettes/palette7.jpg"
    ],
    description: "Breve sinopsis o texto del proyecto...",
  },
    {
    slug: "aura",
    title: "Aura",
    subtitle: "Random monkeky 2",
    year: 2024,
    cover: "/images/image4.jpg",
    gallery: ["/images/palettes/palette1.jpg", 
        "/images/palettes/palette2.jpg",
        "/images/palettes/palette3.jpg",
        "/images/palettes/palette4.jpg",
        "/images/palettes/palette5.jpg",
        "/images/palettes/palette6.jpg",
        "/images/palettes/palette7.jpg"
    ],
    description: "Breve sinopsis o texto del proyecto...",
  },
];
