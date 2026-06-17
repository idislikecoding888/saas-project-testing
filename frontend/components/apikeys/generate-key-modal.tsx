"use client";

interface GenerateKeyModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GenerateKeyModal({
  open,
  onClose,
}: GenerateKeyModalProps) {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0
      bg-black/70

      backdrop-blur-sm

      flex items-center justify-center

      z-50
      "
    >
      <div
        className="
        w-[500px]

        rounded-xl
        border border-slate-800

        bg-[#081a2e]

        p-6
        "
      >
        <h2 className="text-2xl font-semibold text-white">
          Generate API Key
        </h2>

        <p className="mt-2 text-slate-400">
          Create a new API key for your application.
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm">
            Key Name
          </label>

          <input
            className="
            w-full

            rounded-sm

            border border-slate-700

            bg-[#061423]

            px-4 py-3
            "
            placeholder="Production Key"
          />
        </div>
        <div className="mt-6">
  <label className="mb-3 block text-sm">
    Allowed Services
  </label>

  <div className="grid grid-cols-2 gap-3">

    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" defaultChecked />
      Aadhaar OTP
    </label>

    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" defaultChecked />
      PAN
    </label>

    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" defaultChecked />
      GSTIN
    </label>

    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" defaultChecked />
      DigiLocker
    </label>

    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" defaultChecked />
      Face Match
    </label>

  </div>
</div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
            rounded-sm
            border border-slate-700

            px-4 py-2
            "
          >
            Cancel
          </button>

          <button
            className="
            rounded-sm

            bg-blue-600

            px-4 py-2

            text-white
            "
          >
            Generate Key
          </button>
        </div>
      </div>
    </div>
  );
}