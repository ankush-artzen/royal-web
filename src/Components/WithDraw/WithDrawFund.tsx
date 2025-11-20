// "use client";

// import React, { useMemo, useState } from "react";
// import { Play } from "lucide-react";
// import Header from "../Common/Header";
// import { calculatePlatformFee } from "@/utils/constant";

// export default function WithdrawFunds({
//   amount = "0.00",
//   withdrawAmount,
//   isCustomAmount,
//   handleAmountChange,
//   setIsCustomAmount,
//   handleUseAllFunds,
//   handleWithdraw,
//   handleBackToReports,
//   error,
// }: {
//   amount: string;
//   withdrawAmount: string;
//   isCustomAmount: boolean;
//   error: string;
//   handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   setIsCustomAmount: React.Dispatch<React.SetStateAction<boolean>>;
//   handleUseAllFunds: () => void;
//   handleWithdraw: () => void;
//   handleBackToReports: (page: string) => void;
// }) {
//   const [withdrawalType, setWithdrawalType] = useState("");

//   // usage anywhere in component

//   const baseValue =
//     isCustomAmount && amount.trim() !== "" ? amount : withdrawAmount;

//   const platformFee = useMemo(
//     () => calculatePlatformFee(baseValue),
//     [baseValue]
//   );
//   const finalWithdrawal = useMemo(() => {
//     const num = parseFloat(baseValue || "0");
//     return isNaN(num) || num <= 0 ? "0.00" : (num - platformFee).toFixed(2);
//   }, [baseValue, platformFee]);

//   return (
//     <div className="min-h-screen bg-primary flex items-center justify-start p-1 sm:p-4">
//       <div className="w-full lg:max-w-[90%] mx-auto">
//         <Header title="Withdraw Funds" />

//         <div className="text-secondary px-6 py-8 space-y-6">
//           <div className="text-4xl sm:text-5xl lg:text-[114px] lg:font-light">
//             <p>
//               Do you want to withdraw{" "}
//               <span className="font-bold">
//                 ${isCustomAmount ? amount || withdrawAmount : withdrawAmount}
//               </span>{" "}
//               from the Royal App and deposit the funds
//             </p>
//           </div>

//           {isCustomAmount && (
//             <div className="mt-4">
//               <div className="relative">
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
//                   $
//                 </span>
//                 <input
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={amount}
//                   onChange={handleAmountChange}
//                   placeholder="Custom Amount"
//                   className="w-full bg-secondary text-black text-2xl sm:text-3xl py-3 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error ? (
//                 <p className="text-red-300 mt-2 text-lg">{error}</p>
//               ) : (
//                 <div className="mt-4 space-y-1 text-lg">
//                   <p className="text-gray-200">
//                     Platform Fee (3%): -${platformFee}
//                   </p>
//                   <p className="text-secondary font-bold">
//                     Final Withdrawal: ${finalWithdrawal}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Info Text */}
//           <div className="text-2xl sm:text-2xl lg:text-[55px] font-light">
//             <p>
//               <strong>
//                 Funds will hit your bank account in 2-3 business days.
//               </strong>
//             </p>
//             <p className="leading-none mt-1">
//               Change your mind?
//               <br />
//               Click My Bank to edit your withdrawal
//             </p>
//           </div>

//           {/* Step 1: Choose Type */}
//           {!withdrawalType && (
//             <div className="flex flex-col sm:flex-row gap-4 mt-4">
//               <button
//                 onClick={() => setWithdrawalType("all")}
//                 className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
//               >
//                 Yes, Withdraw All Funds
//               </button>

//               <button
//                 onClick={() => {
//                   setWithdrawalType("custom");
//                   setIsCustomAmount(true);
//                 }}
//                 className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
//               >
//                 Withdraw a Custom Amount
//               </button>
//             </div>
//           )}

//           {/* Step 2: All Funds */}
//           {withdrawalType === "all" && (
//             <div className="mt-4 space-y-2 text-lg">
//               {!error && (
//                 <>
//                   <p className="text-gray-200">
//                     Platform Fee (3%): -${calculatePlatformFee(withdrawAmount)}
//                   </p>
//                   <p className="text-secondary font-bold">
//                     Final Withdrawal: $
//                     {(
//                       parseFloat(withdrawAmount) -
//                       calculatePlatformFee(withdrawAmount)
//                     ).toFixed(2)}
//                   </p>
//                 </>
//               )}
//               {error && <p className="text-red-300">{error}</p>}

//               <button
//                 onClick={handleWithdraw}
//                 className="px-10 py-3 mt-2 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
//               >
//                 Yes, Withdraw Funds
//               </button>
//             </div>
//           )}

//           {/* Step 3: Custom Amount */}
//           {isCustomAmount && withdrawalType === "custom" && (
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">
//               <button
//                 onClick={handleWithdraw}
//                 className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
//               >
//                 Yes, Withdraw ${finalWithdrawal}
//               </button>
//               <button
//                 onClick={() => {
//                   setWithdrawalType("");
//                   handleUseAllFunds();
//                 }}
//                 className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
//               >
//                 Go Back
//               </button>
//             </div>
//           )}

