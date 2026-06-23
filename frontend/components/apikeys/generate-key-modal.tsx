"use client";

import { useState } from "react";

interface GenerateKeyModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate?: () => Promise<void> | void;
}

export default function GenerateKeyModal({
  open,
  onClose,
  onGenerate,
}: GenerateKeyModalProps) {
  const [loading, setLoading] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [services, setServices] = useState({
    aadhaarOtp: true,
    pan: true,
    gstin: true,
    digilocker: true,
    faceMatch: true,
  });

  if (!open) return null;

  const handleGenerate = async () => {
    try {
      setLoading(true);
      await onGenerate?.();
      onClose();
    } finally {
      setLoading(false);
    }
  };

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
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
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
              <input
                type="checkbox"
                checked={services.aadhaarOtp}
                onChange={(e) =>
                  setServices((prev) => ({
                    ...prev,
                    aadhaarOtp: e.target.checked,
                  }))
                }
              />
              Aadhaar OTP
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={services.pan}
                onChange={(e) =>
                  setServices((prev) => ({
                    ...prev,
                    pan: e.target.checked,
                  }))
                }
              />
              PAN
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={services.gstin}
                onChange={(e) =>
                  setServices((prev) => ({
                    ...prev,
                    gstin: e.target.checked,
                  }))
                }
              />
              GSTIN
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={services.digilocker}
                onChange={(e) =>
                  setServices((prev) => ({
                    ...prev,
                    digilocker: e.target.checked,
                  }))
                }
              />
              DigiLocker
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={services.faceMatch}
                onChange={(e) =>
                  setServices((prev) => ({
                    ...prev,
                    faceMatch: e.target.checked,
                  }))
                }
              />
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
            onClick={handleGenerate}
            disabled={loading}
            className="
            rounded-sm
            bg-blue-600
            px-4 py-2
            text-white
            disabled:opacity-60
            "
          >
            {loading ? "Generating..." : "Generate Key"}
          </button>
        </div>
      </div>
    </div>
  );
}