"use client";
import React from "react";
import { Minus } from "lucide-react";
import { RightPanelProps } from "@/lib/type";
import ErrorPopup from "../../Popup/ErrorPopup";

export default function RightPanel({
  bankItems,
  removeFromBank,
  subtotal,
  platformFees,
  finalAmount,
  showError,
  setShowError,
  setWithdrawAmount,
  handleSetCurrentPage,
}: RightPanelProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-full bg-secondary rounded-3xl p-6  flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Bank
          </h2>
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            $
            {subtotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="border-t-2 border-black pt-5 flex-1 overflow-y-auto">
          <div className="flex-1 overflow-y-auto space-y-3">
            {bankItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-gray-400"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromBank(item.id)}
                    className="p-1 hover:bg-gray-300 rounded transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-900" />
                  </button>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">
                    {item.name}
                  </span>
                </div>
                <span className="text-gray-900 font-medium text-sm sm:text-base">
                  {item.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 border-t-2 border-gray-900 pt-4 flex justify-between items-start relative">
          {/* Scroll text - mobile centered, desktop left */}
          <div
  className="hidden lg:block text-left text-black font-bold text-xl
             lg:text-xl absolute lg:static bottom-0 left-1/2 -translate-x-1/2 translate-y-full 
             lg:translate-x-0 lg:translate-y-0 lg:mr-auto"
>
  scroll to view more
</div>

          {/* Right Panel - amounts */}
          <div className="space-y-0 text-right font-medium ml-auto">
            {/* Amounts */}
            {/* Amounts */}
            {/* Amounts */}
            <div className="w-full grid grid-cols-2 gap-y-1 font-bold">
              <div className="text-left text-xl text-gray-900 font-bold">
                Total Amount:
              </div>
              <div className="text-right text-xl text-gray-900 font-bold">
                $
                {subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              <div className="text-left text-xl">Platform Fees (3%):</div>
              <div className="text-right text-xl ">
                -$
                {platformFees.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              <div className="text-left  text-xl text-gray-900 font-bold">
                Final Withdrawal:
              </div>
              <div className="text-right text-xl text-gray-900 font-bold">
                $
                {Math.max(0, finalAmount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            const rounded = Math.round(subtotal * 100) / 100;

            if (rounded < 50) {
              setShowError(true);
              return;
            }

            setWithdrawAmount(rounded.toFixed(2));
            handleSetCurrentPage("withdraw");
          }}
          className="w-full px-6 py-3 bg-secondary hover:bg-blue-700 text-black font-medium rounded-2xl transition-colors text-3xl shadow"
        >
          withdraw funds
        </button>

        <ErrorPopup
          isOpen={showError}
          onClose={() => setShowError(false)}
          message="You cannot withdraw balance less then 50$. Please check your balance."
        />
      </div>
    </div>
  );
}