//           <button
//             onClick={() => handleBackToReports("report")}
//             className="flex items-center text-secondary hover:text-gray-200 transition-colors mt-6"
//           >
//             <Play fill="#FFFFFF" className="mr-2 rotate-180" />
//             <span className="text-sm lg:text-[18px]">
//               Back to royalty reports
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useMemo, useState } from "react";
import { Play } from "lucide-react";
import Header from "../Common/Header";
import { calculatePlatformFee } from "@/utils/constant";

export default function WithdrawFunds({
  amount = "0.00",
  withdrawAmount,
  isCustomAmount,
  handleAmountChange,
  setIsCustomAmount,
  handleUseAllFunds,
  handleWithdraw,
  handleBackToReports,
  error,
}: {
  amount: string;
  withdrawAmount: string;
  isCustomAmount: boolean;
  error: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsCustomAmount: React.Dispatch<React.SetStateAction<boolean>>;
  handleUseAllFunds: () => void;
  handleWithdraw: () => void;
  handleBackToReports: (page: string) => void;
}) {
  const [withdrawalType, setWithdrawalType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const onWithdrawClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    await handleWithdraw();
    setIsProcessing(false);
  };

  const baseValue =
    isCustomAmount && amount.trim() !== "" ? amount : withdrawAmount;

  const platformFee = useMemo(
    () => calculatePlatformFee(baseValue),
    [baseValue]
  );

  const finalWithdrawal = useMemo(() => {
    const num = parseFloat(baseValue || "0");
    return isNaN(num) || num <= 0 ? "0.00" : (num - platformFee).toFixed(2);
  }, [baseValue, platformFee]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-start p-1 sm:p-4">
      <div className="w-full lg:max-w-[90%] mx-auto">
        <Header title="Withdraw Funds" />

        <div className="text-secondary px-6 py-8 space-y-6">
          <div className="text-4xl sm:text-5xl lg:text-[114px] lg:font-light">
            <p>
              Do you want to withdraw{" "}
              <span className="font-bold">
                ${isCustomAmount ? amount || withdrawAmount : withdrawAmount}
              </span>{" "}
              from the Royal App and deposit the funds
            </p>
          </div>

          {isCustomAmount && (
            <div className="mt-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Custom Amount"
                  className="w-full bg-secondary text-black text-2xl sm:text-3xl py-3 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error ? (
                <p className="text-red-300 mt-2 text-lg">{error}</p>
              ) : (
                <div className="mt-4 space-y-1 text-lg">
                  <p className="text-gray-200">
                    Platform Fee (3%): -${platformFee}
                  </p>
                  <p className="text-secondary font-bold">
                    Final Withdrawal: ${finalWithdrawal}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="text-2xl sm:text-2xl lg:text-[55px] font-light">
            <p>
              <strong>
                Funds will hit your bank account in 2-3 business days.
              </strong>
            </p>
            <p className="leading-none mt-1">
              Change your mind?
              <br />
              Click My Bank to edit your withdrawal
            </p>
          </div>

          {!withdrawalType && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => setWithdrawalType("all")}
                className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
              >
                Yes, Withdraw All Funds
              </button>

              <button
                onClick={() => {
                  setWithdrawalType("custom");
                  setIsCustomAmount(true);
                }}
                className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
              >
                Withdraw a Custom Amount
              </button>
            </div>
          )}

          {withdrawalType === "all" && (
            <div className="mt-4 space-y-2 text-lg">
              {!error && (
                <>
                  <p className="text-gray-200">
                    Platform Fee (3%): -${calculatePlatformFee(withdrawAmount)}
                  </p>
                  <p className="text-secondary font-bold">
                    Final Withdrawal: $
                    {(
                      parseFloat(withdrawAmount) -
                      calculatePlatformFee(withdrawAmount)
                    ).toFixed(2)}
                  </p>
                </>
              )}
              {error && <p className="text-red-300">{error}</p>}

              <button
                onClick={onWithdrawClick}
                disabled={isProcessing}
                className="px-10 py-3 mt-2 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Yes, Withdraw Funds"}
              </button>
            </div>
          )}

          {isCustomAmount && withdrawalType === "custom" && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={onWithdrawClick}
                disabled={isProcessing}
                className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black disabled:opacity-50"
              >
                {isProcessing
                  ? "Processing..."
                  : `Yes, Withdraw $${amount}`}
              </button>
              <button
                onClick={() => {
                  setWithdrawalType("");
                  handleUseAllFunds();
                }}
                className="px-10 py-3 w-full sm:w-1/2 rounded-full text-md font-semibold bg-secondary text-black"
              >
                Go Back
              </button>
            </div>
          )}

          <button
            onClick={() => handleBackToReports("report")}
            className="flex items-center text-secondary hover:text-gray-200 transition-colors mt-6"
          >
            <Play fill="#FFFFFF" className="mr-2 rotate-180" />
            <span className="text-sm lg:text-[18px]">
              Back to royalty reports
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
