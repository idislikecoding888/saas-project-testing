"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

const amounts = [500, 1000, 5000, 10000];

export default function AddFundsModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

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
          {amounts.map((amount) => (
            <button
              key={amount}
              className="
                rounded-sm
                border border-slate-700
                p-4
                hover:border-blue-500
              "
            >
              ₹{amount}
            </button>
          ))}
        </div>

        <input
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
            className="
              rounded-sm
              bg-blue-600
              px-4
              py-2
              text-white
            "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}