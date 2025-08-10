import { Courses } from "@/components/client/Courses";
import { Navbar } from "@/components/client/Navbar";
import { TextCarouselSection } from "@/components/client/TextCarouselSection";
import { WaterSection } from "@/components/client/WaterSection";
import { FAQSection } from "@/components/server/FAQSection";
import { HeroSection } from "@/components/server/HeroSection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection id="home" />
        <TextCarouselSection id="carousel" />
        <WaterSection id="water" />
        <Courses />
        <FAQSection id="faq" />
      </main>
    </>
  );
}
