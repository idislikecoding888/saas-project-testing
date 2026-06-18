export default function VerificationHealth() {
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
        Verification Health
      </h3>

      <div className="mt-8">
        <div className="flex justify-between">
          <span>Success Rate</span>

          <span>99.2%</span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{
              width: "99%",
            }}
          />
        </div>

        <div className="mt-8 flex justify-between">
          <span>Failed Requests</span>

          <span>84</span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-red-500"
            style={{
              width: "10%",
            }}
          />
        </div>
      </div>
    </div>
  );
}