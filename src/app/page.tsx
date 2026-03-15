import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import DonationMethods from "@/components/DonationMethods";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Testimonials />
      <Gallery />
      <FAQ />
      <DonationMethods />
      <Footer />
    </>
  );
}

