export default function StaffDashboard() {
  const cards = [
    {
      title: "Today's Verifications",
      value: "2,451",
    },
    {
      title: "Open Tickets",
      value: "37",
    },
    {
      title: "Transactions Reviewed",
      value: "1,284",
    },
    {
      title: "Assigned Cases",
      value: "16",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Staff Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Verification and support operations.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-6
          "
          >
            <p className="text-slate-400">
              {card.title}
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-semibold">
          Quick Access
        </h2>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <a
            href="/staff/verifications"
            className="rounded-xl border border-[var(--border)] p-5 hover:bg-slate-900"
          >
            Verifications
          </a>

          <a
            href="/staff/transactions"
            className="rounded-xl border border-[var(--border)] p-5 hover:bg-slate-900"
          >
            Transactions
          </a>

          <a
            href="/staff/support"
            className="rounded-xl border border-[var(--border)] p-5 hover:bg-slate-900"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
}