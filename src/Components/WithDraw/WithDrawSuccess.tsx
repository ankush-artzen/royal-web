import { Play } from "lucide-react";
import React from "react";
import Header from "../Common/Header";
import { ForWordButton } from "../Common/BackButton";

export default function WithDrawSuccess({
  withdrawAmount,
  getRemainingBalance,
  handleBackToReports,
  // getFinalWithdrawal, 
}: {
  withdrawAmount: string;
  getRemainingBalance: () => string;
  handleBackToReports: (page: string) => void;
  // getFinalWithdrawal: () => string; // new
}) {
  return (
    <div className="h-full sm:min-h-screen bg-primary flex items-center justify-center p-1 sm:p-4">
      <div className="w-[90%] mx-auto">
        {/* Success Header */}
        <Header title="Success!" className="mt-4" />

        {/* Success Content */}
        <div className="text-secondary px-3 sm:px-6 py-10 sm:py-8 space-y-6">
          <div className="text-4xl leading-tight sm:text-5xl lg:text-[114px] lg:font-light lg:leading-[100px]">
            You deposited{" "}
            <span className="font-bold">
              ${withdrawAmount}
            </span>
            <p>from the Royal App</p>
            <p>into your bank account.</p>
          </div>

          <div className="text-2xl sm:text-2xl lg:text-[55px] font-light lg:leading-[50px]">
            <p>You can expect the funds to hit your bank account in</p>
            <p>2-3 business days.</p>
          </div>

          {/* My Bank Info (mobile view) */}
          <div className="bg-stone-200 rounded-3xl p-6 text-start flex sm:hidden justify-between mt-5">
            <h1 className="text-2xl font-bold text-black">My Bank</h1>
            <p className="text-2xl font-bold text-black">
              ${getRemainingBalance()}
            </p>
          </div>

          {/* Back Buttons */}
          <div className="pt-4 flex w-full justify-between">
            <button
              onClick={() => handleBackToReports("report")}
              className="flex items-center text-secondary hover:text-gray-200 cursor-pointer transition-colors"
            >
              <Play
                fill="#FFFFFF"
                className="transition-transform duration-300 rotate-180"
              />
              <span className="text-sm ml-2 lg:text-[18px]">
                Back to royalty reports
              </span>
            </button>
            <div className="hidden lg:block">
              <ForWordButton
                title="Go to transaction reports"
                url="transaction-reports"
              />
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}
