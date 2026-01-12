// src/components/ui/SkillSection.tsx
import { motion } from 'framer-motion';

interface SkillSectionProps {
    iconImage?: string;
    category: string;
    title: string;
    subtitle?: string;
    description: string[];
    skills: string[];
    link?: {
        text: string;
        href: string;
    };
    delay?: number;
}

export default function SkillSection({
    iconImage,
    category,
    title,
    subtitle,
    description,
    skills,
    link,
    delay = 0
}: SkillSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="relative p-8 md:p-12 bg-kg-surface border border-kg-border rounded-sm group hover:border-kg-accent/50 transition-colors duration-500"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-kg-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-kg-bg-alt border border-kg-border rounded-sm overflow-hidden">
                        {iconImage ? (
                            <img src={iconImage} alt={title} className="w-12 h-12 object-contain" />
                        ) : (
                            <span className="text-kg-accent text-2xl">★</span>
                        )}
                    </div>

                    <div>
                        {/* Category */}
                        <span className="inline-block font-display text-xs tracking-[0.2em] text-kg-accent mb-2">
                            {category}
                        </span>

                        {/* Title */}
                        <h3 className="font-serif text-2xl md:text-3xl text-kg-text">
                            {title}
                        </h3>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="mt-1 font-display text-sm tracking-wider text-kg-text-muted">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-3 mb-8">
                    {description.map((text, index) => (
                        <p key={index} className="font-serif text-kg-text-muted leading-relaxed">
                            {text}
                        </p>
                    ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {skills.map((skill, index) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: delay + 0.1 * index }}
                            className="px-3 py-1 text-xs font-display tracking-wider bg-kg-bg-alt border border-kg-border text-kg-text-muted hover:border-kg-accent hover:text-kg-accent transition-colors duration-300 rounded-sm"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>

                {/* Link */}
                {link && (
                    <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-kg-accent hover:text-kg-text transition-colors duration-300"
                        whileHover={{ x: 4 }}
                    >
                        <span className="font-display text-sm tracking-wider">{link.text}</span>
                        <span>→</span>
                    </motion.a>
                )}
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-kg-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-kg-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}
