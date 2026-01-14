"use client";

import { motion } from "framer-motion";
import {
    Globe,
    Briefcase,
    Rocket,
    CreditCard,
    MessageCircle,
    Check,
} from "lucide-react";

const WHATSAPP_NUMBER = "2348070822409";

// Package types for hybrid payment flow
type PackageType = "fixed" | "custom";

interface Package {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    priceNote?: string;
    type: PackageType;
    icon: typeof Globe;
    features: string[];
    popular?: boolean;
    paystackLink?: string;
    whatsappMessage: string;
}

const packages: Package[] = [
    {
        id: "basic",
        title: "Basic",
        subtitle: "Static website",
        price: "₦200k",
        type: "fixed",
        icon: Globe,
        features: [
            "Single Page Design",
            "Mobile Responsive",
            "Contact Form",
            "Social Media Links",
            "SEO Optimized",
            "Fast Loading Speed",
            "1-Week Delivery",
        ],
        paystackLink: "https://paystack.com/pay/keraunos-basic",
        whatsappMessage:
            "Hello Keraunos Labs! I want to order the Basic Package (₦200k). When can we start?",
    },
    {
        id: "business",
        title: "Business",
        subtitle: "CMS & E-Commerce",
        price: "₦600k",
        type: "fixed",
        icon: Briefcase,
        features: [
            "Multi-Page Website",
            "Content Management System",
            "E-Commerce Ready",
            "Payment Integration (Paystack)",
            "Admin Dashboard",
            "Email Notifications",
            "2-Week Delivery",
        ],
        popular: true,
        paystackLink: "https://paystack.com/pay/keraunos-business",
        whatsappMessage:
            "Hello Keraunos Labs! I want to order the Business Package (₦600k). When can we start?",
    },
    {
        id: "custom",
        title: "Custom",
        subtitle: "SaaS, dApps & More",
        price: "$$$",
        priceNote: "Let's discuss",
        type: "custom",
        icon: Rocket,
        features: [
            "Full-Stack Web Application",
            "Smart Contracts / Web3",
            "Custom API Development",
            "Database Architecture",
            "Authentication & Security",
            "Scalable Infrastructure",
            "Ongoing Support",
        ],
        whatsappMessage:
            "Hello Keraunos Labs! I need a custom solution (SaaS/dApp/Web3). Let's discuss my project requirements.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

export default function Services() {
    const handleAction = (pkg: Package) => {
        if (pkg.type === "fixed" && pkg.paystackLink) {
            // Direct to Paystack for fixed-price packages
            window.open(pkg.paystackLink, "_blank");
        } else {
            // Open WhatsApp for custom packages
            const message = encodeURIComponent(pkg.whatsappMessage);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
        }
    };

    return (
        <section
            id="packages"
            className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
        >
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#00f3ff] text-sm uppercase tracking-widest mb-4 block">
                        Services & Pricing
                    </span>
                    <h2 className="heading-lg font-[family-name:var(--font-space-grotesk)] mb-4">
                        Choose Your Package
                    </h2>
                    <p className="text-[#9ca3af] max-w-2xl mx-auto">
                        Transparent pricing for quality work. Select a package that fits
                        your needs, or let's discuss a custom solution.
                    </p>
                </motion.div>

                {/* Packages Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {packages.map((pkg) => {
                        const IconComponent = pkg.icon;
                        return (
                            <motion.div
                                key={pkg.id}
                                variants={cardVariants}
                                className={`relative group glass glass-hover rounded-xl p-8 flex flex-col ${pkg.popular
                                    ? "border-[#00f3ff] shadow-[0_0_40px_rgba(0,243,255,0.1)]"
                                    : ""
                                    }`}
                            >
                                {/* Popular Badge */}
                                {pkg.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00f3ff] text-[#0a0a0a] text-xs font-bold uppercase rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-lg bg-[rgba(0,243,255,0.1)] flex items-center justify-center mb-6 group-hover:bg-[rgba(0,243,255,0.2)] transition-colors">
                                    <IconComponent className="w-7 h-7 text-[#00f3ff]" />
                                </div>

                                {/* Title & Subtitle */}
                                <h3 className="heading-md font-[family-name:var(--font-space-grotesk)] mb-1">
                                    {pkg.title}
                                </h3>
                                <p className="text-[#6b7280] text-sm mb-4">{pkg.subtitle}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-[#e5e5e5]">
                                        {pkg.price}
                                    </span>
                                    {pkg.priceNote && (
                                        <span className="text-[#6b7280] text-sm ml-2">
                                            {pkg.priceNote}
                                        </span>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {pkg.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-[#9ca3af] text-sm"
                                        >
                                            <Check className="w-4 h-4 text-[#00f3ff] flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleAction(pkg)}
                                    className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${pkg.type === "fixed"
                                        ? "bg-[#00f3ff] text-[#0a0a0a] hover:bg-[#00d4e0] hover:shadow-[0_10px_40px_rgba(0,243,255,0.3)]"
                                        : "bg-transparent border border-[#00f3ff] text-[#00f3ff] hover:bg-[rgba(0,243,255,0.1)]"
                                        }`}
                                >
                                    {pkg.type === "fixed" ? (
                                        <>
                                            <CreditCard className="w-4 h-4" />
                                            Order Now
                                        </>
                                    ) : (
                                        <>
                                            <MessageCircle className="w-4 h-4" />
                                            Chat on WhatsApp
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Custom Project Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-[#6b7280]">
                        Need something different?{" "}
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                "Hello Keraunos Labs! I have a custom project I'd like to discuss."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00f3ff] hover:underline"
                        >
                            Let's discuss your custom project →
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
