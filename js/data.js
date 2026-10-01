/**
 * Aura Artistry - Data Store & Catalog
 */

export const siteData = {
  brand: {
    name: "AURA ARTISTRY",
    tagline: "High-Fashion Editorial & Luxury Bridal Artistry",
    location: "Based in New York City. Available Worldwide.",
    email: "hello@auraartistry.com",
    phone: "+1 (212) 555-0198",
    instagram: "@auraartistry",
    vogueUrl: "#",
    instagramUrl: "https://instagram.com",
    established: "2014",
    leadArtist: "Aura V.",
    bookingNotice: "Now accepting editorial commissions & 2026/2027 wedding bookings."
  },

  selectedWorks: [
    {
      id: "sel-1",
      title: "Editorial Precision",
      category: "Editorial",
      tag: "PRINT & DIGITAL",
      image: "assets/images/selected_editorial.jpg",
      description: "Sharp graphic double liner with dewy luminous skin architecture for Vogue Italia spread.",
      client: "Vogue Italia",
      year: "2026",
      featured: true,
      gridSpan: "large"
    },
    {
      id: "sel-2",
      title: "Botanical Reverie",
      category: "Bridal",
      tag: "BESPOKE",
      image: "assets/images/selected_bridal.jpg",
      description: "Ethereal luminous bridal artistry at the historic Hudson Valley glasshouse estate.",
      client: "Luxury Bridal Commission",
      year: "2026",
      featured: true,
      gridSpan: "small"
    },
    {
      id: "sel-3",
      title: "Crimson Lacquer",
      category: "Editorial",
      tag: "COMMERCIAL",
      image: "assets/images/selected_lips.jpg",
      description: "High-shine vinyl red lip macro study for Harper's Bazaar beauty supplement.",
      client: "Harper's Bazaar",
      year: "2026",
      featured: true,
      gridSpan: "small"
    }
  ],

  services: [
    {
      id: "01",
      number: "01",
      title: "Bridal Artistry",
      subtitle: "Bespoke & Ethereal",
      image: "assets/images/bridal_single.jpg",
      imageAlt: "Luxury Bride in off-shoulder gown",
      description: "A luxurious, comprehensive bridal experience designed to create a timeless, ethereal look. From the initial consultation to the final touch-up, every detail is meticulously planned for a serene wedding morning.",
      includesTitle: "EXPERIENCE INCLUDES",
      includes: [
        "In-depth Design Consultation & Skin Assessment",
        "Comprehensive 3-Hour Trial & Lighting Preview",
        "Luxury Skin Prep & Day-of Bespoke Artistry",
        "Curated Luxury Touch-Up Kit for the Evening",
        "Liaison with Photographer for Optimal Shutter Glow"
      ],
      ctaText: "INQUIRE FOR BRIDAL",
      ctaType: "inquire",
      inquiryType: "Luxury Bridal"
    },
    {
      id: "02",
      number: "02",
      title: "Editorial & Commercial",
      subtitle: "Campaign & High Fashion",
      image: "assets/images/editorial_lip_model.jpg",
      imageAlt: "Editorial model with graphic liner and bold lip",
      description: "Collaborative artistry for fashion, film, and print. Specializing in avant-garde concepts and flawless execution for high-resolution imagery, aligning perfectly with creative direction.",
      includesTitle: "CAPABILITIES",
      includes: [
        "Campaign & Runway Conceptualization",
        "High-Fashion Editorial & Print Media",
        "Commercial Video & High-Definition Film",
        "Creative Direction & On-Set Beauty Consulting",
        "Fast-Paced Backstage Keying & Lead Team"
      ],
      ctaText: "REQUEST RATE CARD",
      ctaType: "rateCard",
      inquiryType: "Editorial & Commercial"
    },
    {
      id: "03",
      number: "03",
      title: "Private Masterclasses",
      subtitle: "Professional & Personal Education",
      image: "assets/images/vanity_tools.jpg",
      imageAlt: "Luxury makeup vanity with professional brushes and products",
      description: "One-on-one artistry education designed for both aspiring professionals and individuals seeking to refine their personal technique. A focused, intensive session tailored entirely to your goals.",
      includesTitle: "CURRICULUM FOCUS",
      includes: [
        "Skin Preparation & Architecture Fundamentals",
        "Advanced Seamless Blending & Contour Lighting",
        "Kit Curation & Luxury Product Knowledge",
        "Personal Branding, Lighting & Portfolio Direction",
        "Lifetime Access to Aura Masterclass Syllabus"
      ],
      ctaText: "BOOK A SESSION",
      ctaType: "inquire",
      inquiryType: "Private Masterclasses"
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Geometric Horizon",
      category: "editorial",
      categoryLabel: "EDITORIAL",
      image: "assets/images/selected_editorial.jpg",
      caption: "Precision graphic liner on sculpted glowing canvas.",
      publication: "Vogue Beauty",
      credits: "Photography: Julian Ross | Model: Elena V."
    },
    {
      id: "gal-2",
      title: "Monochrome Fluidity",
      category: "avant-garde",
      categoryLabel: "AVANT-GARDE",
      image: "assets/images/avant_garde.jpg",
      caption: "Sculptural fluid monochrome face paint with deep crimson ombre lips.",
      publication: "L'Officiel Art",
      credits: "Photography: Marcus Thorne | Model: Clara Jin"
    },
    {
      id: "gal-3",
      title: "Liquid Chrome Profile",
      category: "editorial",
      categoryLabel: "EDITORIAL",
      image: "assets/images/metallic_eyes.jpg",
      caption: "Reflective silver foil eyeshadow with wet-look hair styling.",
      publication: "Dazed Beauty",
      credits: "Photography: Soren Blake | Model: Naomi K."
    },
    {
      id: "gal-4",
      title: "The Pearl Inception",
      category: "avant-garde",
      categoryLabel: "AVANT-GARDE",
      image: "assets/images/pearl_eye_detail.jpg",
      caption: "Ultra-glossy lid with delicate iridescent pearl placed at the inner tear duct.",
      publication: "Cereal Magazine",
      credits: "Macro Photography: Elena Vance"
    },
    {
      id: "gal-5",
      title: "Greenhouse Romance",
      category: "bridal",
      categoryLabel: "BRIDAL",
      image: "assets/images/selected_bridal.jpg",
      caption: "Soft romantic bridal glam in a lush historic glasshouse estate.",
      publication: "Brides Luxury",
      credits: "Location: Hudson Valley | Bride: Sophia & Charles"
    },
    {
      id: "gal-6",
      title: "Velvet Red Muse",
      category: "bridal",
      categoryLabel: "BRIDAL",
      image: "assets/images/bridal_red_lip.jpg",
      caption: "Modern minimalist bride with bold velvety crimson statement lip.",
      publication: "The Lane",
      credits: "Photography: Chloe Monet | Bride: Isabella M."
    },
    // Additional items loaded on "Load More"
    {
      id: "gal-7",
      title: "Luminous Muse",
      category: "editorial",
      categoryLabel: "EDITORIAL",
      image: "assets/images/hero_muse.jpg",
      caption: "Clean glass skin and pearl choker aesthetic for contemporary editorial.",
      publication: "Vogue Scandinavia",
      credits: "Photography: Liam Gray | Model: Anja B."
    },
    {
      id: "gal-8",
      title: "The New Bold",
      category: "editorial",
      categoryLabel: "EDITORIAL",
      image: "assets/images/editorial_lip_model.jpg",
      caption: "Intense double winged liner with deep berry lacquer lips.",
      publication: "Elle International",
      credits: "Cover Story | Model: Zahra N."
    },
    {
      id: "gal-9",
      title: "Gardenia Solitude",
      category: "bridal",
      categoryLabel: "BRIDAL",
      image: "assets/images/bridal_single.jpg",
      caption: "Classic bridal elegance in ivory silk with radiant dewy complexion.",
      publication: "Vogue Weddings",
      credits: "Estate Villa | Bride: Katherine L."
    },
    {
      id: "gal-10",
      title: "Vinyl Gloss Study",
      category: "editorial",
      categoryLabel: "EDITORIAL",
      image: "assets/images/selected_lips.jpg",
      caption: "High-definition beauty macro of glossy cherry lacquer.",
      publication: "Harper's Bazaar",
      credits: "Beauty Direction: Aura V."
    },
    {
      id: "gal-11",
      title: "Studio Atelier Curation",
      category: "editorial",
      categoryLabel: "EDITORIAL",
      image: "assets/images/vanity_tools.jpg",
      caption: "Marble workstation and curated French luxury cosmetic palettes.",
      publication: "Kinfolk Home & Atelier",
      credits: "Atelier NYC"
    },
    {
      id: "gal-12",
      title: "Warm Cashmere Glow",
      category: "bridal",
      categoryLabel: "BRIDAL",
      image: "assets/images/inquire_model.jpg",
      caption: "Dewy sunlit skin texture with subtle blush undertones.",
      publication: "Kinfolk Beauty",
      credits: "Model: Sarah D."
    }
  ],

  press: [
    { name: "Vogue" },
    { name: "Harper's Bazaar" },
    { name: "Elle" },
    { name: "L'Officiel" },
    { name: "Kinfolk" },
    { name: "Cereal" }
  ],

  rates: [
    {
      tier: "Editorial & Campaign",
      rate: "From $2,800 / day",
      details: "Full day on-set key artist, creative moodboard consultation, unlimited looks, digital prep."
    },
    {
      tier: "Half-Day Commercial",
      rate: "From $1,600 / 4-hr",
      details: "Lookbook, e-commerce, commercial beauty, quick turnaround kit, assistant key."
    },
    {
      tier: "Bespoke Bridal Suite",
      rate: "From $1,950",
      details: "Full bridal design consultation, 3-hour trial, wedding morning day-of artistry & luxury kit."
    },
    {
      tier: "Private Masterclass",
      rate: "$1,200 / session",
      details: "One-on-one intensive (4 hours), kit review, hands-on model demonstration & curriculum guide."
    }
  ]
};
