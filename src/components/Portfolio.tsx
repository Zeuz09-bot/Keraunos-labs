"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    liveUrl: string;
    category: string;
}

const projects: Project[] = [
    {
        id: "defi-dashboard",
        title: "DeFi Dashboard",
        description:
            "A comprehensive decentralized finance dashboard for tracking portfolios, swapping tokens, and staking across multiple chains.",
        techStack: ["Next.js", "Solidity", "ethers.js", "TailwindCSS"],
        imageUrl: "/projects/defi-dashboard.jpg",
        liveUrl: "https://example.com/defi",
        category: "Web3",
    },
    {
        id: "ecommerce-platform",
        title: "Luxury E-Commerce",
        description:
            "A premium e-commerce platform for a fashion brand with integrated payments, inventory management, and analytics.",
        techStack: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
        imageUrl: "/projects/ecommerce.jpg",
        liveUrl: "https://example.com/shop",
        category: "E-Commerce",
    },
    {
        id: "saas-analytics",
        title: "SaaS Analytics",
        description:
            "A real-time analytics platform for SaaS businesses to track user engagement, revenue, and growth metrics.",
        techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
        imageUrl: "/projects/analytics.jpg",
        liveUrl: "https://example.com/analytics",
        category: "SaaS",
    },
];

export default function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { scrollXProgress } = useScroll({
        container: scrollContainerRef,
    });

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <section
            id="portfolio"
            ref={containerRef}
            className="py-24 md:py-32 overflow-hidden"
        >
            <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24 mb-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <span className="text-[#00f3ff] text-sm uppercase tracking-widest mb-4 block">
                            Selected Work
                        </span>
                        <h2 className="heading-lg font-[family-name:var(--font-space-grotesk)]">
                            Our Portfolio
                        </h2>
                    </div>

                    {/* Scroll Controls */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={scrollLeft}
                            className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[#00f3ff] hover:text-[#00f3ff] transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[#00f3ff] hover:text-[#00f3ff] transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 h-[2px] bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden"
                >
                    <motion.div
                        className="h-full bg-[#00f3ff]"
                        style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
                    />
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollContainerRef}
                className="horizontal-scroll pl-6 md:pl-12 lg:pl-24 pb-8"
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative w-[320px] md:w-[450px] lg:w-[550px] mr-6 md:mr-8"
                    >
                        {/* Project Card */}
                        <div className="glass rounded-xl overflow-hidden transition-all duration-500 group-hover:border-[#00f3ff]">
                            {/* Image Container */}
                            <div className="relative h-[220px] md:h-[280px] overflow-hidden bg-[#141414]">
                                {/* Placeholder gradient when no image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-6xl opacity-20">
                                            {project.category === "Web3"
                                                ? "⟠"
                                                : project.category === "E-Commerce"
                                                    ? "🛍"
                                                    : "📊"}
                                        </span>
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm rounded-full text-xs font-medium text-[#00f3ff]">
                                    {project.category}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-[rgba(0,243,255,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)] group-hover:text-[#00f3ff] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-[#6b7280] text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs bg-[rgba(255,255,255,0.05)] rounded-full text-[#9ca3af]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#e5e5e5] hover:text-[#00f3ff] transition-colors"
                                >
                                    Visit Live
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Spacer for scroll padding */}
                <div className="w-6 md:w-12 lg:w-24 flex-shrink-0" />
            </div>
        </section>
    );
}
