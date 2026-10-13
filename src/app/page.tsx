import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { Services } from "@/components/sections/services";
import { StatsBand } from "@/components/sections/stats-band";
import { CaseStudies } from "@/components/sections/case-studies";
import { WebinarBanner } from "@/components/sections/webinar-banner";
import { Awards } from "@/components/sections/awards";
import { PartnersBand } from "@/components/sections/partners-band";
import { Podcasts } from "@/components/sections/podcasts";
import { Insights } from "@/components/sections/insights";
import { CtaContact } from "@/components/sections/cta-contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ClientMarquee />
        <Services />
        <StatsBand />
        <CaseStudies />
        <WebinarBanner />
        <Awards />
        <PartnersBand />
        <Podcasts />
        <Insights />
        <CtaContact />
      </main>
      <Footer />
    </>
  );
}
