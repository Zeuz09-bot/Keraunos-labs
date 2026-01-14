"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Github, ArrowUp } from "lucide-react";
import Image from "next/image";

const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
];

const footerLinks = [
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Contract Agreement", href: "#" },
        ],
    },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="border-t border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.95)]">
            <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Keraunos Labs"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="font-bold text-xl tracking-tight font-[family-name:var(--font-space-grotesk)]">
                                Keraunos<span className="text-[#00f3ff]">Labs</span>
                            </span>
                        </div>
                        <p className="text-[#6b7280] max-w-md mb-6">
                            We build high-performance websites, dApps, and software for
                            ambitious brands. From idea to scalable technology.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#6b7280] hover:border-[#00f3ff] hover:text-[#00f3ff] transition-colors"
                                    >
                                        <IconComponent className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((column) => (
                        <div key={column.title}>
                            <h4 className="font-semibold mb-4">{column.title}</h4>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-[#6b7280] hover:text-[#00f3ff] transition-colors text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[rgba(255,255,255,0.05)] gap-4">
                    <p className="text-[#6b7280] text-sm">
                        © {new Date().getFullYear()} Keraunos Labs. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00f3ff] transition-colors"
                    >
                        Back to top
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
