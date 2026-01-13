
// src/components/sections/Hero.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
    title?: string;
    subtitle?: string;
    showScroll?: boolean;
}

const heroImages = [
    '/images/hero/slide-1.png',
    '/images/hero/slide-2.jpg',
    '/images/hero/slide-3.jpg',
];

export default function Hero({
    title = "KEIGOLY",
    subtitle = "Creating Digital Experiences",
    showScroll = true
}: HeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-kg-bg">
            {/* Background Slideshow */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <img
                        src={heroImages[currentIndex]}
                        alt={`Hero Background ${currentIndex + 1}`}
                        className="w-full h-full object-cover opacity-60 object-[30%_center] xl:object-center" // モバイル・タブレットでは左寄り（人物中心）、デスクトップでは中央
                    />
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-kg-bg" />
                </motion.div>
            </AnimatePresence>



            {/* Scroll Indicator */}
            {showScroll && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs font-display tracking-[0.3em] text-kg-text/80">SCROLL</span>
                        <div className="w-px h-12 bg-gradient-to-b from-kg-accent to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
