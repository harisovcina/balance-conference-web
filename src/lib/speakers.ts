export type Speaker = {
  slug: string;
  name: string;
  location: string;
  shortDescription: string;
  image: string;
  bio: string[];
  quote?: string;
  motto?: {
    label: string;
    highlight: string;
    description: string;
  };
  social: {
    email?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export const speakers: Speaker[] = [
  {
    slug: 'marija-sinanovic',
    name: 'Marija Sinanović',
    location: 'Belgrade, Serbia',
    shortDescription: 'Founder of Yellow Brick educational center, HR consultant and educator',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
    bio: [
      'Marija Sinanović is the founder of Yellow Brick educational center, an HR consultant, and educator specializing in leadership development, communication training, executive coaching, and talent development.',
      'Her approach balances business tools with personal transformation, believing that sustainable organizational growth comes through operational excellence and individual evolution.',
    ],
    quote: 'When we lose the ground beneath our feet',
    motto: {
      label: 'At the heart of everything she does:',
      highlight: 'Change is the only constant we can count on.',
      description: 'Not the buzzword kind. The real, transformative kind.',
    },
    social: {
      email: 'mailto:marija@example.com',
      linkedin: 'https://linkedin.com/in/marija-sinanovic',
      instagram: 'https://instagram.com/marija_sinanovic',
    },
  },
  {
    slug: 'akan-abdula',
    name: 'Akan Abdula',
    location: 'Sarajevo, Bosnia and Herzegovina',
    shortDescription: 'Brand Strategist & Author',
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&h=1200&fit=crop',
    bio: [
      'Akan Abdula is a renowned brand strategist and author with over 15 years of experience in building meaningful brands that resonate with audiences.',
      'His work focuses on creating authentic connections between brands and their communities, emphasizing storytelling and emotional engagement.',
    ],
    quote: 'Brands are built on stories, not products',
    social: {
      email: 'mailto:akan@example.com',
      linkedin: 'https://linkedin.com/in/akan-abdula',
      instagram: 'https://instagram.com/akan_abdula',
    },
  },
  {
    slug: 'dr-bilgin-sait',
    name: 'Dr. Bilgin Sait',
    location: 'Istanbul, Turkey',
    shortDescription: 'Neuroscientist & Educator',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop',
    bio: [
      'Dr. Bilgin Sait is a leading neuroscientist and educator whose research bridges the gap between brain science and practical applications in education and wellbeing.',
      'His groundbreaking work on neuroplasticity and learning has transformed how we understand human potential and cognitive development.',
    ],
    quote: 'The brain is not fixed; it is constantly reshaping itself',
    social: {
      email: 'mailto:bilgin@example.com',
      linkedin: 'https://linkedin.com/in/dr-bilgin-sait',
    },
  },
  {
    slug: 'prof-dr-maja-volk',
    name: 'Prof. dr. Maja Volk',
    location: 'Ljubljana, Slovenia',
    shortDescription: 'Nutritionist & Wellness Expert',
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800&h=1200&fit=crop',
    bio: [
      'Prof. dr. Maja Volk is a distinguished nutritionist and wellness expert with decades of experience in holistic health approaches.',
      'Her research and practice integrate traditional wisdom with modern science, focusing on sustainable lifestyle changes that promote long-term wellbeing.',
    ],
    quote: 'True wellness is a journey, not a destination',
    social: {
      email: 'mailto:maja@example.com',
      linkedin: 'https://linkedin.com/in/prof-dr-maja-volk',
      instagram: 'https://instagram.com/maja_volk',
    },
  },
  {
    slug: 'anya-patel',
    name: 'Anya Patel',
    location: 'London, United Kingdom',
    shortDescription: 'Mindfulness Teacher',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=1200&fit=crop',
    bio: [
      'Anya Patel is a certified mindfulness teacher and meditation guide who has helped thousands of people find peace and clarity in their daily lives.',
      'Her approach combines ancient meditation practices with modern psychological insights, making mindfulness accessible to everyone.',
    ],
    quote: 'In the stillness, we find our strength',
    social: {
      email: 'mailto:anya@example.com',
      linkedin: 'https://linkedin.com/in/anya-patel',
      instagram: 'https://instagram.com/anya_patel',
    },
  },
  {
    slug: 'david-chen',
    name: 'David Chen',
    location: 'San Francisco, USA',
    shortDescription: 'Organizational Psychologist',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&h=1200&fit=crop',
    bio: [
      'David Chen is an organizational psychologist specializing in workplace wellbeing and team dynamics.',
      'His research focuses on creating healthier work environments that support both individual growth and organizational success.',
    ],
    quote: 'Balance is not about doing less; it\'s about doing what matters',
    social: {
      email: 'mailto:david@example.com',
      linkedin: 'https://linkedin.com/in/david-chen',
    },
  },
];

export function getSpeakerBySlug(slug: string): Speaker | undefined {
  return speakers.find((speaker) => speaker.slug === slug);
}

export function getAllSpeakerSlugs(): string[] {
  return speakers.map((speaker) => speaker.slug);
}

