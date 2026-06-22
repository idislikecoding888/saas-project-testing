"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  developerNavigation,
  adminNavigation,
  staffNavigation,
} from "@/config/navigation";
import { getRole, type UserRole } from "@/lib/auth/auth";
import SidebarItem from "./sidebar-item";

function navForRole(role: UserRole | null) {
  if (role === "admin") return adminNavigation;
  if (role === "staff") return staffNavigation;
  return developerNavigation;
}

function portalNameForRole(role: UserRole | null) {
  if (role === "admin") return "Admin Portal";
  if (role === "staff") return "Staff Portal";
  return "Developer Portal";
}

export default function Sidebar() {
  const pathname = usePathname() ?? "";
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    setRole(getRole());
  }, []);

  const derivedRole: UserRole | null = useMemo(() => {
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/staff")) return "staff";
    if (pathname.startsWith("/developer")) return "developer";
    return role;
  }, [pathname, role]);

  const navigation = navForRole(derivedRole);
  const portalName = portalNameForRole(derivedRole);

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-[var(--border)] bg-[var(--surface)]">
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