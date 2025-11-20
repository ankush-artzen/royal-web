// import { WithdrawalRequest } from "@/lib/type";
// import React from "react";
// import Header from "./Common/Header";
// import { Play } from "lucide-react";
// import Link from "next/link";
// import moment from "moment";

// interface ClientProps {
//   transactions: WithdrawalRequest[];
//   transactionAmount: number;
// }

// export default function TransactionReportClient({
//   transactions,
//   transactionAmount,
// }: ClientProps) {
//   // Sort by requestedAt descending - latest first
//   const sortedTransactions = [...transactions].sort(
//     (a, b) =>
//       new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
//   );
//   return (
//     <div className="min-h-screen bg-primary text-secondary mb-10 px-1 sm:px-6">
//       <div className="h-full px-2 sm:px-6 lg:px-8 pt-2 pb-0 mx-auto">
//         {/* Header */}
//         <Header title="Transaction Report" className="mt-4 sm:mt-6" />
//         <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4"></div>
//         {/* Back Button */}
//         <div className="mb-3 mt-3 flex justify-between">
//           <Link
//             href="withdraw-funds"
//             className="flex items-center text-secondary hover:text-gray-200 cursor-pointer transition-colors pb-1"
//           >
//             <Play
//               fill="#FFFFFF"
//               className="transition-transform duration-300 rotate-180 mr-2 w-4 h-4 sm:w-6 sm:h-6"
//             />
//             <span className="text-sm lg:text-[18px]">
//               back to withdraw funds
//             </span>
//           </Link>
//           <div className="text-sm lg:text-[18px]">
//              Progress Amount: 
//              ${sortedTransactions
//               .filter((t) => t.status === "PENDING")
//               .reduce((sum, t) => sum + (t.totalAmount ?? 0), 0)
//               .toFixed(2)}{" "}
//           </div>
//         </div>

//         <div className="grid sm:grid-cols-12 gap-4 border-b-2 border-white mb-4"></div>

//         {/* Desktop Table Header - Hidden on mobile */}
//         <div className="hidden sm:grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4">
//           <div className="col-span-2 flex flex-col">
//             <button className="flex items-center gap-2 text-2xl lg:text-[55px] font-semibold mr-auto">
//               Amount
//             </button>
//           </div>
//           <div className="col-span-3 flex flex-col">
//             <button className="flex items-center gap-2 text-2xl lg:text-[55px] font-semibold ml-auto">
//               Deposit
//             </button>
//           </div>
//           <div className="col-span-2 flex flex-col">
//             <button className="flex items-center gap-2 text-2xl lg:text-[55px] font-semibold ml-auto">
//               Fees
//             </button>
//           </div>
//           <div className="col-span-2 flex flex-col">
//             <button className="flex items-center gap-2 text-Md lg:text-[55px] font-semibold">
//               Status
//             </button>
//           </div>
//           <div className="col-span-3 flex flex-col text-left">
//             <button className="flex items-center gap-2 text-2xl lg:text-[55px] font-semibold ml-auto">
//               Date
//             </button>
//           </div>
//         </div>

//         <div className="hidden sm:grid grid-cols-12 gap-4 py-4 border-b-2 border-white"></div>

//         {/* Mobile Card View */}
//         <div className="sm:hidden space-y-4 max-h-96 overflow-y-auto">
//           {sortedTransactions.map((item, index) => (
//             <div
//               key={`${item.totalAmount}-${index}`}
//               className="bg-white/5 rounded-lg p-4 border border-white/20 hover:bg-white/10 transition-colors"
//             >
//               {/* Top Row - Amount and Status */}
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex flex-col">
//                   <span className="text-xs text-gray-400">Amount</span>
//                   <span className="text-lg font-semibold">
//                     ${item.totalAmount.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className="text-xs text-gray-400">Status</span>
//                   <span
//                     className={`text-sm px-2 py-1 rounded-full ${
//                       item.status === "APPROVED"
//                         ? "bg-green-500/20 text-green-300"
//                         : item.status === "PENDING"
//                         ? "bg-yellow-500/20 text-yellow-300"
//                         : item.status === "REJECTED"
//                         ? "bg-red-500/20 text-red-300"
//                         : "bg-blue-500/20 text-blue-300"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </div>
//               </div>

//               {/* Middle Row - Deposit and Fees */}
//               <div className="flex justify-between items-center mb-3">
//                 <div className="flex flex-col">
//                   <span className="text-xs text-gray-400">Deposit</span>
//                   <span className="text-base">${item.depositAmount}</span>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className="text-xs text-gray-400">Fees</span>
//                   <span className="text-base">${item.fees}</span>
//                 </div>
//               </div>

