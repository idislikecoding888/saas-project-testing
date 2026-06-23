"use client";

import api from "@/lib/api/axios";
import Link from "next/link";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post(
        "/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      router.push("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4"
    >
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) =>
          setFirstName(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-slate-800 bg-[#020d1b] p-4"
      />

      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) =>
          setLastName(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-slate-800 bg-[#020d1b] p-4"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-slate-800 bg-[#020d1b] p-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-slate-800 bg-[#020d1b] p-4"
      />

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="
        w-full
        rounded-xl
        bg-blue-600
        py-4
        font-medium
        "
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

      <div className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-400"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
}