// src/components/core/ScrollManager.tsx
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function ScrollManager() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. ブラウザ環境でなければ何もしない（サーバーエラー回避）
    if (typeof window === 'undefined') return;

    // 2. モバイル端末や「動きを減らす」設定の場合は無効化
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || isReducedMotion) {
      return;
    }

    // 3. Lenis（慣性スクロール）の起動
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // 4. アニメーションループ
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 5. クリーンアップ（終了処理）
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 6. ページ遷移時のスクロール位置リセット
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleSwap = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };

    document.addEventListener('astro:after-swap', handleSwap);
    return () => document.removeEventListener('astro:after-swap', handleSwap);
  }, []);

  return null;
}