//               {/* Bottom Row - Date */}
//               <div className="flex justify-between items-center pt-2 border-t border-white/20">
//                 <span className="text-xs text-gray-400">Date</span>
//                 <div className="text-right">
//                   <div className="text-sm">
//                     {moment(item.requestedAt).local().format("ll")}
//                   </div>
//                   <div className="text-xs text-gray-400">
//                     {moment(item.requestedAt).local().format("LT")}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Desktop Table View */}
//         <div className="hidden sm:block max-h-96 overflow-y-auto">
//           {sortedTransactions.map((item, index) => (
//             <div
//               key={`${item.totalAmount}-${index}`}
//               className="grid grid-cols-12 gap-4 py-3 border-b border-white cursor-pointer lg:text-[31px] font-light hover:bg-white/10 transition-colors"
//             >
//               <span className="col-span-2 pl-4">
//                 <span>${item.totalAmount.toFixed(2)}</span>
//               </span>
//               <span className="col-span-3 pl-5 text-center">
//                 <span>${item.depositAmount}</span>
//               </span>
//               <span className="col-span-2 pl-5 text-center">
//                 <span>${item.fees}</span>
//               </span>
//               <span className="col-span-2 pl-5">
//                 <span
//                   className={`px-2 py-1 rounded-full ${
//                     item.status === "APPROVED"
//                       ? "bg-green-500/20 text-green-300"
//                       : item.status === "PENDING"
//                       ? "bg-yellow-500/20 text-yellow-300"
//                       : item.status === "REJECTED"
//                       ? "bg-red-500/20 text-red-300"
//                       : "bg-blue-500/20 text-blue-300"
//                   }`}
//                 >
//                   {item.status}
//                 </span>
//               </span>
//               <span className="col-span-3 text-right pr-4">
//                 {moment(item.requestedAt).local().format("ll")}{" "}
//                 <span className="text-sm">
//                   {moment(item.requestedAt).local().format("LT")}
//                 </span>
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {transactions.length === 0 && (
//           <div className="text-center py-12 text-gray-400">
//             <div className="text-lg mb-2">No transactions found</div>
//             <div className="text-sm">
//               Your transaction history will appear here
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { WithdrawalRequest } from "@/lib/type";
import React from "react";
import Header from "./Common/Header";
import { Play } from "lucide-react";
import Link from "next/link";
import moment from "moment";

interface ClientProps {
  transactions: WithdrawalRequest[];
  transactionAmount: number;
}

export default function TransactionReportClient({
  transactions,
  transactionAmount,
}: ClientProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-primary text-secondary mb-10 px-1 sm:px-6">
      <div className="h-full px-2 sm:px-6 lg:px-8 pt-2 pb-0 mx-auto max-w-[1920px] 2xl:max-w-[2200px]">

        <Header title="Transaction Report" className="mt-4 sm:mt-6" />

        <div className="grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-4"></div>

        {/* Back Button */}
        <div className="mb-3 mt-3 flex justify-between">
          <Link
            href="withdraw-funds"
            className="flex items-center text-secondary hover:text-gray-200 cursor-pointer transition-colors pb-1"
          >
            <Play
              fill="#FFFFFF"
              className="transition-transform duration-300 rotate-180 mr-2 w-4 h-4 sm:w-6 sm:h-6"
            />
            <span className="text-sm lg:text-[18px]">back to withdraw funds</span>
          </Link>

          <div className="text-sm lg:text-[18px]">
            Progress Amount: $
            {sortedTransactions
              .filter((t) => t.status === "PENDING")
              .reduce((sum, t) => sum + (t.totalAmount ?? 0), 0)
              .toFixed(2)}
          </div>
        </div>

        <div className="grid sm:grid-cols-12 gap-4 border-b-2 border-white mb-4"></div>

        {/* MOBILE VIEW  */}
        <div className="sm:hidden space-y-4 max-h-96 overflow-y-auto">
          {sortedTransactions.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-4 border border-white/20 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Amount</span>
                  <span className="text-lg font-semibold">${item.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">Status</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      item.status === "APPROVED"
                        ? "bg-green-500/20 text-green-300"
                        : item.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : item.status === "REJECTED"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Deposit</span>
                  <span className="text-base">${item.depositAmount}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">Fees</span>
                  <span className="text-base">${item.fees}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/20">
                <span className="text-xs text-gray-400">Date</span>
                <div className="text-right">
                  <div className="text-sm">{moment(item.requestedAt).local().format("ll")}</div>
                  <div className="text-xs text-gray-400">{moment(item.requestedAt).local().format("LT")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*  DESKTOP VIEW  */}

        {/* HEADER*/}
        <div className="hidden sm:grid grid-cols-12 gap-4 py-4 border-b-2 border-white mb-1">
          <div className="col-span-2 flex flex-col">
            <span className="text-xl lg:text-[38px] xl:text-[48px] 2xl:text-[69px] font-semibold mr-auto">Amount</span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-xl lg:text-[38px] xl:text-[48px] 2xl:text-[69px] font-semibold ml-auto">Deposit</span>
          </div>
          <div className="col-span-2 flex flex-col">
            <span className="text-xl lg:text-[38px] xl:text-[48px] 2xl:text-[69px]
 font-semibold ml-auto">Fees</span>
          </div>
          <div className="col-span-2 flex flex-col">
            <span className="text-xl lg:text-[38px] xl:text-[48px] 2xl:text-[69px]
 font-semibold ml-auto">Status</span>
          </div>
          <div className="col-span-3 flex flex-col ">
            <span className="text-xl text-center lg:text-[38px] xl:text-[48px] 2xl:text-[69px]
font-semibold ml-auto">Date</span>
          </div>
        </div>

        {/* ROWS  */}
        <div className="hidden sm:block max-h-96 overflow-y-auto">
          {sortedTransactions.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 py-3 border-b border-white cursor-pointer lg:text-[31px] font-light hover:bg-white/10 transition-colors"
            >
              <span className="col-span-2 pl-10 text-center">${item.totalAmount.toFixed(2)}</span>
              <span className="col-span-3 pl-10 text-center">${item.depositAmount}</span>
              <span className="col-span-2 pl-22 text-center">${item.fees}</span>
              <span className="col-span-2 pl-10 text-center">
                <span
                  className={`px-2 py-1 rounded-full ${
                    item.status === "APPROVED"
                      ? "bg-green-500/20 text-green-300"
                      : item.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : item.status === "REJECTED"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {item.status}
                </span>
              </span>
              <span className="col-span-3 text-right pr-4">
                {moment(item.requestedAt).local().format("ll")}{" "}
                <span className="text-sm">{moment(item.requestedAt).local().format("LT")}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-lg mb-2">No transactions found</div>
            <div className="text-sm">Your transaction history will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
}

