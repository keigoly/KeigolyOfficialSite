// src/components/ui/Comments.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getComments, addComment, type Comment } from '../../lib/supabase';

interface CommentsProps {
    postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // コメントを取得
    useEffect(() => {
        async function fetchComments() {
            setIsLoading(true);
            const data = await getComments(postSlug);
            setComments(data);
            setIsLoading(false);
        }
        fetchComments();
    }, [postSlug]);

    // コメントを投稿
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // バリデーション
        if (!nickname.trim()) {
            setError('ニックネームを入力してください');
            return;
        }
        if (content.trim().length < 10) {
            setError('コメントは10文字以上で入力してください');
            return;
        }

        setIsSubmitting(true);
        const result = await addComment(postSlug, nickname.trim(), content.trim());
        setIsSubmitting(false);

        if (result) {
            setSuccess(true);
            setNickname('');
            setContent('');
            // コメントを再取得
            const data = await getComments(postSlug);
            setComments(data);
            // 成功メッセージを3秒後に消す
            setTimeout(() => setSuccess(false), 3000);
        } else {
            setError('コメントの投稿に失敗しました。もう一度お試しください。');
        }
    };

    // 日付をフォーマット
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="mt-16 pt-12 border-t border-kg-border">
            {/* ヘッダー */}
            <div className="text-center mb-10">
                <h2 className="font-display text-lg tracking-[0.3em] text-kg-text mb-3">
                    💬 COMMENTS
                </h2>
                <p className="text-kg-text-muted font-serif text-sm">
                    ファンからの声をお聞かせください
                </p>
            </div>

            {/* コメント一覧 */}
            <div className="mb-12">
                {isLoading ? (
                    <div className="text-center py-8">
                        <span className="text-kg-text-muted font-serif">読み込み中...</span>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8 bg-kg-surface/30 border border-kg-border rounded-sm">
                        <p className="text-kg-text-muted font-serif">
                            一番最初にコメントしよう。
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {comments.map((comment, index) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-kg-surface/50 border border-kg-border rounded-sm p-6"
                                >
                                    {/* コメントヘッダー */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-kg-accent/20 border border-kg-accent/30 rounded-full flex items-center justify-center">
                                                <span className="text-kg-accent text-sm font-display">
                                                    {comment.nickname.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="font-display text-sm tracking-wider text-kg-text">
                                                {comment.nickname}
                                            </span>
                                        </div>
                                        <span className="text-xs text-kg-text-muted font-serif">
                                            {formatDate(comment.created_at)}
                                        </span>
                                    </div>
                                    {/* コメント本文 */}
                                    <p className="text-kg-text-muted font-serif leading-relaxed pl-13">
                                        {comment.content}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* 投稿フォーム */}
            <div className="bg-kg-surface/50 border border-kg-border rounded-sm p-6 md:p-10">
                <h3 className="font-display text-sm tracking-[0.2em] text-kg-text-muted mb-8">
                    コメントを投稿
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ニックネーム */}
                    <div className="group">
                        <label
                            htmlFor="nickname"
                            className="block text-xs font-display tracking-[0.15em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                        >
                            ニックネーム <span className="text-kg-accent">*</span>
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="ニックネーム"
                            maxLength={30}
                            className="w-full px-4 py-3 bg-kg-bg border border-kg-border text-kg-text font-serif 
                         focus:border-kg-accent focus:outline-none transition-colors"
                        />
                    </div>

                    {/* コメント */}
                    <div className="group">
                        <label
                            htmlFor="content"
                            className="block text-xs font-display tracking-[0.15em] text-kg-text-muted mb-2 group-focus-within:text-kg-accent transition-colors"
                        >
                            コメント <span className="text-kg-accent">*</span>
                            <span className="ml-2 text-kg-text-muted/60 font-serif text-xs normal-case tracking-normal">
                                （10文字以上）
                            </span>
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="感想やご意見をお聞かせください"
                            rows={6}
                            className="w-full px-4 py-3 bg-kg-bg border border-kg-border text-kg-text font-serif 
                         focus:border-kg-accent focus:outline-none transition-colors resize-none"
                        />
                        <div className="flex justify-end mt-2">
                            <span className={`text-xs font-serif ${content.length >= 10 ? 'text-kg-accent' : 'text-kg-text-muted/60'}`}>
                                {content.length}/10+
                            </span>
                        </div>
                    </div>

                    {/* エラーメッセージ */}
                    {error && (
                        <div className="text-red-400 text-sm font-serif">
                            {error}
                        </div>
                    )}

                    {/* 成功メッセージ */}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-kg-accent text-sm font-serif flex items-center gap-2"
                        >
                            <span>✓</span> コメントを投稿しました！
                        </motion.div>
                    )}

                    {/* 送信ボタン */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-kg-accent text-kg-bg font-display text-sm tracking-[0.15em] 
                       hover:bg-kg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '送信中...' : 'SEND COMMENT'}
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
