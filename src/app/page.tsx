"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Animation wrapper for scroll reveal effect
const SectionWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Portfolio Section */}
      <SectionWrapper>
        <Portfolio />
      </SectionWrapper>

      {/* Services/Packages Section */}
      <SectionWrapper>
        <Services />
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper>
        <Contact />
      </SectionWrapper>

      {/* Footer */}
      <Footer />
    </main>
  );
}
