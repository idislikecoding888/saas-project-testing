import RegisterForm from "@/components/auth/register-form";
import { Shield } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

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
          <div>
            <img
              src="/logo-white.png"
              alt="IDProofPro"
              className="w-[320px]"
            />

            <h1 className="mt-12 text-5xl font-bold">
              Create Account
            </h1>

            <p className="mt-6 text-slate-400 max-w-md">
              Start verifying identities,
              businesses and financial
              records through a single
              compliance platform.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 bg-[#030d1c]">
          <div
            className="
            w-full
            max-w-[420px]
            rounded-[24px]
            border
            border-slate-800
            bg-[#071427]
            p-6
            "
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-[#0b1d31]">
                <Shield size={24} />
              </div>

              <h2 className="text-3xl font-semibold">
                Register
              </h2>

              <p className="mt-3 text-slate-400">
                Create your developer account.
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}