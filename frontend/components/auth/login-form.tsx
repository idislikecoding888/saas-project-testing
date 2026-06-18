"use client";

import { login } from "@/lib/auth/auth";
import { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const token =
      localStorage.getItem(
        "idproofpro_token"
      );

    const role =
      localStorage.getItem(
        "idproofpro_role"
      );

    if (!token) return;

    if (role === "admin") {
      router.push("/admin");
      return;
    }

    if (role === "staff") {
      router.push("/staff");
      return;
    }

    router.push("/developer");
  }, [router]);

  const validate = () => {
    if (!email.includes("@")) {
      setError(
        "Please enter a valid email"
      );
      return false;
    }

    if (!password.trim()) {
      setError(
        "Password is required"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!validate()) {
    return;
  }

  setLoading(true);
  setError("");

  try {
    const lower =
      email.toLowerCase();

    let role = "developer";

    if (
      lower.includes("admin")
    ) {
      role = "admin";
    }

    if (
      lower.includes("staff")
    ) {
      role = "staff";
    }

    localStorage.setItem(
      "idproofpro_token",
      "demo-token"
    );

    localStorage.setItem(
      "idproofpro_role",
      role
    );

    console.log(
      "LOGIN SUCCESS",
      role
    );

    if (role === "admin") {
      window.location.href =
        "/admin";
      return;
    }

    if (role === "staff") {
      window.location.href =
        "/staff";
      return;
    }

    window.location.href =
      "/developer";
  } catch (err) {
    console.error(err);

    setError(
      "Login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
//console.log("LOGIN FORM RENDERED");
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5"
    >
      <div>
        <label
          className="
          mb-2
          block
          text-xs
          uppercase
          tracking-[0.25em]
          text-slate-500
          "
        >
          Work Email
        </label>

        <div
          className={`
          flex
          items-center
          gap-3
          rounded-xl
          border
          px-4
          py-4
          bg-[#020d1b]

          ${
            error
              ? "border-red-500"
              : "border-slate-800"
          }
        `}
        >
          <Mail
            size={18}
            className="text-slate-500"
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            type="email"
            placeholder="name@company.com"
            className="
            w-full
            bg-transparent
            outline-none
            placeholder:text-slate-600
            text-white
          "
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <label
            className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-slate-500
            "
          >
            Password
          </label>

          <button
            type="button"
            className="
            text-sm
            text-blue-400
            "
          >
            Forgot Password?
          </button>
        </div>

        <div
          className={`
          flex
          items-center
          gap-3
          rounded-xl
          border
          px-4
          py-4
          bg-[#020d1b]

          ${
            error
              ? "border-red-500"
              : "border-slate-800"
          }
        `}
        >
          <Lock
            size={18}
            className="text-slate-500"
          />

          <input
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            type="password"
            placeholder="••••••••"
            className="
            w-full
            bg-transparent
            outline-none
            placeholder:text-slate-600
            text-white
            "
          />
        </div>
      </div>

      {error && (
        <div
          className="
          rounded-lg
          border
          border-red-500/30
          bg-red-500/10
          p-3
          text-sm
          text-red-400
          "
        >
          {error}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        bg-gradient-to-r
        from-[#2563eb]
        to-[#3b82f6]
        py-4
        text-lg
        font-medium
        shadow-[0_10px_40px_rgba(37,99,235,0.25)]
        transition-all
        hover:scale-[1.01]
        disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Signing In...
          </>
        ) : (
          <>
            Sign in to Console
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          className="
          text-sm
          text-slate-500
          hover:text-slate-300
          "
        >
          Need access? Contact administrator
        </button>
      </div>
    </form>
  );
}