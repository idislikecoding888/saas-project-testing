"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationsMenu() {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="relative">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-3
        "
      >
        <Bell size={18} />
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          top-14

          w-[320px]

          rounded-2xl

          border
          border-[var(--border)]

          bg-[var(--surface)]

          shadow-2xl

          z-50
          "
        >
          <div className="p-4 border-b border-[var(--border)]">
            <h3 className="font-semibold">
              Notifications
            </h3>
          </div>

          <div className="p-4 space-y-4">

            <div>
              New Ticket Assigned
            </div>

            <div>
              Verification Failed
            </div>

            <div>
              Staff Account Created
            </div>

          </div>
        </div>
      )}
    </div>
  );
}