"use client";

import React, { useState, useEffect } from "react";
import { ApiShopEntry, User } from "@/lib/type";
import WithDrawSuccess from "./WithDrawSuccess";
import WithdrawFunds from "./WithDrawFund";
import RoyaltyReport from "./RoyaltyReport";
import { MIN_WITHDRAWAL } from "@/utils/constant";

export default function WithdrawClient({
  initialUser,
  initialProducts,
  transactionAmount,
}: {
  initialUser: User | null;
  transactionAmount: string | number | null;
  initialProducts: ApiShopEntry[];
}) {
  const [platformFees, setPlatformFees] = useState(0);
  const [currentPage, setCurrentPage] = useState("report");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [error, setError] = useState("");
  const [royalId] = useState<string | null>(initialUser?.royalId || null);
  const [amount, setAmount] = useState("0");

  console.log("initial user:", transactionAmount);
  console.log("****initialWithDrawn****", amount, withdrawAmount);

  const handleWithdraw = async () => {
    // Validate amount
    const numAmount = parseFloat(withdrawAmount);
    const customAmount = parseFloat(amount || "0");

    console.log(
      "***isCustomAmount*****",
      isCustomAmount,
      numAmount,
      customAmount
    );
    console.log(
      "********",
      isCustomAmount,
      numAmount,
      withdrawAmount,
      amount,
      customAmount
    );

    if ((isCustomAmount && customAmount < MIN_WITHDRAWAL )|| (! isCustomAmount && numAmount < MIN_WITHDRAWAL)) {
      setError(`Minimum withdrawal is $${MIN_WITHDRAWAL}`);
      return;
    }

    if (isCustomAmount && customAmount > numAmount) {
      setError(
        `You cannot withdraw more than your available balance ($${numAmount.toFixed(
          2
        )})`
      );
      return;
    }

    if (!isCustomAmount && (!withdrawAmount || isNaN(numAmount))) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      console.log("royal id:", royalId);
      if (!royalId) return;
      // call API to create a withdraw request
      const res = await fetch("/api/withdraw-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designerId: royalId,
          amount: isCustomAmount ? customAmount : numAmount,
          currency: "USD",
          notes: "Withdrawal from dashboard",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Something went wrong");
        return;
      }

      const result = await res.json();
      console.log("✅ Withdrawal request created:", result);

      // Switch to success page after API success
      setCurrentPage("success");
    } catch (err) {
      console.error("❌ Error creating withdrawal:", err);
      setError("Failed to create withdrawal request");
    }
  };

  const handleAmountChange = (e: { target: { value: string } }) => {
    const value = e.target.value;

    // Allow only numbers and decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      const numValue = parseFloat(value || "0");
      const available = parseFloat(withdrawAmount || "0");

      if (numValue > available) {
        setError(
          `You cannot withdraw more than your available balance ($${available.toFixed(
            2
          )})`
        );
        setAmount(value);
        // setWithdrawAmount(value);
        return;
      }
      setAmount(value);
      // setWithdrawAmount(value);

      // Clear error when valid
      if (error) setError("");
    }
  };

  const handleBackToReports = (page: string) => {
    setCurrentPage(page);
  };

  const handleUseAllFunds = () => {
    setIsCustomAmount(false);
    // setWithdrawAmount(amount);
    setError("");
  };

  // Helper function to safely calculate remaining balance
  const getRemainingBalance = () => {
    const available = parseFloat(amount || "0");
    const withdrawn = parseFloat(withdrawAmount || "0");
    return (available - withdrawn).toFixed(2);
  };

  useEffect(() => {
    if (withdrawAmount) {
      setAmount(withdrawAmount);
      setPlatformFees(Number(withdrawAmount) * 0.03);
      setWithdrawAmount(parseFloat(withdrawAmount).toFixed(2));
    }
  }, [withdrawAmount]);

  useEffect(() => {
    if (currentPage === "success") {
      // setWithdrawAmount("");
      // setAmount("");
      setError("");
    }
    if (currentPage === "report") {
      setError("");
      setAmount("");
      setIsCustomAmount(false);
    }
  }, [currentPage]);

  if (currentPage === "success") {
    return (
      <WithDrawSuccess
        withdrawAmount={isCustomAmount ? amount : withdrawAmount}
        getRemainingBalance={getRemainingBalance}
        handleBackToReports={handleBackToReports}
      />
    );
  }

  if (currentPage === "withdraw") {
    console.log(platformFees, "*****************************");
    return (
      <WithdrawFunds
        amount={amount}
        error={error}
        withdrawAmount={withdrawAmount}
        isCustomAmount={isCustomAmount}
        handleAmountChange={handleAmountChange}
        setIsCustomAmount={setIsCustomAmount}
        handleWithdraw={handleWithdraw}
        handleBackToReports={handleBackToReports}
        handleUseAllFunds={handleUseAllFunds}
      />
    );
  }

  return (
    <RoyaltyReport
      handleSetCurrentPage={setCurrentPage}
      setWithdrawAmount={setWithdrawAmount}
      initialUser={initialUser}
      initialProducts={initialProducts}
      transactionAmount={transactionAmount}
    />
  );
}
