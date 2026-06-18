import RecentTransactions from "./recent-transactions";
import TopServices from "./top-services";
import VerificationHealth from "./verification-health";
import {
  Users,
  UserCog,
  FileCheck,
  IndianRupee,
  Key,
  ArrowRightLeft,
} from "lucide-react";

import MetricCard from "@/components/dashboard/metric-card";

export default function AdminOverview() {
  return (
    <section className="space-y-10">

      <div>
        <h1 className="text-4xl font-bold">
          Admin Console
        </h1>

        <p className="mt-2 text-[var(--foreground-muted)]">
          Platform operations,
          staff management and
          business analytics.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 items-stretch">

        <div className="col-span-6">
          <MetricCard
            title="Total Customers"
            value="1,284"
            subtitle="+48 this month"
            icon={Users}
          />
        </div>

        <div className="col-span-3">
          <MetricCard
            title="Total Staff"
            value="12"
            subtitle="Active"
            icon={UserCog}
          />
        </div>

        <div className="col-span-3">
          <MetricCard
            title="API Keys"
            value="224"
            subtitle="Issued"
            icon={Key}
          />
        </div>

        <div className="col-span-4">
          <MetricCard
            title="Verifications"
            value="84,225"
            subtitle="All time"
            icon={FileCheck}
          />
        </div>

        <div className="col-span-4">
          <MetricCard
            title="Transactions"
            value="5,412"
            subtitle="Processed"
            icon={ArrowRightLeft}
          />
        </div>

        <div className="col-span-4">
          <MetricCard
            title="Revenue"
            value="₹3.42L"
            subtitle="This month"
            icon={IndianRupee}
          />
        </div>

      </div>
      <div className="grid grid-cols-12 gap-6 items-stretch">

  <div className="col-span-7">
    <RecentTransactions />
  </div>

  <div className="col-span-5">
    <TopServices />
  </div>

</div>

<div className="mt-6">
  <VerificationHealth />
</div>

    </section>
  );
}