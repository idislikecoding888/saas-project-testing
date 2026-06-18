"use client";

import { useState } from "react";

import TicketDrawer from "./ticket-drawer";

const tickets = [
  {
    id: "SUP-001",
    user: "Rahul Sharma",
    subject: "Wallet not updating",
    time: "2 mins ago",
  },

  {
    id: "SUP-002",
    user: "Ananya Roy",
    subject: "Verification failed",
    time: "15 mins ago",
  },

  {
    id: "SUP-003",
    user: "Amit Verma",
    subject: "API credits missing",
    time: "1 hour ago",
  },
];

export default function SupportTable() {
  const [drawerOpen, setDrawerOpen] =
    useState(false);
  const [search, setSearch] =
  useState("");  

  return (
    <section className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Support Center
        </h1>

        <p className="mt-2 text-[var(--foreground-muted)]">
          Manage customer issues and escalations.
        </p>
      </div>

      <div className="max-w-md">
        <input
  placeholder="Search tickets..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
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

      <div className="space-y-4">

        {tickets
  .filter((ticket) =>
    ticket.subject
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((ticket) => (
          <div
            key={ticket.id}
            className="
            rounded-2xl

            border
            border-[var(--border)]

            bg-[var(--surface)]

            p-6
            "
          >
            <div className="flex justify-between">

              <div>

                <p className="text-lg font-medium">
                  {ticket.subject}
                </p>

                <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                  {ticket.id}
                </p>

              </div>

              <button
                onClick={() =>
                  setDrawerOpen(true)
                }
                className="
                text-blue-400
                "
              >
                Open Ticket →
              </button>

            </div>

            <div className="mt-5 flex justify-between">

              <p>
                {ticket.user}
              </p>

              <p className="text-sm text-[var(--foreground-muted)]">
                {ticket.time}
              </p>

            </div>
          </div>
        ))}

      </div>

      <TicketDrawer
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      />

    </section>
  );
}