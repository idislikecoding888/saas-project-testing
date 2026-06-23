"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import api from "@/lib/api/axios";

type MeUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
};

export default function SettingsPage() {
  const [profileOpen, setProfileOpen] = useState(true);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MeUser | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data as MeUser);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-slate-400">Manage your account preferences.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-slate-400">
          Loading profile...
        </div>
      ) : (
        <>
          <div className="mb-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex w-full items-center justify-between px-8 py-6 text-left"
            >
              <div>
                <h2 className="text-xl font-semibold">Profile</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Personal information
                </p>
              </div>

              <ChevronDown
                className={`transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="px-8 pb-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={user?.firstName ?? ""}
                    readOnly
                    className="rounded-2xl border border-slate-800 bg-[#020d1b] p-4 text-white outline-none"
                  />

                  <input
                    value={user?.email ?? ""}
                    readOnly
                    className="rounded-2xl border border-slate-800 bg-[#020d1b] p-4 text-white outline-none"
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-slate-800 bg-[#020d1b] p-4">
                  <p className="text-sm text-slate-400">Account Role</p>
                  <p className="mt-1 capitalize text-white">{user?.role ?? "developer"}</p>
                </div>

                <button
                  disabled
                  className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white opacity-60"
                >
                  Save Changes
                </button>

                <p className="mt-3 text-sm text-slate-500">
                  Profile update endpoint is not wired yet, so this section is read-only for now.
                </p>
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <button
              onClick={() => setSecurityOpen(!securityOpen)}
              className="flex w-full items-center justify-between px-8 py-6 text-left"
            >
              <div>
                <h2 className="text-xl font-semibold">Security</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Password and account access
                </p>
              </div>

              <ChevronDown
                className={`transition-transform ${
                  securityOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {securityOpen && (
              <div className="px-8 pb-8">
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full rounded-2xl border border-slate-800 bg-[#020d1b] p-4 text-white outline-none"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full rounded-2xl border border-slate-800 bg-[#020d1b] p-4 text-white outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full rounded-2xl border border-slate-800 bg-[#020d1b] p-4 text-white outline-none"
                  />
                </div>

                <button
                  disabled
                  className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white opacity-60"
                >
                  Update Password
                </button>

                <p className="mt-3 text-sm text-slate-500">
                  No password update endpoint is exposed yet.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}