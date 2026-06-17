"use client";

import {
  Bell,
  Wallet,
  ChevronDown,
} from "lucide-react";

export default function UserMenu() {
  return (
    <div className="flex items-center gap-5">

      <button
  className="
  p-2

  rounded-[6px]

  hover:bg-[var(--surface)]

  transition-all
  duration-200
  "
>
  <Bell size={20} />
</button>

      <button
  className="
  flex
  items-center
  gap-2

  px-3
  py-2

  rounded-[6px]

  bg-[var(--surface)]

  border
  border-[var(--border)]

  hover:bg-[var(--hover-surface)]

  transition-all
  duration-200
  "
>
  <Wallet size={16} />

  <span className="text-sm font-medium">
    ₹12,450
  </span>
</button>

      <div className="flex items-center gap-2 cursor-pointer">
        <div
          className="
          w-9
          h-9
          rounded-full
          bg-blue-600
          flex
          items-center
          justify-center
          "
        >
          A
        </div>

        <ChevronDown size={18} />
      </div>

    </div>
  );
}