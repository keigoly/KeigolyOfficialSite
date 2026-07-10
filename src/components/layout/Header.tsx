// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentLang?: 'ja' | 'en';
  currentPath?: string;
}

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
    name: 'Instagram',
    href: 'https://www.instagram.com/keigoly.s/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/keigoly',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
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

export default function Header({ currentLang = 'ja', currentPath = '/' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 言語に応じたナビゲーションアイテム
  const isEnglish = currentLang === 'en';
  const basePath = isEnglish ? '/en' : '';

  const navItems = [
    { name: 'TOP', href: isEnglish ? '/en' : '/' },
    { name: 'ABOUT', href: `${basePath}/about` },
    { name: 'WORKS', href: `${basePath}/works` },
    { name: 'APPS', href: `${basePath}/apps` },
    { name: 'CONTACT', href: `${basePath}/contact` },
  ];

  // 言語切り替え先のパスを生成
  const getLanguageSwitchPath = (targetLang: 'ja' | 'en') => {
    // 現在のパスから言語プレフィックスを除去
    let cleanPath = currentPath.replace(/^\/en/, '') || '/';

    if (targetLang === 'en') {
      return `/en${cleanPath === '/' ? '' : cleanPath}`;
    }
    return cleanPath;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[rgba(20,20,20,0.8)] backdrop-blur-[12px] py-3' : 'bg-transparent py-4'
          }`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          {/* Logo - 左端 */}
          <a
            href={isEnglish ? '/en' : '/'}
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <img src="/logo.png" alt="KEIGOLY" className="h-6 lg:h-8" />
          </a>

          {/* Right Side - Navigation + Social + Language */}
          <div className="hidden md:flex items-center">
            {/* Desktop Navigation */}
            <nav className="flex items-center">
              {navItems.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  {index > 0 && (
                    <span className="text-kg-text-muted mx-3 text-xs">|</span>
                  )}
                  <a
                    href={item.href}
                    className="font-sans text-xs tracking-[0.15em] text-kg-text-muted hover:text-kg-accent transition-colors duration-300 uppercase"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>

            {/* Divider */}
            <span className="text-kg-text-muted mx-4 text-xs">|</span>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-kg-text-muted hover:text-kg-accent transition-colors duration-300 text-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Divider */}
            <span className="text-kg-text-muted mx-4 text-xs">|</span>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 text-xs tracking-wider">
              <a
                href={getLanguageSwitchPath('ja')}
                className={`transition-colors duration-300 ${currentLang === 'ja' ? 'text-kg-accent' : 'text-kg-text-muted hover:text-kg-text'}`}
              >
                JP
              </a>
              <span className="text-kg-text-muted">/</span>
              <a
                href={getLanguageSwitchPath('en')}
                className={`transition-colors duration-300 ${currentLang === 'en' ? 'text-kg-accent' : 'text-kg-text-muted hover:text-kg-text'}`}
              >
                EN
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block"
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-kg-bg/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-xl tracking-[0.2em] text-kg-text hover:text-kg-accent transition-colors duration-300 uppercase"
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Mobile Social Links */}
              <div className="flex items-center gap-6 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-kg-text-muted hover:text-kg-accent transition-colors duration-300 text-lg"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-3 mt-4 text-sm tracking-wider">
                <a
                  href={getLanguageSwitchPath('ja')}
                  className={`transition-colors duration-300 ${currentLang === 'ja' ? 'text-kg-accent' : 'text-kg-text-muted'}`}
                >
                  JP
                </a>
                <span className="text-kg-text-muted">/</span>
                <a
                  href={getLanguageSwitchPath('en')}
                  className={`transition-colors duration-300 ${currentLang === 'en' ? 'text-kg-accent' : 'text-kg-text-muted'}`}
                >
                  EN
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
