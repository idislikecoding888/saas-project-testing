const services = [
  "GSTIN Verification",
  "Penny Drop",
  "Face Check",
  "Vehicle RC",
  "Employment 360",
];

export default function TopServices() {
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
        Top Services
      </h3>

      <div className="mt-6 space-y-5">
        {services.map((service) => (
          <div
            key={service}
            className="
            flex
            items-center
            justify-between
          "
          >
            <span>{service}</span>

            <span className="text-slate-400">
              12.4k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}