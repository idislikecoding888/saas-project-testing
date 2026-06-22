"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import { X, ShieldCheck } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  serviceName: string;
};

export default function VerifyModal({
  open,
  onClose,
  serviceName,
}: Props) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any>(null);

  if (!open) return null;

  const handleVerify = () => {
    if (serviceName === "Aadhaar OTP" && value === "6124551204520045") {
      setResult({
        name: "Rahul Sharma",
        gender: "Male",
        dob: "14 Jan 1998",
        state: "West Bengal",
        aadhaar: "XXXX XXXX 0045",
        status: "Verified",
      });
      return;
    }

    alert("Backend Integration Pending");
  };

  return createPortal(
    <div
  className="
  fixed
  inset-0
  z-[9999]

  flex
  items-center
  justify-center

  bg-black/70
  backdrop-blur-md
  "
>
      <div
        className="
          rounded-xl
          border
          border-[#273647]
          bg-[#0D1C2D]
          p-6
        "
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {serviceName}
          </h2>

          <button
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        {!result ? (
          <>
            <p className="mt-4 text-slate-400">
              Enter details to
              verify.
            </p>

            <input
              value={value}
              onChange={(e) =>
                setValue(
                  e.target.value
                )
              }
              placeholder={
                serviceName ===
                "Aadhaar OTP"
                  ? "Aadhaar Number"
                  : "Input"
              }
              className="
              mt-6
              w-full

              rounded-xl

              border
              border-[#273647]

              bg-[#122131]

              p-4
              "
            />

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="
                  rounded-xl
                  border
                  border-[#273647]
                  px-5
                  py-3
                  transition-all
                  hover:border-red-500
                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleVerify
                }
                className="
                rounded-xl

                bg-blue-600

                px-5
                py-3
                "
              >
                Verify
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8">
            <div className="flex items-center gap-3 text-emerald-400">
              <ShieldCheck />
              <span>Verification Successful</span>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Full Name</p>
                  <p className="mt-1">{result.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Gender</p>
                  <p className="mt-1">{result.gender}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Date of Birth</p>
                  <p className="mt-1">{result.dob}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">State</p>
                  <p className="mt-1">{result.state}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Aadhaar</p>
                  <p className="mt-1">{result.aadhaar}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className="mt-1 text-emerald-400">{result.status}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => { setResult(null); onClose(); }} className="rounded-xl bg-blue-600 px-5 py-3">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}