"use client";

import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-center
          px-24
          bg-gradient-to-br
          from-[#06101f]
          via-[#030d1c]
          to-black
        "
        >
          <div className="max-w-[460px]">
  <div
    className="
    mb-12
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-2xl
    border
    border-slate-800
    bg-[#08172b]
    "
  >
    <Shield size={26} />
  </div>

  <h1
    className="
    text-7xl
    font-semibold
    tracking-tight
    text-white
    "
  >
    IDProofPro
  </h1>

  <p
    className="
    mt-10
    text-3xl
    font-medium
    leading-tight
    text-white
    "
  >
    Enterprise Identity
    <br />
    Verification
  </p>

  <p
    className="
    mt-8
    max-w-md
    text-lg
    leading-9
    text-slate-400
    "
  >
    Verify people, businesses and
    financial records through a
    single compliance infrastructure.
  </p>

  <p
    className="
    mt-24
    text-sm
    tracking-wide
    text-slate-600
    "
  >
    Powered by Techgen
  </p>
</div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className="
          flex
          items-center
          justify-center
          px-6
          bg-[#030d1c]
        "
        >
          <div
            className="
            w-full
            max-w-[340px]
            rounded-[24px]
            border
            border-slate-800
            bg-[#071427]
            p-4
          "
          >
            <div className="text-center">
              <div
                className="
                mx-auto
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-800
                bg-[#0b1d31]
              "
              >
                <Shield size={24} />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Sign In
              </h2>

              <p className="mt-3 text-slate-400">
                Secure access to your verification
                console.
              </p>
            </div>

            <form className="mt-8 space-y-5">

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">
                  Work Email
                </label>

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#020d1b]
                  px-4
                  py-3.5
                "
                >
                  <Mail
                    size={18}
                    className="text-slate-500"
                  />

                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                    placeholder:text-slate-600
                  "
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <div className="mb-2 flex justify-between">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Password
                  </label>

                  <button
                    type="button"
                    className="
                    text-sm
                    text-blue-400
                    hover:text-blue-300
                  "
                  >
                    Forgot Password?
                  </button>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#020d1b]
                  px-4
                  py-4
                "
                >
                  <Lock
                    size={18}
                    className="text-slate-500"
                  />

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                    placeholder:text-slate-600
                  "
                  />
                </div>
              </div>

              <div className="text-center">
  <button
    type="button"
    className="
    text-sm
    text-slate-500
    hover:text-slate-300
    transition-colors
    "
  >
    Need access? Contact administrator
  </button>
</div>

              <button
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
shadow-[0_10px_40px_rgba(37,99,235,0.25)]
                py-4
                text-lg
                font-medium
                text-white
                shadow-[0_0_30px_rgba(37,99,235,0.20)]
                transition-all
                hover:bg-[#3b82f6]
              "
              >
                Sign in to Console

                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}