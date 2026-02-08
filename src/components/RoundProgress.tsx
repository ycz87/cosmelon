interface RoundProgressProps {
  current: number; // completed in this round
  total: number;   // pomodoros per round
  idle: boolean;   // hide/dim when not started
}

export function RoundProgress({ current, total, idle }: RoundProgressProps) {
  // Hide completely when idle and nothing completed
  if (idle && current === 0) return null;

  return (
    <div className={`flex items-center gap-2.5 transition-opacity duration-300 ${
      idle ? 'opacity-40' : 'opacity-100'
    }`}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
              i < current
                ? 'bg-red-400 scale-110'
                : 'bg-white/15'
            }`}
          />
        ))}
      </div>
      <span className="text-white/25 text-xs tabular-nums">
        {current}/{total}
      </span>
    </div>
  );
}
