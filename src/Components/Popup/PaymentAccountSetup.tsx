"use client";

import React, { useState } from "react";
import Card from "../Common/Card";
import Button from "../Common/Button";
import { DesignerPaymentAccount } from "@/lib/type";
import { toast } from "react-toastify";
import CustomToast from "../Common/CustomToast";
import { Copy } from "lucide-react";

export default function PaymentAccountSetup({
  isOpen,
  onClose,
  email,
  royalId,
  account,
}: {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  royalId: string;
  account?: DesignerPaymentAccount | null;
}) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  async function createUpdateWorker(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = account
        ? await fetch("/api/user/accounts", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accountId: account?.accountId,
              email,
            }),
          })
        : await fetch("/api/user/accounts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              royalId,
              email,
              country: "US",
              currency: "usd",
            }),
          });
      if (!res.ok) {
        toast(<CustomToast message="Something went wrong" type="error" />);
      }
      const data = await res.json();

      if (data.payouts_enabled) {
        toast(
          <CustomToast
            message="Payouts are enabled for your account!"
            type="success"
          />
        );
        onClose();
        return;
      }

      if (data.onboardingUrl) {
        window.open(data.onboardingUrl, "_blank");
        onClose();
      } else {
        toast(<CustomToast message="Something went wrong" type="error" />);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Card isOpen={isOpen} title="Payment Account Setup" onClose={onClose}>
        {account ? (
          <div className="space-y-4">
            {/* Current Email */}
            <div className="flex items-baseline gap-3 mb-1 ml-4 sm:ml-0">
              <label className="text-lg font-normal text-black sm:w-40">
                Email
              </label>
              <span className="text-lg text-black font-bold">{email}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-1 ml-4  sm:gap-3 mb-1 ml-2 sm:ml-0">
              <label className="text-lg font-normal text-black sm:w-40 ">
                Payout
              </label>
              <span className="text-lg text-black font-bold ">
                {account?.payoutsEnabled ? "Enabled" : "Not Enable"}
              </span>
            </div>
            <div className="p-3 bg-gray-200 mt-4 w-fit flex gap-2 rounded-md ml-2 sm:ml-0">
              <label className="text-lg hidden sm:inline font-bold text-black">Id:</label>

              <span className="text-lg text-black font-normal">
                {account?.accountId || "N/A"}
              </span>

              {account?.accountId && (
                <button
                  onClick={() => copyToClipboard(account?.accountId)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              )}
              {copied && (
                <span className="text-sm text-primary font-medium">
                  Copied!
                </span>
              )}
            </div>

            {/* <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 ml-2 sm:ml-4">
              <label className="text-base sm:text-lg font-normal text-black min-w-[110px] sm:w-40">
                Account Id
              </label>
              <span className="text-base sm:text-lg text-black font-bold break-all">
                {account?.accountId || "N/A"}
              </span>
            </div> */}

            {!account?.payoutsEnabled && (
              <div className="mt-8 flex justify-end">
                <Button
                  title={account ? "Update" : "Create & Onboard"}
                  variant="primary"
                  size="md"
                  onClick={() =>
                    createUpdateWorker({
                      preventDefault: () => {},
                    } as React.FormEvent)
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Email */}
            <div className="flex items-baseline gap-3 mb-1 ml-4">
              <label className="text-lg font-normal text-black w-40">
                Current Email
              </label>
              <span className="text-lg text-black font-bold">{email}</span>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                title="Create & Onboard"
                variant="primary"
                size="md"
                onClick={() =>
                  createUpdateWorker({
                    preventDefault: () => {},
                  } as React.FormEvent)
                }
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
