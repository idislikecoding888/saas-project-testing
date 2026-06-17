"use client";

import { useState } from "react";

export default function TransactionsTable() {
  const [filter, setFilter] =
    useState("All");

  const [visibleCount, setVisibleCount] =
    useState(3);

  const transactions = [
    {
      type: "Recharge",
      date: "Today 10:45 AM",
      description: "Wallet Recharge",
      amount: "+ ₹5,000",
      status: "Completed",
    },
    {
      type: "Usage",
      date: "Yesterday",
      description: "Aadhaar OTP Usage",
      amount: "- ₹342",
      status: "Charged",
    },
    {
      type: "Usage",
      date: "12 Jun 2026",
      description: "PAN Verification",
      amount: "- ₹120",
      status: "Charged",
    },
    {
      type: "Refund",
      date: "10 Jun 2026",
      description: "Failed Verification Refund",
      amount: "+ ₹80",
      status: "Refunded",
    },
    {
      type: "Recharge",
      date: "08 Jun 2026",
      description: "Wallet Recharge",
      amount: "+ ₹10,000",
      status: "Completed",
    },
    {
      type: "Usage",
      date: "07 Jun 2026",
      description: "Face Match API",
      amount: "- ₹560",
      status: "Charged",
    },
  ];

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter(
          (t) => t.type === filter
        );

  const getStatusBadge = (
    status: string
  ) => {
    switch (status) {
      case "Completed":
        return (
          <span
            className="
            px-3
            py-1
            rounded-full
            text-xs
            bg-blue-500/10
            text-blue-400
            border
            border-blue-500/20
          "
          >
            {status}
          </span>
        );

      case "Charged":
        return (
          <span
            className="
            px-3
            py-1
            rounded-full
            text-xs
            bg-emerald-500/10
            text-emerald-400
            border
            border-emerald-500/20
          "
          >
            {status}
          </span>
        );

      case "Refunded":
        return (
          <span
            className="
            px-3
            py-1
            rounded-full
            text-xs
            bg-amber-500/10
            text-amber-400
            border
            border-amber-500/20
          "
          >
            {status}
          </span>
        );

      default:
        return status;
    }
  };

  return (
    <div
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-[8px]
      overflow-hidden
      "
    >
      {/* HEADER */}

      <div
        className="
        px-6
        py-5
        border-b
        border-[var(--border)]

        flex
        justify-between
        items-center
        "
      >
        <h3 className="text-xl font-semibold tracking-[-0.03em]">
          Recent Transactions
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setFilter("All")
            }
            className={`px-3 py-1 text-sm border transition-all ${
              filter === "All"
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-[var(--border)] text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("Recharge")
            }
            className={`px-3 py-1 text-sm border transition-all ${
              filter === "Recharge"
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-[var(--border)] text-gray-400 hover:text-white"
            }`}
          >
            Recharge
          </button>

          <button
            onClick={() =>
              setFilter("Usage")
            }
            className={`px-3 py-1 text-sm border transition-all ${
              filter === "Usage"
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-[var(--border)] text-gray-400 hover:text-white"
            }`}
          >
            Usage
          </button>

          <button
            onClick={() =>
              setFilter("Refund")
            }
            className={`px-3 py-1 text-sm border transition-all ${
              filter === "Refund"
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-[var(--border)] text-gray-400 hover:text-white"
            }`}
          >
            Refund
          </button>
        </div>
      </div>

      {/* TABLE */}

      <table className="w-full">
        <thead>
          <tr
            className="
            text-left
            border-b
            border-[var(--border)]
            "
          >
            <th className="p-4">
              Date
            </th>

            <th className="p-4">
              Description
            </th>

            <th className="p-4">
              Amount
            </th>

            <th className="p-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions
            .slice(0, visibleCount)
            .map((t, index) => (
              <tr
                key={index}
                className="
                border-b
                border-[var(--border)]
                hover:bg-[var(--hover-surface)]
                transition-all
                "
              >
                <td className="p-4 text-gray-400">
                  {t.date}
                </td>

                <td className="p-4">
                  {t.description}
                </td>

                <td className="p-4">
                  {t.amount}
                </td>

                <td className="p-4">
                  {getStatusBadge(
                    t.status
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* LOAD MORE */}

      {visibleCount <
        filteredTransactions.length && (
        <div
          className="
          border-t
          border-[var(--border)]
          p-4
          flex
          justify-center
          "
        >
          <button
            onClick={() =>
              setVisibleCount(
                visibleCount + 3
              )
            }
            className="
            text-gray-400
            hover:text-white
            transition-all
            "
          >
            Load More Transactions
          </button>
        </div>
      )}
    </div>
  );
}