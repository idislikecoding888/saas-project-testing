"use client";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[520px] rounded-xl border border-slate-800 bg-[#081a2e] p-6">
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        <p className="mt-3 text-slate-400">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
            rounded-sm
            border border-slate-700

            px-4 py-2
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
            rounded-sm
            bg-red-600

            px-4 py-2
            text-white
            "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}