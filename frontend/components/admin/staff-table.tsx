"use client";

import { useState } from "react";

import CreateStaffModal from "./create-staff-modal";
import StaffDetailsModal from "./staff-details-modal";
import { Plus } from "lucide-react";

const staff = [
  {
    name: "Rahul Sharma",
    email: "rahul@company.com",
    role: "Operations",
    permissions: 4,
    status: "Active",
  },
  {
    name: "Ananya Roy",
    email: "ananya@company.com",
    role: "Support",
    permissions: 3,
    status: "Active",
  },
  {
    name: "Amit Verma",
    email: "amit@company.com",
    role: "Compliance",
    permissions: 6,
    status: "Suspended",
  },
];

export default function StaffTable() {
    const [search, setSearch] =
  useState("");
    const [createOpen, setCreateOpen] =
  useState(false);

const [detailsOpen, setDetailsOpen] =
  useState(false);
  return (
    <section className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Staff Management
          </h1>

          <p className="mt-2 text-[var(--foreground-muted)]">
            Manage internal staff and permissions.
          </p>
        </div>

        <button
  onClick={() =>
    setCreateOpen(true)
  }
          className="
          flex
          items-center
          gap-2

          rounded-xl

          bg-blue-600

          px-4
          py-3

          text-white

          hover:bg-blue-500
          "
        >
          <Plus size={18} />
          Create Staff
        </button>
      </div>
      <div className="mb-6 max-w-md">

  <input
    placeholder="Search staff..."
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

    outline-none
    "
  />

</div>

      <div
        className="
        
        overflow-hidden

        rounded-2xl

        border
        border-[var(--border)]

        bg-[var(--surface)]
        "
      >
        <table className="w-full">

          <thead>
            <tr className="border-b border-[var(--border)]">

              <th className="p-5 text-left">
                Name
              </th>

              <th className="p-5 text-left">
                Email
              </th>

              <th className="p-5 text-left">
                Role
              </th>

              <th className="p-5 text-left">
                Permissions
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {staff
  .filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((user) => (
              <tr
                key={user.email}
                className="
                border-b
                border-[var(--border)]

                hover:bg-[var(--hover-surface)]
                "
              >
                <td className="p-5">
                  {user.name}
                </td>

                <td className="p-5 text-[var(--foreground-muted)]">
                  {user.email}
                </td>

                <td className="p-5">
                  {user.role}
                </td>

                <td className="p-5">
                  {user.permissions}
                </td>

                <td className="p-5">{user.status}</td>

                <td className="p-5">
                  <button
  onClick={() =>
    setDetailsOpen(true)
  }
  className="text-blue-400"
>
  View
</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
<CreateStaffModal
  open={createOpen}
  onClose={() =>
    setCreateOpen(false)
  }
/>

<StaffDetailsModal
  open={detailsOpen}
  onClose={() =>
    setDetailsOpen(false)
  }
/>
    </section>
  );
}