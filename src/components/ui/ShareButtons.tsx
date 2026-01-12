// src/components/ui/ShareButtons.tsx
import { motion } from 'framer-motion';

interface ShareButtonsProps {
    url: string;
    title: string;
}

const shareLinks = [
    {
        name: 'X',
        getUrl: (url: string, title: string) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        bgColor: 'hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/50 hover:text-[#1DA1F2]',
    },
    {
        name: 'Instagram',
        getUrl: () => 'https://www.instagram.com/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
        bgColor: 'hover:bg-[#E4405F]/10 hover:border-[#E4405F]/50 hover:text-[#E4405F]',
    },
    {
        name: 'Copy',
        getUrl: () => '',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        ),
        bgColor: 'hover:bg-kg-accent/10 hover:border-kg-accent/50 hover:text-kg-accent',
        isCopy: true,
    },
];

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert('URLをコピーしました');
        } catch {
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('URLをコピーしました');
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <span className="font-display text-xs tracking-[0.2em] text-kg-text-muted">
                SHARE
            </span>
            <div className="flex items-center gap-3">
                {shareLinks.map((link, index) => (
                    <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        {link.isCopy ? (
                            <button
                                onClick={handleCopy}
                                className={`w-10 h-10 flex items-center justify-center border border-kg-border text-kg-text-muted transition-all duration-300 ${link.bgColor}`}
                                aria-label={link.name}
                                title="URLをコピー"
                            >
                                {link.icon}
                            </button>
                        ) : (
                            <a
                                href={link.getUrl(url, title)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 flex items-center justify-center border border-kg-border text-kg-text-muted transition-all duration-300 ${link.bgColor}`}
                                aria-label={`${link.name}でシェア`}
                                title={`${link.name}でシェア`}
                            >
                                {link.icon}
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
