"use client";

interface Props {
  open: boolean;
  service: any;
  onClose: () => void;
}

export default function EditPricingModal({
  open,
  service,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[100]

      flex
      items-center
      justify-center

      bg-black/60
    "
    >
      <div
        className="
        w-full
        max-w-lg

        rounded-3xl

        border
        border-slate-800

        bg-[#08172b]

        p-8
      "
      >
        <h2 className="text-2xl font-semibold">
          Edit Pricing
        </h2>

        <div className="mt-8 space-y-4">

          <input
            value={service?.name || ""}
            disabled
            className="
            w-full
            rounded-xl
            bg-[#020d1b]
            p-4
          "
          />

          <input
            placeholder={service?.price || ""}
            className="
            w-full
            rounded-xl
            bg-[#020d1b]
            p-4
          "
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
            rounded-xl
            border
            border-slate-700
            px-4
            py-3
          "
          >
            Cancel
          </button>

          <button
            className="
            rounded-xl
            bg-blue-600
            px-4
            py-3
          "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}