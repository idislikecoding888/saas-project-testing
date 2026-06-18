"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TicketDrawer({
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
        w-[550px]

        border-l
        border-slate-800

        bg-[#08172b]

        p-8
      "
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">
            Ticket Details
          </h2>

          <button
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-8 space-y-6">

          <div>
            <p className="text-slate-500">
              Ticket ID
            </p>

            <p>SUP-001</p>
          </div>

          <div>
            <p className="text-slate-500">
              User
            </p>

            <div className="mt-8 space-y-8">

  <div>
    <p className="text-slate-500">
      Customer
    </p>

    <p className="mt-2">
      Rahul Sharma
    </p>
  </div>

  <div>
    <p className="text-slate-500">
      Email
    </p>

    <p className="mt-2">
      rahul@email.com
    </p>
  </div>

  <div>
    <p className="text-slate-500">
      Issue
    </p>

    <p className="mt-2 leading-8">
      Wallet recharge was successful
      but credits are not reflecting
      inside dashboard.
    </p>
  </div>

  <div>
    <p className="mb-4 text-slate-500">
      Conversation
    </p>

    <div className="space-y-4">

      <div
        className="
        rounded-2xl
        bg-[#020d1b]
        p-4
        "
      >
        Wallet not updating.
      </div>

      <div
        className="
        rounded-2xl
        bg-blue-600/10
        p-4
        "
      >
        Support is investigating.
      </div>

    </div>
  </div>

</div>

          </div>

          <div>
            <p className="mb-3 text-slate-500">
              Status
            </p>

            <div className="grid grid-cols-2 gap-3">

              <button className="rounded-xl border border-slate-700 p-3">
                Open
              </button>

              <button className="rounded-xl border border-slate-700 p-3">
                In Progress
              </button>

              <button className="rounded-xl border border-slate-700 p-3">
                Resolved
              </button>

              <button className="rounded-xl border border-slate-700 p-3">
                Closed
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}