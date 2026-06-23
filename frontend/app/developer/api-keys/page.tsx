"use client";

import { useEffect, useMemo, useState } from "react";
import RotateKeyModal from "@/components/apikeys/rotate-key-modal";
import ApiKeyCard from "@/components/apikeys/api-key-card";
import WalletBalance from "@/components/wallet/wallet-balance";
import WalletStats from "@/components/wallet/wallet-stats";
import TransactionsTable from "@/components/wallet/transactions-table";

import GenerateKeyModal from "@/components/apikeys/generate-key-modal";
import ConfirmModal from "@/components/apikeys/confirm-modal";
import AddFundsModal from "@/components/wallet/add-funds-modal";
import Toast from "@/components/ui/toast";
import api from "@/lib/api/axios";

type MeUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: string;
};

type ApiKey = {
  id: string;
  userId: string;
  apiKey: string;
  isActive: boolean;
  createdAt: string;
};

type WalletData = {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

type WalletTransaction = {
  id: string;
  userId: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  description: string | null;
  createdAt: string;
};

function formatMoney(value: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(Number(value || 0))}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

async function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function ApiKeysPage() {
  const [userId, setUserId] = useState("");
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [generateOpen, setGenerateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rotateOpen, setRotateOpen] = useState(false);
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("API Key Copied");
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [hiddenKeyIds, setHiddenKeyIds] = useState<string[]>([]);

  const visibleApiKeys = useMemo(
    () => apiKeys.filter((key) => !hiddenKeyIds.includes(key.id)),
    [apiKeys, hiddenKeyIds]
  );
  const activeKeys = visibleApiKeys.filter(
  (key) => key.isActive
);

const revokedKeys = visibleApiKeys.filter(
  (key) => !key.isActive
);

  const todaySpend = useMemo(() => {
    const today = new Date().toDateString();
    return transactions
      .filter(
        (tx) =>
          tx.type === "DEBIT" &&
          new Date(tx.createdAt).toDateString() === today
      )
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  const monthlySpend = useMemo(() => {
    const now = new Date();
    return transactions
      .filter((tx) => {
        const created = new Date(tx.createdAt);
        return (
          tx.type === "DEBIT" &&
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  const averageDaily = useMemo(() => {
    const daysElapsed = Math.max(1, new Date().getDate());
    return monthlySpend / daysElapsed;
  }, [monthlySpend]);

  const refreshPage = async () => {
    const meResponse = await api.get("/users/me");
    const me = meResponse.data as MeUser;
    setUserId(me.id);

    const [keysRes, walletRes, transactionsRes] = await Promise.all([
      api.get(`/api-keys/${me.id}`),
      api.get(`/wallet/${me.id}`),
      api.get(`/wallet/transactions/${me.id}`),
    ]);

    setApiKeys(keysRes.data as ApiKey[]);
    setWallet(walletRes.data as WalletData);
    setTransactions(transactionsRes.data as WalletTransaction[]);
  };

  const loadPage = async () => {
    try {
      setError("");
      setLoading(true);
      await refreshPage();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load API Keys & Wallet."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPage();
  }, []);

  const handleGenerateKey = async () => {
    if (!userId) return;

    try {
      setBusy(true);
      setError("");
      await api.post(`/api-keys/${userId}`);
      setToastMessage("API key generated");
      setToastOpen(true);
      await refreshPage();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to generate API key."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleRotateKey = async () => {
    if (!userId) return;

    try {
      setBusy(true);
      setError("");
      await api.post(`/api-keys/regenerate/${userId}`);
      setToastMessage("API key rotated");
      setToastOpen(true);
      await refreshPage();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to rotate API key."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!selectedKeyId) return;

    try {
      setBusy(true);
      setError("");
      const handleDeleteKey = async () => {
  if (!selectedKeyId) return;

  setHiddenKeyIds((prev) => [
    ...prev,
    selectedKeyId,
  ]);

  setToastMessage("API Key removed");
  setToastOpen(true);

  setDeleteOpen(false);
  setSelectedKeyId(null);
};
      setHiddenKeyIds((prev) => [...prev, selectedKeyId]);
      setToastMessage("API key deleted");
      setToastOpen(true);
      setDeleteOpen(false);
      setSelectedKeyId(null);
      await refreshPage();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete API key."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleAddFunds = async (amount: number) => {
    if (!userId) return;

    try {
      setBusy(true);
      setError("");

      const orderRes = await api.post("/razorpay/create-order", {
        userId,
        amount,
      });

      const order = orderRes.data as {
        id: string;
        amount: number;
        currency: string;
      };

      const loaded = await loadRazorpayScript();
const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

if (!loaded || !razorpayKey) {
  setError(
    "Razorpay is not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to frontend/.env.local and restart the dev server."
  );
  return;
}
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "IDProofPro",
        description: "Wallet Recharge",
        order_id: order.id,
        handler: async function (response: any) {
          await api.post("/razorpay/verify-payment", {
            userId,
            amount,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          setToastMessage("Wallet recharged");
          setToastOpen(true);
          setAddFundsOpen(false);
          await refreshPage();
        },
        prefill: {
          email: "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to start wallet recharge."
      );
    } finally {
      setBusy(false);
    }
  };

  const walletRows = transactions.map((tx) => ({
  id: tx.id,
  type: (tx.type === "CREDIT"
    ? "Recharge"
    : "Usage") as "Recharge" | "Usage" | "Refund",

  date: formatDateTime(tx.createdAt),

  description: tx.description || "Wallet Transaction",

  amount: `${tx.type === "CREDIT" ? "+" : "-"} ₹${new Intl.NumberFormat(
    "en-IN"
  ).format(Number(tx.amount || 0))}`,

  status: (tx.type === "CREDIT"
    ? "Completed"
    : "Charged") as
      | "Completed"
      | "Charged"
      | "Refunded",
}));

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-5xl font-semibold text-white">
          API Keys & Wallet
        </h1>

        <p className="mt-2 text-slate-400">
          Manage authentication credentials and billing.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div
        className="
        rounded-xl
        border border-slate-800
        bg-[#0b1d31]
        p-6
      "
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Active API Keys
          </h2>

          <button
            onClick={() => setGenerateOpen(true)}
            className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            text-white
            transition-all
            hover:bg-blue-500
          "
          >
            Generate Key
          </button>
        </div>

        {loading ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
            Loading API keys...
          </div>
        ) : visibleApiKeys.length === 0 ? (
          <div
            className="
            rounded-xl
            border border-dashed border-slate-700
            p-10
            text-center
            "
          >
            <h3 className="text-xl font-semibold">
              No API Keys Found
            </h3>

            <p className="mt-2 text-slate-400">
              Generate your first API key to begin.
            </p>
          </div>
        ) : (
          <div className="space-y-8">

  {/* ACTIVE KEY */}

  {activeKeys.length > 0 && (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-white">
        Current Active Key
      </h3>

      {activeKeys.map((key) => (
        <ApiKeyCard
          key={key.id}
          active={true}
          name="Current API Key"
          keyValue={key.apiKey}
          createdAt={formatDate(key.createdAt)}
          onRotate={() => {
            setSelectedKeyId(key.id);
            setRotateOpen(true);
          }}
          onCopy={() => {
            setToastMessage("API Key Copied");
            setToastOpen(true);
          }}
          onDelete={() => {
            setSelectedKeyId(key.id);
            setDeleteOpen(true);
          }}
        />
      ))}
    </div>
  )}

  {/* REVOKED KEYS */}

  {revokedKeys.length > 0 && (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-slate-400">
        Revoked Keys
      </h3>

      <div className="space-y-4">
        {revokedKeys.map((key) => (
          <ApiKeyCard
            key={key.id}
            active={false}
            name={key.apiKey.slice(0, 12) + "..."}
            keyValue={key.apiKey}
            createdAt={formatDate(key.createdAt)}
            onCopy={() => {
              setToastMessage("API Key Copied");
              setToastOpen(true);
            } }
            onDelete={() => {
              setSelectedKeyId(key.id);
              setDeleteOpen(true);
            } } onRotate={function (): void {
              throw new Error("Function not implemented.");
            } }          />
        ))}
      </div>
    </div>
  )}
</div>
        )}
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 xl:grid-cols-4">
        <div className="col-span-1 xl:col-span-2">
          <WalletBalance
  balance={wallet?.balance ?? 0}
  onAddFunds={() => setAddFundsOpen(true)}
/>
        </div>

        <div className="col-span-1 xl:col-span-2 grid gap-4">
          <WalletStats
            todaySpend={todaySpend}
            monthlySpend={monthlySpend}
            averageDaily={averageDaily}
          />
        </div>
      </div>

      <div className="mt-6">
        <TransactionsTable rows={walletRows} />
      </div>

      <GenerateKeyModal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        onGenerate={async () => {
          await handleGenerateKey();
        }}
      />

      <ConfirmModal
        open={deleteOpen}
        title="Delete API Key"
        description="This action cannot be undone."
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedKeyId(null);
        }}
        onConfirm={handleDeleteKey}
      />

      <RotateKeyModal
        open={rotateOpen}
        onClose={() => {
          setRotateOpen(false);
          setSelectedKeyId(null);
        }}
        onConfirm={handleRotateKey}
      />

      <AddFundsModal
        open={addFundsOpen}
        onClose={() => setAddFundsOpen(false)}
        onContinue={handleAddFunds}
      />

      <Toast show={toastOpen} message={toastMessage} />
    </div>
  );
}