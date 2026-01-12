// src/lib/i18n.ts - 翻訳テキスト管理

export type Language = 'ja' | 'en';

export const translations = {
    // ナビゲーション
    nav: {
        top: { ja: 'TOP', en: 'TOP' },
        about: { ja: 'ABOUT', en: 'ABOUT' },
        works: { ja: 'WORKS', en: 'WORKS' },
        blog: { ja: 'BLOG', en: 'BLOG' },
        contact: { ja: 'CONTACT', en: 'CONTACT' },
    },

    // トップページ
    home: {
        worksSubtitle: { ja: 'What I Do', en: 'What I Do' },
        worksDescription: {
            ja: 'Palo Alto Networksのシステムエンジニアとして働きながら、Chrome拡張機能の開発を行っています。',
            en: 'Working as a System Engineer at Palo Alto Networks while developing Chrome extensions.',
        },
        viewDetails: { ja: 'VIEW DETAILS', en: 'VIEW DETAILS' },
        blogSubtitle: { ja: 'Latest Articles', en: 'Latest Articles' },
        noArticles: { ja: 'No articles yet...', en: 'No articles yet...' },
        viewAllArticles: { ja: 'VIEW ALL ARTICLES', en: 'VIEW ALL ARTICLES' },
        getInTouch: { ja: 'GET IN TOUCH', en: 'GET IN TOUCH' },
        getInTouchDescription: {
            ja: 'プロジェクトのご相談やお問い合わせはお気軽にどうぞ',
            en: 'Feel free to reach out for project consultations or inquiries',
        },
    },

    // Aboutページ
    about: {
        pageDescription: { ja: 'KEIGOLYについて', en: 'About KEIGOLY' },
        bio1: {
            ja: 'デジタル体験を創造するクリエイター。',
            en: 'Creator of Digital Experiences.',
        },
        bio2: {
            ja: 'メインの仕事はPaloAltoのシステムエンジニアの業務を、サブでブラウザ拡張機能やWebアプリケーションの開発を行っています。',
            en: 'Primarily working as a System Engineer at Palo Alto Networks, with side projects in browser extension and web application development.',
        },
        bio3: {
            ja: '技術とデザインの融合を追求し、ユーザーに新しい価値を提供することを目指しています。',
            en: 'Pursuing the fusion of technology and design to deliver new value to users.',
        },
        bio4: {
            ja: '過去の実績等については以下のリンクからご確認ください。',
            en: 'Please check the link below for past achievements and portfolio.',
        },
        timeline: { ja: 'TIMELINE', en: 'TIMELINE' },
        officialSiteLaunch: { ja: 'オフィシャルサイト開設', en: 'Official Website Launch' },
        contactCta: {
            ja: 'お仕事のご依頼・ご相談はこちら',
            en: 'For business inquiries and consultations',
        },
    },

    // Worksページ
    works: {
        pageDescription: { ja: '業務内容・スキル紹介', en: 'Skills & Professional Experience' },
        mainWork: { ja: 'MAIN WORK', en: 'MAIN WORK' },
        sideWork: { ja: 'SIDE WORK', en: 'SIDE WORK' },
        paloAltoDescription1: {
            ja: 'Palo Alto Networksのシステムエンジニアとして、セキュリティソリューションの技術サポートを担当しています。',
            en: 'As a System Engineer at Palo Alto Networks, I provide technical support for security solutions.',
        },
        paloAltoDescription2: {
            ja: '顧客からの技術的な質問や疑問に対応し、重大な問題が発生した際にはトラブルシューティングを行います。特にメーカーとの技術連携・折衝を得意としており、複雑な問題の解決に貢献しています。',
            en: 'I handle technical inquiries from customers and perform troubleshooting when critical issues arise. I specialize in technical collaboration and negotiation with vendors, contributing to the resolution of complex problems.',
        },
        chromeExtDescription: {
            ja: '副業としてChrome拡張機能の開発を行っています。ユーザーの生産性向上やブラウジング体験の改善を目的とした拡張機能を開発・公開しています。',
            en: 'I develop Chrome extensions as a side project. I create and publish extensions aimed at improving user productivity and enhancing the browsing experience.',
        },
        publishedExtensions: { ja: 'PUBLISHED EXTENSIONS', en: 'PUBLISHED EXTENSIONS' },
        // 拡張機能の説明
        realtaiDescription: {
            ja: '実況のお供に。サイドパネルでリアルタイム検索を常駐表示。自動更新・NGフィルター機能搭載。',
            en: 'Perfect for live commentary. Displays real-time search in a side panel with auto-refresh and filter features.',
        },
        radikoDescription: {
            ja: '番組表を作って自動で切り替え・自動再生。毎日のラジオ聴取を自動化し、聞き逃しを防ぎます。',
            en: 'Create a schedule for automatic switching and playback. Automates daily radio listening to prevent missed shows.',
        },
        gemAvatarDescription: {
            ja: 'Google Geminiのユーザーアバターをカスタマイズ。Gemごとに異なるアイコンを設定可能。',
            en: 'Customize your Google Gemini user avatar. Set different icons for each Gem.',
        },
    },

    // Contactページ
    contact: {
        pageDescription: { ja: 'お問い合わせ', en: 'Contact Us' },
        connection: { ja: 'CONNECTION', en: 'CONNECTION' },
        connectionText1: {
            ja: 'プロジェクトのご相談、コラボレーション、',
            en: 'Project consultations, collaborations,',
        },
        connectionText2: {
            ja: 'その他お問い合わせなど、お気軽にご連絡ください。',
            en: 'and any other inquiries—feel free to reach out.',
        },
        email: { ja: 'EMAIL', en: 'EMAIL' },
        response: { ja: 'RESPONSE', en: 'RESPONSE' },
        responseTime: { ja: '通常1-3営業日以内', en: 'Typically within 1-3 business days' },
        follow: { ja: 'FOLLOW', en: 'FOLLOW' },
        // フォーム
        formName: { ja: 'お名前', en: 'Name' },
        formEmail: { ja: 'メールアドレス', en: 'Email' },
        formSubject: { ja: '件名', en: 'Subject' },
        formMessage: { ja: 'メッセージ', en: 'Message' },
        formSubmit: { ja: '送信', en: 'Send Message' },
        formSubmitting: { ja: '送信中...', en: 'Sending...' },
        formSuccess: { ja: 'メッセージを送信しました', en: 'Message sent successfully' },
        formError: { ja: '送信に失敗しました', en: 'Failed to send message' },
    },

    // 共通
    common: {
        readMore: { ja: 'READ', en: 'READ' },
        backToBlog: { ja: 'BACK TO BLOG', en: 'BACK TO BLOG' },
    },
} as const;

// 翻訳テキストを取得するヘルパー関数
export function t<
    T extends keyof typeof translations,
    K extends keyof typeof translations[T]
>(section: T, key: K, lang: Language): string {
    return translations[section][key][lang];
}

// URLから言語を判定
export function getLanguageFromPath(path: string): Language {
    return path.startsWith('/en') ? 'en' : 'ja';
}

// 言語に応じたパスを生成
export function getLocalizedPath(path: string, targetLang: Language): string {
    const cleanPath = path.replace(/^\/en/, '') || '/';

    if (targetLang === 'en') {
        return `/en${cleanPath === '/' ? '' : cleanPath}`;
    }
    return cleanPath;
}
