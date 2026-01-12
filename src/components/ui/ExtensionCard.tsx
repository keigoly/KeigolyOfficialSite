// src/components/ui/ExtensionCard.tsx
import { motion } from 'framer-motion';

// アイコン画像パス
const iconImages: Record<string, string> = {
    realtime: '/images/extensions/realtime.png',
    radio: '/images/extensions/radiko.png',
    avatar: '/images/extensions/gemavatar.png',
};

interface ExtensionCardProps {
    name: string;
    description: string;
    url: string;
    iconType?: 'realtime' | 'radio' | 'avatar';
    delay?: number;
}

export default function ExtensionCard({
    name,
    description,
    url,
    iconType,
    delay = 0
}: ExtensionCardProps) {
    const iconSrc = iconType ? iconImages[iconType] : null;

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -4 }}
            className="group block relative p-6 bg-kg-bg-alt border border-kg-border rounded-sm hover:border-kg-accent/50 transition-colors duration-300"
        >
            {/* Icon */}
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-kg-surface">
                    {iconSrc ? (
                        <img
                            src={iconSrc}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-kg-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm13.523 2.623l-3.953 6.848a5.454 5.454 0 0 1 3.154 9.593L19.409 17.686A11.943 11.943 0 0 0 24 12c0-1.378-.232-2.701-.659-3.907H15.454z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Name */}
                    <h4 className="font-serif text-lg text-kg-text group-hover:text-kg-accent transition-colors duration-300 truncate">
                        {name}
                    </h4>

                    {/* Description */}
                    <p className="mt-1 text-sm text-kg-text-muted line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Arrow */}
                <motion.span
                    className="flex-shrink-0 text-kg-text-muted group-hover:text-kg-accent transition-colors duration-300"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                >
                    →
                </motion.span>
            </div>

            {/* Hover Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kg-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
    );
}
