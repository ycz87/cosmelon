/**
 * 使用说明弹窗 — 首次访问自动弹出，之后可通过 ❓ 图标手动打开
 */
import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface GuideProps {
  onClose: () => void;
}

function Guide({ onClose }: GuideProps) {
  const t = useTheme();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative max-w-sm w-full rounded-2xl p-6 shadow-2xl animate-scale-in max-h-[80vh] overflow-y-auto"
        style={{ backgroundColor: t.surface, color: t.text }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">🍅 番茄时钟使用指南</h2>

        <div className="space-y-4 text-sm" style={{ color: t.textMuted }}>
          <section>
            <h3 className="font-medium mb-1" style={{ color: t.text }}>番茄工作法</h3>
            <p>专注工作 25 分钟 → 短休息 5 分钟 → 重复 4 轮 → 长休息 15 分钟。简单但有效的时间管理方法。</p>
          </section>

          <section>
            <h3 className="font-medium mb-1" style={{ color: t.text }}>基本操作</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>点击 <span className="inline-block w-4 h-4 rounded-full bg-red-500 align-middle" /> 开始专注</li>
              <li>计时中可暂停，暂停后可修改设置</li>
              <li>完成后自动进入休息，每 4 轮触发长休息</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium mb-1" style={{ color: t.text }}>🌱 番茄生长</h3>
            <p>专注时长越长，番茄长得越好：</p>
            <div className="grid grid-cols-2 gap-1 mt-1.5 text-xs">
              <span>🌱 &lt;10分钟 · 种子</span>
              <span>🌿 10-14分钟 · 幼苗</span>
              <span>🌸 15-19分钟 · 开花</span>
              <span>🫒 20-24分钟 · 青果</span>
              <span>🍅 ≥25分钟 · 成熟</span>
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-1" style={{ color: t.text }}>⚙️ 设置</h3>
            <p>右上角齿轮可自定义：专注/休息时长、提醒音效和时长、背景滴答声、音量、主题配色。</p>
          </section>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
          style={{ backgroundColor: t.accent, color: 'white' }}
        >
          开始使用
        </button>
      </div>
    </div>
  );
}

/** 使用说明入口 — 管理首次弹出 + 手动打开 */
export function GuideButton() {
  const [showGuide, setShowGuide] = useState(false);
  const t = useTheme();

  // 首次访问自动弹出
  useEffect(() => {
    const seen = localStorage.getItem('pomodoro-guide-seen');
    if (!seen) {
      setShowGuide(true);
    }
  }, []);

  const handleClose = () => {
    setShowGuide(false);
    localStorage.setItem('pomodoro-guide-seen', '1');
  };

  return (
    <>
      <button
        onClick={() => setShowGuide(true)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer text-sm"
        style={{ color: t.textMuted }}
        aria-label="使用说明"
      >
        ?
      </button>
      {showGuide && <Guide onClose={handleClose} />}
    </>
  );
}
