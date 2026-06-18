export default function RecentTransactions() {
  const data = [
    {
      id: "TXN-9231",
      user: "Rahul Sharma",
      amount: "₹5,000",
    },
    {
      id: "TXN-9232",
      user: "Ananya Roy",
      amount: "₹2,500",
    },
    {
      id: "TXN-9233",
      user: "Amit Verma",
      amount: "₹8,000",
    },
  ];

  return (
    <div
      className="
      rounded-2xl
      border
      border-[var(--border)]
      bg-[var(--surface)]
      p-6
    "
    >
      <h3 className="text-xl font-semibold">
        Recent Transactions
      </h3>

      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="
            flex
            items-center
            justify-between
          "
          >
            <div>
              <p>{item.user}</p>

              <p className="text-sm text-[var(--foreground-muted)]">
                {item.id}
              </p>
            </div>

            <p>{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}