import {
  Wallet,
  CheckCircle,
  AlertCircle,
  Activity,
  Calendar,
  Download,
} from "lucide-react";
import UsageChart from "./usage-chart";
import ServiceChart from "./service-chart";
import RecentRequests from "./recent-requests";

import MetricCard from "./metric-card";

export default function Overview() {
  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
  <div>
    <h1 className="text-4xl font-bold">
      Overview
    </h1>

    <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl">
      Real-time metrics for your production environment.
    </p>
  </div>

  <button
    className="
    flex
    items-center
    gap-4

    px-5
    py-3

    rounded-[14px]

    bg-[var(--surface)]

    border
    border-[var(--border)]

    hover:bg-[var(--hover-surface)]

    transition-all
    "
  >
    <Download size={16} />

    Export Report
  </button>
</div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 mb-10">

        <div className="col-span-1.5 xl:col-span-6">
          <MetricCard
            title="Wallet Balance"
            value="₹12,450"
            subtitle="+₹3,200 this month"
            icon={Wallet}
            large
          />
        </div>

        <div className="col-span-1 sm:col-span-2 xl:col-span-3">
          <MetricCard
            title="Success Rate"
            value="99.2%"
            subtitle="+0.1% vs yesterday"
            icon={CheckCircle}
          />
        </div>

        <div className="col-span-1 sm:col-span-2 xl:col-span-3">
          <MetricCard
            title="Failed Requests"
            value="84"
            subtitle="Requires attention"
            icon={AlertCircle}
            danger
          />
        </div>

        <div className="col-span-1 xl:col-span-6">
          <MetricCard
            title="API Calls Today"
            value="12,402"
            subtitle="45% of daily limit"
            progress={45}
            icon={Activity}
          />
        </div>

        <div className="col-span-1 xl:col-span-6">
          <MetricCard
            title="API Calls This Month"
            value="4.2M"
            subtitle="82% of monthly quota"
            progress={82}
            icon={Calendar}
          />
        </div>

      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
  <UsageChart />
  <ServiceChart />
</div>

      <div>
        <RecentRequests />
      </div>
    </section>
  );
}