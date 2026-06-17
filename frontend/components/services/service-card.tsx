import { ArrowUpRight } from "lucide-react";

type ServiceCardProps = {
  name: string;
  description: string;
  status: "active" | "live" | "beta";
  price: number;
  icon: React.ReactNode;
};

export default function ServiceCard({
  name,
  description,
  status,
  price,
  icon,
}: ServiceCardProps) {
  const badgeColor = {
    active: "bg-emerald-500",
    live: "bg-blue-500",
    beta: "bg-amber-500",
  };

  return (
    <div
      className="
      group
      flex flex-col
      rounded-lg
      border border-[#273647]
      bg-[#0D1C2D]
      p-5
      transition-all
      duration-200
      hover:border-[#3B82F6]
      hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]
      hover:-translate-y-[2px]
      hover:bg-[#122131]
      "
    >
      <div className="mb-5 flex items-start justify-between">
        <div
          className="
          flex h-11 w-11 items-center justify-center
          rounded-md
          border border-[#273647]
          bg-[#122131]
          text-[#B4C5FF]
          "
        >
          {icon}
        </div>

        <div
          className="
          flex items-center gap-2
          rounded-md
          border border-[#273647]
          px-2 py-1
          text-[11px]
          uppercase tracking-wider
          "
        >
          <span
            className={`h-2 w-2 rounded-full ${badgeColor[status]}`}
          />
          {status}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">
        {name}
      </h3>

      <p className="mb-6 text-sm text-slate-400 line-clamp-3">
        {description}
      </p>

      <div className="mt-auto">
        <div className="mb-4 text-xs text-slate-400">
          ₹{price} / request
        </div>

        <div className="flex gap-2">
          <button
            className="
flex-1
rounded-md

border
border-[#273647]

py-2
text-sm

transition-all

hover:bg-[#122131]
hover:border-[#3B82F6]
hover:text-white

hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]
"
          >
            Docs
          </button>

          <button
            className="
            flex-1 rounded-md
            bg-[#0061FF]
            py-2 text-sm font-medium
            text-white
            hover:brightness-110
hover:shadow-[0_0_18px_rgba(37,99,235,0.25)]
            "
          >
            Try API
          </button>
        </div>
      </div>
    </div>
  );
}