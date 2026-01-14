"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    MessageCircle,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Twitter,
    Instagram,
    Github,
} from "lucide-react";

const WHATSAPP_NUMBER = "2348070822409";

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
    budget: string;
}

const budgetOptions = [
    "Under ₦500k",
    "₦500k - ₦1M",
    "₦1M - ₦3M",
    "₦3M+",
    "Not sure yet",
];

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after showing success
        setTimeout(() => {
            setFormData({
                name: "",
                email: "",
                company: "",
                message: "",
                budget: "",
            });
            setIsSubmitted(false);
        }, 3000);
    };

    const openWhatsApp = () => {
        const message = encodeURIComponent(
            `Hello Keraunos Labs! I'm ${formData.name || "interested"}${formData.company ? ` from ${formData.company}` : ""
            }. ${formData.message || "I'd like to discuss a project."}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    };

    return (
        <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#00f3ff] text-sm uppercase tracking-widest mb-4 block">
                            Get in Touch
                        </span>
                        <h2 className="heading-lg font-[family-name:var(--font-space-grotesk)] mb-6">
                            Let's Build Something{" "}
                            <span className="text-[#00f3ff]">Amazing</span>
                        </h2>
                        <p className="text-[#9ca3af] mb-12 leading-relaxed">
                            Ready to start your project? Fill out the form or reach out
                            directly via WhatsApp for a faster response. We typically respond
                            within 24 hours.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6 mb-12">
                            <a
                                href="mailto:zeuscapital08@gmail.com"
                                className="flex items-center gap-4 text-[#9ca3af] hover:text-[#00f3ff] transition-colors"
                            >
                                <div className="w-12 h-12 rounded-lg bg-[rgba(0,243,255,0.1)] flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-[#00f3ff]" />
                                </div>
                                <span>zeuscapital08@gmail.com</span>
                            </a>
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-[#9ca3af] hover:text-[#00f3ff] transition-colors"
                            >
                                <div className="w-12 h-12 rounded-lg bg-[rgba(0,243,255,0.1)] flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-[#00f3ff]" />
                                </div>
                                <span>+234 807 082 2409</span>
                            </a>
                            <div className="flex items-center gap-4 text-[#9ca3af]">
                                <div className="w-12 h-12 rounded-lg bg-[rgba(0,243,255,0.1)] flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[#00f3ff]" />
                                </div>
                                <span>Lagos, Nigeria</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { icon: Linkedin, href: "https://linkedin.com" },
                                { icon: Twitter, href: "https://twitter.com" },
                                { icon: Instagram, href: "https://instagram.com" },
                                { icon: Github, href: "https://github.com" },
                            ].map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#6b7280] hover:border-[#00f3ff] hover:text-[#00f3ff] transition-colors"
                                    >
                                        <IconComponent className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass rounded-xl p-8"
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-20 h-20 rounded-full bg-[rgba(0,243,255,0.1)] flex items-center justify-center mb-6">
                                        <Send className="w-8 h-8 text-[#00f3ff]" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-[#9ca3af]">
                                        We'll get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium mb-2"
                                        >
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#e5e5e5] placeholder-[#6b7280] focus:outline-none focus:border-[#00f3ff] transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium mb-2"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#e5e5e5] placeholder-[#6b7280] focus:outline-none focus:border-[#00f3ff] transition-colors"
                                            placeholder="john@company.com"
                                        />
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="block text-sm font-medium mb-2"
                                        >
                                            Company{" "}
                                            <span className="text-[#6b7280]">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#e5e5e5] placeholder-[#6b7280] focus:outline-none focus:border-[#00f3ff] transition-colors"
                                            placeholder="Acme Inc."
                                        />
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label
                                            htmlFor="budget"
                                            className="block text-sm font-medium mb-2"
                                        >
                                            Budget Range
                                        </label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#e5e5e5] focus:outline-none focus:border-[#00f3ff] transition-colors appearance-none"
                                        >
                                            <option value="" disabled>
                                                Select budget range
                                            </option>
                                            {budgetOptions.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                    className="bg-[#0a0a0a]"
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium mb-2"
                                        >
                                            Project Details
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#e5e5e5] placeholder-[#6b7280] focus:outline-none focus:border-[#00f3ff] transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={openWhatsApp}
                                            className="flex-1 btn-secondary"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            WhatsApp Instead
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
