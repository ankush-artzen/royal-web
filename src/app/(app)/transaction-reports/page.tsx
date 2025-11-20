// import React from "react";
// import { TokenPayload, WithdrawalRequest } from "@/lib/type";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import TransactionReportClient from "@/Components/TransactionReportClient";

// async function getData() {
//   const cookieStore = await cookies();
//   const token =
//     cookieStore.get("auth_token")?.value ||
//     (typeof localStorage !== "undefined"
//       ? localStorage.getItem("auth_token")
//       : null) ||
//     null;

//   if (!token) return { user: null, transactions: [], totalAmount: 0 };

//   let decoded: TokenPayload | null = null;
//   try {
//     decoded = jwtDecode<TokenPayload>(token);
//   } catch {
//     return { user: null, transactions: [], totalAmount: 0 };
//   }

//   const userRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${decoded.id}`,
//     { cache: "no-store" }
//   );
//   const { user } = await userRes.json();

//   const resData = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/withdraw-request?designerId=${user?.royalId}`
//   );

//   const transactions: WithdrawalRequest[] = await resData.json();

//   const totalAmount: number = transactions.reduce(
//     (acc: number, item: WithdrawalRequest) => acc + Number(item.totalAmount),
//     0
//   );

//   return {
//     user,
//     transactions,
//     totalAmount,
//   };
// }

// export default async function TransactionReportPage() {
//   const { transactions, totalAmount } = await getData();

//   return (
//     <div className="max-w-[90%] mx-auto">
//       <TransactionReportClient
//         transactions={transactions}
//         transactionAmount={totalAmount}
//       />
//     </div>
//   );
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TransactionReportClient from "@/Components/TransactionReportClient";
import { WithdrawalRequest } from "@/lib/type";

export default async function TransactionReportPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const royalId = session.user.royalId;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/withdraw-request?designerId=${royalId}`,
    { cache: "no-store" }
  );

  const transactions: WithdrawalRequest[] = await res.json();

  const totalAmount = transactions.reduce(
    (sum: number, item: WithdrawalRequest) => sum + Number(item.totalAmount || 0),
    0
  );

  return (
    <div className="max-w-[90%] mx-auto">
      <TransactionReportClient
        transactions={transactions}
        transactionAmount={totalAmount}
      />
    </div>
  );
}
