"use client";
import {
  developerNavigation,
  adminNavigation,
  staffNavigation,
} from "@/config/navigation";
import { usePathname } from "next/navigation";

import SidebarItem from "./sidebar-item";

export default function Sidebar() {
  const pathname = usePathname() ?? "";

  const navigation =
    pathname.startsWith("/admin")
      ? adminNavigation
      : pathname.startsWith("/staff")
      ? staffNavigation
      : developerNavigation;

  const portalName =
    pathname.startsWith("/admin")
      ? "Admin Portal"
      : pathname.startsWith("/staff")
      ? "Staff Portal"
      : "Developer Portal";

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
        <div className="mb-8 px-4">
  <img
    src="/logo-white.png"
    alt="IDProofPro"
    className="w-[180px]"
  />
</div>

        <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[var(--foreground-muted)]">
          VERIFY. TRUST. TRANSFORM.
        </p>
      </div>

      <div className="flex-1 space-y-1 px-3">
        {navigation.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="border-t border-[var(--border)] p-4">
        <div className="text-sm text-[var(--foreground-muted)]">
          {portalName}
        </div>
      </div>
    </aside>
  );
}