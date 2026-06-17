export default function UsageChart() {
  return (
    <div
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-[8px]
      p-6
      h-[420px]
      "
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold tracking-[-0.03em]">
          API Usage (Daily Volume)
        </h3>

        <button
          className="
          text-[var(--foreground-muted)]
          hover:text-white
          transition-colors
          "
        >
          •••
        </button>
      </div>

      <div
        className="
        h-[320px]
        rounded-[6px]
        border
        border-[var(--border)]
        bg-[var(--surface-card)]
        flex
        items-center
        justify-center
        "
      >
        <span className="text-[var(--foreground-muted)]">
          Chart.js will render here
        </span>
      </div>
    </div>
  );
}