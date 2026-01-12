// src/components/layout/Footer.tsx
import { useState } from 'react';

const footerLinks = [
    { name: 'TOP', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'WORKS', href: '/works' },
    { name: 'BLOG', href: '/blog' },
    { name: 'CONTACT', href: '/contact' },
];

const socialLinks = [
    {
        name: 'X',
        href: 'https://x.com/FourQuads',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        )
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/@keigoly',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        )
    },
];

export default function Footer() {
    const [currentLang, setCurrentLang] = useState<'JP' | 'EN'>('JP');

    return (
        <footer className="relative bg-kg-bg border-t border-kg-border/30">
            <div className="w-full px-6 lg:px-10 py-12">
                {/* Logo - 大きく左寄せ */}
                <div className="mb-8">
                    <a href="/" className="inline-block hover:opacity-80 transition-opacity duration-300">
                        <img src="/logo.png" alt="KEIGOLY" className="h-10 lg:h-12" />
                    </a>
                </div>

                {/* Navigation Row */}
                <div className="flex flex-wrap items-center gap-y-4">
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center">
                        {footerLinks.map((link, index) => (
                            <div key={link.name} className="flex items-center">
                                <a
                                    href={link.href}
                                    className="font-sans text-xs tracking-[0.15em] text-kg-text-muted hover:text-kg-text transition-colors duration-300 uppercase"
                                >
                                    {link.name}
                                </a>
                                {index < footerLinks.length - 1 && (
                                    <span className="text-kg-text-muted/50 mx-4 text-xs hidden sm:inline">·</span>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 ml-0 sm:ml-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                className="text-kg-text-muted hover:text-kg-text transition-colors duration-300"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Language Switcher */}
                    <div className="flex items-center gap-2 ml-0 sm:ml-6 text-xs tracking-wider">
                        <button
                            onClick={() => setCurrentLang('JP')}
                            className={`transition-colors duration-300 ${currentLang === 'JP' ? 'text-kg-text' : 'text-kg-text-muted hover:text-kg-text'}`}
                        >
                            JP
                        </button>
                        <span className="text-kg-text-muted/50">/</span>
                        <button
                            onClick={() => setCurrentLang('EN')}
                            className={`transition-colors duration-300 ${currentLang === 'EN' ? 'text-kg-text' : 'text-kg-text-muted hover:text-kg-text'}`}
                        >
                            EN
                        </button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-kg-border/20">
                    <p className="text-xs text-kg-text-muted/60 tracking-wider">
                        &copy; {new Date().getFullYear()} KEIGOLY
                    </p>
                </div>
            </div>
        </footer>
    );
}

