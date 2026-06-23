"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  CheckCircle,
  AlertCircle,
  Activity,
  Calendar,
  Download,
} from "lucide-react";
import api from "@/lib/api/axios";
import UsageChart from "./usage-chart";
import ServiceChart from "./service-chart";
import RecentRequests from "./recent-requests";
import MetricCard from "./metric-card";

type MeUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
};

type DashboardData = {
  wallet: {
    id: string;
    userId: string;
    balance: number;
    createdAt?: string;
    updatedAt?: string;
  } | null;
  apiKeys: Array<{
    id: string;
    apiKey: string;
    isActive: boolean;
    createdAt: string;
  }>;
  totalVerifications: number;
  totalTransactions: number;
};

type HistoryRow = {
  id: string;
  serviceName: string;
  amount: number;
  status: "SUCCESS" | "FAILED";
  createdAt: string;
  errorMessage?: string | null;
};

function formatMoney(value: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(Number(value || 0))}`;
}

function prettyServiceName(serviceName: string) {
  return serviceName
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<MeUser | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [history, setHistory] = useState<HistoryRow[]>([]);

  const load = async () => {
    try {
      setError("");
      setRefreshing(true);

      const meResponse = await api.get("/users/me");
      const me = meResponse.data as MeUser;
      setUser(me);

      const [dashboardResponse, historyResponse] = await Promise.all([
        api.get(`/dashboard/${me.id}`),
        api.get(`/verifications/history/${me.id}`),
      ]);

      setDashboard(dashboardResponse.data as DashboardData);
      setHistory(historyResponse.data as HistoryRow[]);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const summary = useMemo(() => {
    const total = history.length;
    const success = history.filter((item) => item.status === "SUCCESS").length;
    const failed = history.filter((item) => item.status === "FAILED").length;

    const now = new Date();
    const today = history.filter((item) => {
      const created = new Date(item.createdAt);
      return created.toDateString() === now.toDateString();
    }).length;

    const thisMonth = history.filter((item) => {
      const created = new Date(item.createdAt);
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length;

    const successRate = total > 0 ? Math.round((success / total) * 1000) / 10 : 0;

    const topServices = Object.entries(
      history.reduce<Record<string, number>>((acc, item) => {
        acc[item.serviceName] = (acc[item.serviceName] || 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([serviceName, count]) => ({
        serviceName,
        count,
      }));

    const recentRows: {
  timestamp: string;
  service: string;
  requestId: string;
  status: "Success" | "Failed";
  latency: string;
}[] = history.slice(0, 3).map((item) => ({
  timestamp: formatTimestamp(item.createdAt),
  service: prettyServiceName(item.serviceName),
  requestId: item.id.slice(0, 8),
  status: item.status === "SUCCESS" ? "Success" : "Failed",
  latency: "—",
}));

    return {
      total,
      success,
      failed,
      today,
      thisMonth,
      successRate,
      topServices,
      recentRows,
    };
  }, [history]);

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">Overview</h1>

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

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-[var(--foreground-muted)]">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 xl:grid-cols-12 mb-10">
            <div className="col-span-1 xl:col-span-6">
              <MetricCard
                title="Wallet Balance"
                value={formatMoney(dashboard?.wallet?.balance ?? 0)}
                subtitle={
                  dashboard?.wallet
                    ? `Wallet ID: ${dashboard.wallet.id}`
                    : "Wallet will be created automatically"
                }
                icon={Wallet}
                large
              />
            </div>

            <div className="col-span-1 sm:col-span-2 xl:col-span-3">
              <MetricCard
                title="Success Rate"
                value={`${summary.successRate}%`}
                subtitle={`${summary.success} successful requests`}
                icon={CheckCircle}
              />
            </div>

            <div className="col-span-1 sm:col-span-2 xl:col-span-3">
              <MetricCard
                title="Failed Requests"
                value={String(summary.failed)}
                subtitle="Requires attention"
                icon={AlertCircle}
                danger
              />
            </div>

            <div className="col-span-1 sm:col-span-2 xl:col-span-6">
              <MetricCard
                title="API Calls Today"
                value={String(summary.today)}
                subtitle="Requests processed today"
                progress={Math.min(100, summary.today ? 100 : 0)}
                icon={Activity}
              />
            </div>

            <div className="col-span-1 sm:col-span-2 xl:col-span-6">
              <MetricCard
                title="API Calls This Month"
                value={String(summary.thisMonth)}
                subtitle="Requests processed this month"
                progress={Math.min(100, summary.thisMonth ? 100 : 0)}
                icon={Calendar}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <UsageChart />
            <ServiceChart />
          </div>

          <div className="mt-6">
            <div className="mb-4 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">
                    Top Services
                  </h3>
                  <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                    Based on your verification history.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {summary.topServices.length === 0 ? (
                  <div className="rounded-[8px] border border-dashed border-[var(--border)] p-6 text-[var(--foreground-muted)] md:col-span-2 xl:col-span-4">
                    No verification activity yet.
                  </div>
                ) : (
                  summary.topServices.map((item) => (
                    <div
                      key={item.serviceName}
                      className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-card)] p-4"
                    >
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {prettyServiceName(item.serviceName)}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {item.count}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <RecentRequests rows={summary.recentRows} />
          </div>
        </>
      )}
    </section>
  );
}