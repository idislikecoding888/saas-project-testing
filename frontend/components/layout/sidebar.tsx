"use client";

import SidebarItem from "./sidebar-item";

import { developerNavigation } from "@/config/navigation";

export default function Sidebar() {
  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-[260px]
      bg-[var(--surface)]
      border-r
      border-[var(--border)]
      flex
      flex-col
      z-50
      "
    >
      <div className="px-6 py-8">
        <h1 className="text-xl font-bold text-white">
          IDProofPro
        </h1>

        <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--foreground-muted)] mt-1">
          VERIFY. TRUST. TRANSFORM.
        </p>
      </div>

      <div className="flex-1 px-3 space-y-1">
        {developerNavigation.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="p-4 border-t border-[var(--border)]">
        <div className="text-sm text-[var(--foreground-muted)]">
          Developer Portal
        </div>
      </div>
    </aside>
  );
}