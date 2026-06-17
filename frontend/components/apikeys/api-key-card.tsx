import { useState } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Trash2,
} from "lucide-react";

interface ApiKeyCardProps {
  name: string;
  keyValue: string;
  createdAt: string;
  onDelete?: () => void;
  onCopy?: () => void;
  onRotate?: () => void;
}

export default function ApiKeyCard({
  name,
  keyValue,
  createdAt,
  onDelete,
  onCopy,
  onRotate,     
}: ApiKeyCardProps) {
    const [visible, setVisible] =
  useState(false);
  return (
    <div
      className="
      rounded-xl
      border border-slate-800
      bg-[#081a2e]
      p-5
      transition-all
      duration-200
      hover:border-blue-500/40
      hover:bg-[#0b1f36]
    "
    >
      <div className="flex justify-between">
        <div>
          <div>
  <h3 className="text-lg font-semibold text-white">
    {name}
  </h3>

  <div className="mt-3 space-y-1 text-sm text-slate-400">
    <p>
      Created: {createdAt}
    </p>

    <p>
      Last Used: 2 minutes ago
    </p>

    <p>
      Requests Today: 1,284
    </p>
  </div>

  <div
    className="
    mt-4
    rounded-md
    bg-[#061423]
    px-3
    py-2
    font-mono
    text-sm
    text-slate-300
  "
  >
    {
      visible
        ? keyValue
        : "••••••••••••••••••••••"
    }
  </div>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Created: {createdAt}
          </p>
        </div>

        <div className="flex gap-3">

  {/* SHOW HIDE */}

  <button
    onClick={() => setVisible(!visible)}
    className="
    h-14
    w-14
    rounded-xl
    border border-slate-700
    flex items-center justify-center
    text-slate-300
    hover:border-blue-500
    hover:text-white
    transition-all
  "
  >
    {visible ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>

  {/* COPY */}

  <button
  onClick={() => {
    navigator.clipboard.writeText(
      keyValue
    );

    onCopy?.();
  }}
  className="
  h-14
  w-14
  rounded-xl
  border border-slate-700
  flex items-center justify-center
  text-slate-300
  hover:border-blue-500
  hover:text-white
  transition-all
"
>
  <Copy size={18} />
</button>

  {/* ROTATE */}

  <button
  onClick={onRotate}
  className="
  h-14
  w-14
  rounded-xl
  border border-slate-700
  flex items-center justify-center
  text-slate-300
  hover:border-blue-500
  hover:text-white
  transition-all
"
>
  <RefreshCw size={18} />
</button>

  {/* DELETE */}

  <button
    onClick={onDelete}
    className="
    h-14
    w-14
    rounded-xl
    border border-red-700
    flex items-center justify-center
    text-red-400
    hover:bg-red-500/10
    transition-all
  "
  >
    <Trash2 size={18} />
  </button>

</div>
      </div>
    </div>
  );
}