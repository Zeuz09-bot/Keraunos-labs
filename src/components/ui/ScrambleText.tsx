"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleOnLoad?: boolean;
    scrambleOnHover?: boolean;
    duration?: number;
    characterSet?: string;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/\\";

export default function ScrambleText({
    text,
    className = "",
    scrambleOnLoad = true,
    scrambleOnHover = true,
    duration = 1500,
    characterSet = DEFAULT_CHARS,
}: ScrambleTextProps) {
    // Start with original text to avoid hydration mismatch
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;

        setIsScrambling(true);
        const originalText = text;
        const length = originalText.length;
        const iterations = duration / 50;
        let currentIteration = 0;

        const interval = setInterval(() => {
            currentIteration++;
            const progress = currentIteration / iterations;

            const newText = originalText
                .split("")
                .map((char, index) => {
                    // Keep spaces as spaces
                    if (char === " ") return " ";

                    // Reveal characters progressively from left to right
                    const revealPoint = progress * length;
                    if (index < revealPoint) {
                        return originalText[index];
                    }

                    // Random character for unrevealed positions
                    return characterSet[Math.floor(Math.random() * characterSet.length)];
                })
                .join("");

            setDisplayText(newText);

            if (currentIteration >= iterations) {
                clearInterval(interval);
                setDisplayText(originalText);
                setIsScrambling(false);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [text, duration, characterSet, isScrambling]);

    // Mark component as mounted on client
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Trigger scramble effect only after client-side mount
    useEffect(() => {
        if (hasMounted && scrambleOnLoad) {
            // Start scramble animation after a small delay
            const timeout = setTimeout(() => {
                scramble();
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [hasMounted, scrambleOnLoad, scramble]);

    return (
        <span
            className={`inline-block font-mono tracking-tight ${className}`}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
            style={{ cursor: scrambleOnHover ? "pointer" : "default" }}
        >
            {displayText}
        </span>
    );
}
