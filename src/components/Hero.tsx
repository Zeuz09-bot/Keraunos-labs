"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";

const WHATSAPP_NUMBER = "2348070822409";
const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hello Keraunos Labs! I'm interested in starting a project. Let's discuss."
);

export default function Hero() {
    const scrollToPackages = () => {
        const element = document.getElementById("packages");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        >
            {/* Main Content */}
            <div className="container mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(20,20,20,0.8)]"
                    >
                        <span className="w-2 h-2 bg-[#00f3ff] rounded-full animate-pulse" />
                        <span className="text-sm text-[#9ca3af]">
                            Web3 & Full-Stack Development
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="heading-xl mb-6 font-[family-name:var(--font-space-grotesk)]">
                        <ScrambleText
                            text="From Idea to"
                            className="block"
                            scrambleOnLoad={true}
                            scrambleOnHover={true}
                            duration={1200}
                        />
                        <span className="text-[#00f3ff] glow">
                            <ScrambleText
                                text="Scalable Technology"
                                scrambleOnLoad={true}
                                scrambleOnHover={true}
                                duration={1500}
                            />
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl text-[#9ca3af] max-w-2xl mb-12 leading-relaxed"
                    >
                        We build high-performance websites, dApps, and software for
                        ambitious brands. From MVPs to enterprise solutions, we turn your
                        vision into reality.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button onClick={scrollToPackages} className="btn-primary">
                            View Packages
                            <ArrowDown className="w-4 h-4" />
                        </button>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Start a Project
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Infinite Marquee */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-b border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.9)] py-4">
                <InfiniteMarquee speed={40}>
                    <span className="text-2xl md:text-3xl font-bold text-[#9ca3af] opacity-50">
                        IDEA TO SCALABLE TECHNOLOGY
                    </span>
                    <span className="text-[#00f3ff] opacity-50">✦</span>
                    <span className="text-2xl md:text-3xl font-bold text-[#9ca3af] opacity-50">
                        WEB DEVELOPMENT
                    </span>
                    <span className="text-[#00f3ff] opacity-50">✦</span>
                    <span className="text-2xl md:text-3xl font-bold text-[#9ca3af] opacity-50">
                        SMART CONTRACTS
                    </span>
                    <span className="text-[#00f3ff] opacity-50">✦</span>
                    <span className="text-2xl md:text-3xl font-bold text-[#9ca3af] opacity-50">
                        E-COMMERCE
                    </span>
                    <span className="text-[#00f3ff] opacity-50">✦</span>
                    <span className="text-2xl md:text-3xl font-bold text-[#9ca3af] opacity-50">
                        MVP DEVELOPMENT
                    </span>
                    <span className="text-[#00f3ff] opacity-50">✦</span>
                </InfiniteMarquee>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex flex-col items-center gap-2 text-[#6b7280]"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ArrowDown className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </section>
    );
}
