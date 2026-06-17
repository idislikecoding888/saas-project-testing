export default function WalletStats() {
  return (
    <div className="space-y-4">

      <div
        className="
        rounded-xl
        border border-slate-800
        bg-[#0b1d31]
        p-5
      "
      >
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Today Spend
        </p>

        <h3 className="mt-2 text-3xl font-semibold text-white">
          ₹342
        </h3>
      </div>

      <div
        className="
        rounded-xl
        border border-slate-800
        bg-[#0b1d31]
        p-5
      "
      >
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Monthly Spend
        </p>

        <h3 className="mt-2 text-3xl font-semibold text-white">
          ₹14,500
        </h3>
      </div>

      <div
        className="
        rounded-xl
        border border-slate-800
        bg-[#0b1d31]
        p-5
      "
      >
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Average Daily
        </p>

        <h3 className="mt-2 text-3xl font-semibold text-white">
          ₹483
        </h3>
      </div>

    </div>
  );
}