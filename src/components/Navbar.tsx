"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]"
                    : "bg-transparent"
                }`}
        >
            <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("#hero");
                        }}
                        className="relative z-10 flex items-center gap-3"
                    >
                        <Image
                            src="/logo.png"
                            alt="Keraunos Labs"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="font-bold text-xl tracking-tight font-[family-name:var(--font-space-grotesk)] hidden sm:block">
                            Keraunos<span className="text-[#00f3ff]">Labs</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.href);
                                }}
                                className="text-sm font-medium text-[#9ca3af] hover:text-[#e5e5e5] transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00f3ff] transition-all group-hover:w-full" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#contact");
                            }}
                            className="btn-primary text-sm py-2.5 px-5"
                        >
                            Start Project
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-10 md:hidden w-10 h-10 flex items-center justify-center"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-[#0a0a0a] md:hidden pt-20"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(link.href);
                                    }}
                                    className="text-2xl font-medium text-[#e5e5e5] hover:text-[#00f3ff] transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick("#contact");
                                }}
                                className="btn-primary mt-4"
                            >
                                Start Project
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
