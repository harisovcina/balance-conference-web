import dynamic from 'next/dynamic';
import { TopNavigation } from "@/components/blocks/top-navigation";
import { HeroSection } from "@/components/blocks/hero-section-5";

// Lazy load below-the-fold components
const GradualBlur = dynamic(() => import("@/components/ui/gradual-blur"));
const AnimatedMarqueeHero = dynamic(() => import("@/components/ui/hero-3").then(mod => ({ default: mod.AnimatedMarqueeHero })), {
  loading: () => <div className="h-screen" />,
});
const SarajevoConference = dynamic(() => import("@/components/blocks/sarajevo-conference"));
const PastSpeakers = dynamic(() => import("@/components/blocks/past-speakers").then(mod => ({ default: mod.PastSpeakers })));
const ShareExpertise = dynamic(() => import("@/components/blocks/share-expertise"));
const BlogSection = dynamic(() => import("@/components/ui/blog-section").then(mod => ({ default: mod.BlogSection })));
const HoverFooter = dynamic(() => import("@/components/ui/hover-footer").then(mod => ({ default: mod.HoverFooter })));

const CONFERENCE_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=60",
];

export default function Home() {
  return (
    <>
      {/* GradualBlur effect for entire page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="10rem"
        strength={.5}
        divCount={4}
        opacity={1}
        zIndex={1000}
      />
      
      <TopNavigation scrollThreshold={880} />
      <HeroSection />
      <AnimatedMarqueeHero
        tagline="THE ART OF BALANCE"
        title={
          <>
            Slow Down. Breathe In.
            <br />
            Begin <span className="text-accent-magenta">Again.</span>
          </>
        }
        description="Join a community redefining what it means to live well, inside and out. Reconnect with yourself, others, and what truly matters."
        ctaText="See How We Do It"
        ctaLink="/about"
        images={CONFERENCE_IMAGES}
      />
      <SarajevoConference />
      <ShareExpertise />
      <PastSpeakers />
      
      {/* Latest Insights Section */}

<section className="w-full bg-balance-500 backdrop-blur-sm">
      <section className="mx-auto max-w-6xl relative z-10 py-16">
        <BlogSection
          heading="Latest Insights"
          description="Explore articles on balance, wellness, and personal growth from our community."
          desktopColumns={3}
          tabletColumns={3}
          mobileColumns={1}
        />
      </section>
    </section>
      
      <HoverFooter />
    </>
  );
}
