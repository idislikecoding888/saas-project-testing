"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/axios";
import { logout, getRole, type UserRole } from "@/lib/auth/auth";
import { Wallet, ChevronDown } from "lucide-react";
import Link from "next/link";

function roleLabel(role: UserRole | null) {
  if (role === "admin") return "Administrator";
  if (role === "staff") return "Staff";
  return "Developer";
}

function settingsPath(role: UserRole | null) {
  if (role === "admin") return "/admin/settings";
  if (role === "staff") return "/staff/settings";
  return "/developer/settings";
}

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  useEffect(() => {
    setRole(getRole());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadWallet = async () => {
      try {
        const meResponse = await api.get("/users/me");
        const me = meResponse.data as { id: string };

        const walletResponse = await api.get(`/wallet/${me.id}`);
        const balance = walletResponse.data?.balance ?? 0;

        if (!cancelled) {
          setWalletBalance(balance);
        }
      } catch {
        if (!cancelled) {
          setWalletBalance(null);
        }
      }
    };

    void loadWallet();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center gap-5">
      {role === "developer" && (
        <button className="flex items-center gap-2 rounded-[6px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 transition-all hover:bg-[var(--hover-surface)]">
          <Wallet size={16} />
          <span className="text-sm font-medium">
            {walletBalance === null
              ? "Loading..."
              : `₹${new Intl.NumberFormat("en-IN").format(walletBalance)}`}
          </span>
        </button>
      )}

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
            {roleLabel(role).charAt(0)}
          </div>
          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="absolute right-0 top-14 z-50 w-[260px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
            <div className="p-4">
              <p className="font-medium">{roleLabel(role)}</p>
              <p className="text-sm text-slate-400">IDProofPro Console</p>
            </div>

            <div className="border-t border-[var(--border)]">
              <Link
                href={settingsPath(role)}
                className="block w-full px-4 py-3 text-left hover:bg-[var(--hover-surface)]"
              >
                Profile
              </Link>

              <Link
                href={settingsPath(role)}
                className="block w-full px-4 py-3 text-left hover:bg-[var(--hover-surface)]"
              >
                Security
              </Link>
            </div>

            <div className="border-t border-[var(--border)]">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10"
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