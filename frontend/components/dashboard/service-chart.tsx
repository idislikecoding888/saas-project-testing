export default function ServiceChart() {
  return (
    <div
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-[8px]
      p-6
      h-[420px]
      "
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold tracking-[-0.03em]">
          Verification By Service
        </h3>

        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Primary
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-500" />
            Secondary
          </div>
        </div>
      </div>

      <div className="space-y-8">

        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Aadhaar OTP</span>
            <span>4.2k</span>
          </div>

          <div className="h-5 bg-gray-700 rounded">
            <div className="h-full w-[75%] bg-blue-600 rounded" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>PAN Verification</span>
            <span>2.8k</span>
          </div>

          <div className="h-5 bg-gray-700 rounded">
            <div className="h-full w-[55%] bg-blue-600 rounded" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Face Match</span>
            <span>1.4k</span>
          </div>

          <div className="h-5 bg-gray-700 rounded">
            <div className="h-full w-[30%] bg-blue-600 rounded" />
          </div>
        </div>
        

      </div>
      <div
  className="
  mt-8
  pt-4
  border-t
  border-[var(--border)]

  flex
  justify-between
  "
>
  <span className="text-xs text-gray-400">
    Aggregated data from last 7 days
  </span>

  <span className="font-semibold">
    Total: 8.4k
  </span>
</div>
    </div>
  );
}