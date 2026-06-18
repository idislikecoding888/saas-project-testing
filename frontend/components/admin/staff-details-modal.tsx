"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

const permissions = [
  "MANAGE_STAFF",
  "VIEW_USERS",
  "VIEW_TRANSACTIONS",
  "VIEW_VERIFICATIONS",
  "MANAGE_PRICING",
  "VIEW_SUPPORT",
];

export default function StaffDetailsModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50">
      <div
        className="
        absolute
        right-0
        top-0
        h-full
        w-[500px]
        border-l
        border-slate-800
        bg-[#08172b]
        p-8
      "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Staff Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400"
          >
            Close
          </button>
        </div>

        <div className="mt-8 space-y-6">

          <div>
            <p className="text-slate-500">
              Name
            </p>

            <p className="mt-1 text-lg">
              Rahul Sharma
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Email
            </p>

            <p className="mt-1">
              rahul@company.com
            </p>
          </div>

          <div>
            <p className="text-slate-500">
              Role
            </p>

            <p className="mt-1">
              Operations
            </p>
          </div>

          <div>
            <p className="mb-4 text-slate-500">
              Permissions
            </p>

            <div className="space-y-3">
              {permissions.map((permission) => (
                <label
                  key={permission}
                  className="
                  flex
                  items-center
                  justify-between

                  rounded-xl

                  border
                  border-slate-800

                  px-4
                  py-3
                "
                >
                  {permission}

                  <input
                    type="checkbox"
                    defaultChecked
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}