"use client";

import { useRef, useEffect, useState } from "react";

interface InfiniteMarqueeProps {
    children: React.ReactNode;
    speed?: number;
    direction?: "left" | "right";
    pauseOnHover?: boolean;
    className?: string;
}

export default function InfiniteMarquee({
    children,
    speed = 30,
    direction = "left",
    pauseOnHover = true,
    className = "",
}: InfiniteMarqueeProps) {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState(30);
    const [isPaused, setIsPaused] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    // Mark as mounted to avoid hydration mismatch
    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted && marqueeRef.current) {
            const contentWidth = marqueeRef.current.scrollWidth / 2;
            // Adjust duration based on content width for consistent speed perception
            setAnimationDuration(contentWidth / speed);
        }
    }, [speed, children, hasMounted]);

    return (
        <div
            className={`overflow-hidden whitespace-nowrap ${className}`}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            <div
                ref={marqueeRef}
                className="inline-flex"
                style={{
                    // Use individual properties instead of shorthand to avoid conflicts
                    animationName: "marquee",
                    animationDuration: `${animationDuration}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDirection: direction === "right" ? "reverse" : "normal",
                    animationPlayState: isPaused ? "paused" : "running",
                }}
            >
                {/* Duplicate content for seamless loop */}
                <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
                    {children}
                </div>
                <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
}
