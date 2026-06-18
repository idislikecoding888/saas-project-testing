"use client";

import { useState, useEffect } from "react";
import { logout } from "@/lib/auth/auth";
import {
  Bell,
  Wallet,
  ChevronDown,
} from "lucide-react";


import {
  getRole,
} from "@/lib/auth/auth";

export default function UserMenu() {
  const [open, setOpen] =
    useState(false);

  const [role, setRole] =
    useState("Developer");

  useEffect(() => {
    const userRole =
      getRole();

    if (!userRole) return;

    if (userRole === "admin") {
      setRole("Administrator");
    }

    if (userRole === "staff") {
      setRole("Staff");
    }

    if (userRole === "developer") {
      setRole("Developer");
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href =
      "/login";
  };

  return (
    <div className="flex items-center gap-5">
      {role === "Developer" && (
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
    "
  >
    <Wallet size={16} />

    <span className="text-sm font-medium">
      ₹12,450
    </span>
  </button>
)}

      {/* <button
        className="
          p-2
          rounded-[6px]
          hover:bg-[var(--surface)]
          transition-all
        "
      >
        <Bell size={20} />
      </button> */}
      
    <div className="relative">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        flex
        items-center
        gap-3

        rounded-xl

        border
        border-[var(--border)]

        bg-[var(--surface)]

        px-3
        py-2
        "
      >
        <div
          className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-full

          bg-blue-600

          text-sm
          font-semibold
          "
        >
          {role.charAt(0)}
        </div>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          top-14

          w-[260px]

          overflow-hidden

          rounded-2xl

          border
          border-[var(--border)]

          bg-[var(--surface)]

          shadow-2xl
          z-50
          "
        >
          <div className="p-4">
            <p className="font-medium">
  {role}
</p>

            <p className="text-sm text-slate-400">
  IDProofPro Console
</p>
          </div>

          <div className="border-t border-[var(--border)]">

            <a
  href="/settings"
  className="
  block
  w-full
  px-4
  py-3
  text-left
  hover:bg-[var(--hover-surface)]
  "
>
  Profile
</a>

            <button
              className="
              w-full
              px-4
              py-3
              text-left
              hover:bg-[var(--hover-surface)]
              "
            >
              Account Settings
            </button>

            <a
  href="/settings"
  className="
  block
  w-full
  px-4
  py-3
  text-left
  hover:bg-[var(--hover-surface)]
  "
>
  Security
</a>

          </div>

          <div className="border-t border-[var(--border)]">

            <button
              onClick={handleLogout}
              className="
              w-full

              px-4
              py-3

              text-left

              text-red-400

              hover:bg-red-500/10
              "
            >
              Logout
            </button>

          </div>
        </div>
      )}
    </div>
  </div>
  );
}