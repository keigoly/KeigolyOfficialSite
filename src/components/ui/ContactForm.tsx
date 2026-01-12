// src/components/ui/ContactForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactFormProps {
    lang?: 'ja' | 'en';
}

const texts = {
    ja: {
        thankYouMessage: 'お問い合わせありがとうございます。内容を確認の上、ご連絡いたします。',
        namePlaceholder: 'お名前',
        subjectDefault: 'お問い合わせ種別を選択',
        subjectOptions: {
            technical: '技術的なご質問',
            extension: 'Chrome拡張機能について',
            collaboration: 'お仕事・コラボレーションのご依頼',
            bugReport: '不具合報告',
            feedback: 'ご意見・ご感想',
            other: 'その他',
        },
        messageHint: '（100文字以上）',
        messagePlaceholder: 'お問い合わせ内容をご記入ください（100文字以上）',
        messageError: (current: number) => `メッセージは100文字以上で入力してください（現在: ${current}文字）`,
        remainingChars: (remaining: number) => `あと${remaining}文字`,
        charsSufficient: '✓ 100文字以上',
        charCount: (count: number) => `${count}文字`,
        sending: 'SENDING...',
        sendMessage: 'SEND MESSAGE',
    },
    en: {
        thankYouMessage: 'Thank you for your inquiry. We will review your message and get back to you.',
        namePlaceholder: 'Your Name',
        subjectDefault: 'Select inquiry type',
        subjectOptions: {
            technical: 'Technical Questions',
            extension: 'About Chrome Extensions',
            collaboration: 'Business & Collaboration',
            bugReport: 'Bug Report',
            feedback: 'Feedback',
            other: 'Other',
        },
        messageHint: '(100+ characters)',
        messagePlaceholder: 'Please enter your message (100+ characters)',
        messageError: (current: number) => `Message must be at least 100 characters (current: ${current})`,
        remainingChars: (remaining: number) => `${remaining} more characters needed`,
        charsSufficient: '✓ 100+ characters',
        charCount: (count: number) => `${count} characters`,
        sending: 'SENDING...',
        sendMessage: 'SEND MESSAGE',
    },
};

export default function ContactForm({ lang = 'ja' }: ContactFormProps) {
    const t = texts[lang];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ message?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'message' && errors.message) {
            setErrors({});
        }
    };

    const validateForm = () => {
        const newErrors: { message?: string } = {};

        if (formData.message.length < 100) {
            newErrors.message = t.messageError(formData.message.length);
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
            >
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-kg-accent rounded-full flex items-center justify-center">
                    <span className="text-kg-accent text-2xl">✓</span>
                </div>
                <h3 className="font-display text-2xl tracking-[0.2em] text-kg-text mb-4">
                    THANK YOU
                </h3>
                <p className="text-kg-text-muted font-serif">
                    {t.thankYouMessage}
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="group">
                <label
                    htmlFor="name"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    NAME <span className="text-kg-accent">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-kg-surface border border-kg-border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors"
                    placeholder={t.namePlaceholder}
                />
            </div>

            {/* Email */}
            <div className="group">
                <label
                    htmlFor="email"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    EMAIL <span className="text-kg-accent">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-kg-surface border border-kg-border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors"
                    placeholder="your@email.com"
                />
            </div>

            {/* Subject */}
            <div className="group">
                <label
                    htmlFor="subject"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    SUBJECT <span className="text-kg-accent">*</span>
                </label>
                <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-kg-surface border border-kg-border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                    <option value="">{t.subjectDefault}</option>
                    <option value="technical">{t.subjectOptions.technical}</option>
                    <option value="extension">{t.subjectOptions.extension}</option>
                    <option value="collaboration">{t.subjectOptions.collaboration}</option>
                    <option value="bug-report">{t.subjectOptions.bugReport}</option>
                    <option value="feedback">{t.subjectOptions.feedback}</option>
                    <option value="other">{t.subjectOptions.other}</option>
                </select>
            </div>

            {/* Message */}
            <div className="group">
                <label
                    htmlFor="message"
                    className="block text-xs font-display tracking-[0.2em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                >
                    MESSAGE <span className="text-kg-accent">*</span>
                    <span className="ml-2 text-kg-text-muted/60 font-serif text-xs normal-case tracking-normal">
                        {t.messageHint}
                    </span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    minLength={100}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-kg-surface border text-kg-text font-serif focus:border-kg-accent focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-kg-border'
                        }`}
                    placeholder={t.messagePlaceholder}
                />
                <div className="flex justify-between items-center mt-2">
                    {errors.message ? (
                        <span className="text-red-500 text-xs font-serif">{errors.message}</span>
                    ) : (
                        <span className="text-kg-text-muted/60 text-xs font-serif">
                            {formData.message.length < 100
                                ? t.remainingChars(100 - formData.message.length)
                                : t.charsSufficient}
                        </span>
                    )}
                    <span className="text-kg-text-muted/60 text-xs font-serif">
                        {t.charCount(formData.message.length)}
                    </span>
                </div>
            </div>

            {/* Submit */}
            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-kg-accent text-kg-bg font-display text-sm tracking-[0.2em] hover:bg-kg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? t.sending : t.sendMessage}
            </motion.button>
        </form>
    );
}
