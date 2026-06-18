import VerificationTable from "@/components/staff/verification-table";

export default function VerificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Verification Review
        </h1>

        <p className="mt-2 text-slate-400">
          Review customer verification requests.
        </p>
      </div>

      <div className="max-w-md">
        <input
          placeholder="Search verification..."
          className="
          w-full
          rounded-xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          px-4
          py-3
          "
        />
      </div>

      <VerificationTable />
    </div>
  );
}