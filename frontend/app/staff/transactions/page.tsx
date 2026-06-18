import TransactionsTable from "@/components/wallet/transactions-table";

export default function TransactionsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Transaction Review
        </h1>

        <p className="mt-2 text-slate-400">
          Review customer transactions.
        </p>
      </div>

      <TransactionsTable />

    </div>
  );
}