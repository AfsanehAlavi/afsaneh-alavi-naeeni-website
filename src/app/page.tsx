import { HeroSection } from "@/components/blocks/3d-hero-section-boxes";
import { Services } from "@/components/sections/services";
import { Booking } from "@/components/sections/booking";
import { About } from "@/components/sections/about";
import { Resume } from "@/components/sections/resume";
import { Webinars } from "@/components/sections/webinars";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Services />
      <Booking />
      <About />
      <Resume />
      <Webinars />
      <Contact />
      <Footer />
    </div>
  );
}
