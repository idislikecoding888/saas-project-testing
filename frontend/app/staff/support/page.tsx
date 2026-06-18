import SupportTable from "@/components/admin/support-table";

export default function SupportPage() {
  return (
    <div className="space-y-8">

      {/* <div>
        <h1 className="text-4xl font-bold">
          Support Queue
        </h1>

        <p className="mt-2 text-slate-400">
          Manage customer issues.
        </p>
      </div>

      <div className="flex gap-3">

        <button className="rounded-xl border border-[var(--border)] px-4 py-2">
          All
        </button>

        <button className="rounded-xl border border-[var(--border)] px-4 py-2">
          Open
        </button>

        <button className="rounded-xl border border-[var(--border)] px-4 py-2">
          In Progress
        </button>

        <button className="rounded-xl border border-[var(--border)] px-4 py-2">
          Resolved
        </button>

      </div> */}

      <SupportTable />

    </div>
  );
}