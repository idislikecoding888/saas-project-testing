"use client";

import { useMemo, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onContinue?: (amount: number) => Promise<void> | void;
}

const amounts = [500, 1000, 5000, 10000];

export default function AddFundsModal({
  open,
  onClose,
  onContinue,
}: Props) {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = useMemo(() => {
    const custom = Number(customAmount);
    if (customAmount.trim() && !Number.isNaN(custom) && custom > 0) {
      return custom;
    }
    return selectedAmount;
  }, [customAmount, selectedAmount]);

  if (!open) return null;

  const handleContinue = async () => {
    try {
      setLoading(true);
      await onContinue?.(amount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[520px] rounded-xl border border-slate-800 bg-[#081a2e] p-6">
        <h2 className="text-2xl font-semibold">
          Add Funds
        </h2>

        <p className="mt-2 text-slate-400">
          Select a recharge amount.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {amounts.map((value) => (
            <button
              key={value}
              onClick={() => {
                setSelectedAmount(value);
                setCustomAmount("");
              }}
              className={`
                rounded-sm
                border
                p-4
                transition-all
                ${
                  selectedAmount === value && !customAmount.trim()
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-slate-700 hover:border-blue-500"
                }
              `}
            >
              ₹{value}
            </button>
          ))}
        </div>

        <input
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Custom Amount"
          className="
            mt-5
            w-full
            rounded-sm
            border border-slate-700
            bg-[#061423]
            px-4
            py-3
          "
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-sm border border-slate-700 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="
              rounded-sm
              bg-blue-600
              px-4
              py-2
              text-white
              disabled:opacity-60
            "
          >
            {loading ? "Opening..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}