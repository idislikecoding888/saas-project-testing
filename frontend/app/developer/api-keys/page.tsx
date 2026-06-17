"use client";

import { useState } from "react";
import RotateKeyModal from "@/components/apikeys/rotate-key-modal";
import ApiKeyCard from "@/components/apikeys/api-key-card";
import WalletBalance from "@/components/wallet/wallet-balance";
import WalletStats from "@/components/wallet/wallet-stats";
import TransactionsTable from "@/components/wallet/transactions-table";

import GenerateKeyModal from "@/components/apikeys/generate-key-modal";
import ConfirmModal from "@/components/apikeys/confirm-modal";
import AddFundsModal from "@/components/wallet/add-funds-modal";
import Toast from "@/components/ui/toast";

export default function ApiKeysPage() {
  const [generateOpen, setGenerateOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);
  const [rotateOpen, setRotateOpen] =
  useState(false);  



  const [addFundsOpen, setAddFundsOpen] =
    useState(false);

  const [toastOpen, setToastOpen] =
    useState(false);
  
    const apiKeys = [1, 2];

  return (
    <div className="p-8">
      

      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-semibold text-white">
          API Keys & Wallet
        </h1>

        <p className="mt-2 text-slate-400">
          Manage authentication credentials and billing.
        </p>
      </div>

      {/* ROW 1 */}

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
            onClick={() =>
              setGenerateOpen(true)
            }
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

        {apiKeys.length === 0 ? (

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

<div className="space-y-4">
          <ApiKeyCard
          onRotate={() =>
  setRotateOpen(true)
}
            onCopy={() => {
  setToastOpen(true);

  setTimeout(() => {
    setToastOpen(false);
  }, 2000);
}}
            name="Production Master Key"
            keyValue="pk_live_8f92a...e7b1"
            createdAt="12 Oct 2025"
            onDelete={() =>
              setDeleteOpen(true)
            }
          />

          <ApiKeyCard
          onRotate={() =>
  setRotateOpen(true)
}
          onCopy={() => {
  setToastOpen(true);

  setTimeout(() => {
    setToastOpen(false);
  }, 2000);
}}
            name="Development Sandbox"
            keyValue="sk_test_4a19c...d9f2"
            createdAt="05 Nov 2025"
            onDelete={() =>
              setDeleteOpen(true)
            }
          />
        </div>
      )}
      </div>

      {/* ROW 2 */}

      <div className="mt-6 grid gap-4 grid-cols-1 xl:grid-cols-4">
        <div className="col-span-1 xl:col-span-2">
          <WalletBalance
            onAddFunds={() =>
              setAddFundsOpen(true)
            }
          />
        </div>

        <div className="col-span-1 xl:col-span-2 grid gap-4">
          <WalletStats />
        </div>
      </div>

      {/* TRANSACTIONS */}

      <div className="mt-6">
        <TransactionsTable />
      </div>

      {/* MODALS */}

      <GenerateKeyModal
        open={generateOpen}
        onClose={() =>
          setGenerateOpen(false)
        }
      />

      <ConfirmModal
        open={deleteOpen}
        title="Delete API Key"
        description="This action cannot be undone."
        onCancel={() =>
          setDeleteOpen(false)
        }
        onConfirm={() =>
          setDeleteOpen(false)
        }
      />
      <RotateKeyModal
  open={rotateOpen}
  onClose={() =>
    setRotateOpen(false)
  }
  onConfirm={() =>
    setRotateOpen(false)
  }
/>

      <AddFundsModal
        open={addFundsOpen}
        onClose={() =>
          setAddFundsOpen(false)
        }
      />

      <Toast
        show={toastOpen}
        message="API Key Copied"
      />

    </div>
  );
}