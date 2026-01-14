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

    useEffect(() => {
        if (marqueeRef.current) {
            const contentWidth = marqueeRef.current.scrollWidth / 2;
            // Adjust duration based on content width for consistent speed perception
            setAnimationDuration(contentWidth / speed);
        }
    }, [speed, children]);

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
                    animation: `marquee ${animationDuration}s linear infinite`,
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
