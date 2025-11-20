// import WithdrawClient from "@/Components/WithDraw";
// import type { TokenPayload } from "@/lib/type";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import React from "react";

// async function getUser() {
//   // Get cookies (works on the server)
//   const cookieStore = await cookies();
//   const token = cookieStore.get("auth_token")?.value || null;

//   // No token → return defaults
//   if (!token)
//     return {
//       user: null,
//       products: [],
//       transactionAmount: 0,
//       transactions: [],
//     };

//   // Decode token
//   let decoded: TokenPayload | null = null;
//   try {
//     decoded = jwtDecode<TokenPayload>(token);
//   } catch {
//     return {
//       user: null,
//       products: [],
//       transactionAmount: 0,
//       transactions: [],
//     };
//   }

//   // Fetch user details
//   const userRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${decoded.id}`,
//     { cache: "no-store" }
//   );
//   const { user } = await userRes.json();

//   // Fetch products by shop
//   const productsRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/product/royality?designerId=${user?.royalId}`
//   );
//   const { initialProducts, transactionAmount } = await productsRes.json();

//   console.log("Final transactionAmount:", transactionAmount);

//   return {
//     user,
//     initialProducts,
//     transactionAmount,
//   };
// }

// export default async function WithdrawFundPage() {
//   const { user, initialProducts, transactionAmount } = await getUser();

//   return (
//     <div className="max-w-[97%] mx-auto">
//       <WithdrawClient
//         initialUser={user}
//         initialProducts={initialProducts}
//         transactionAmount={transactionAmount}
//       />
//     </div>
//   );
// }
import WithdrawClient from "@/Components/WithDraw";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function WithdrawFundPage() {
  const session = await getServerSession(authOptions);

  // Must be logged in
  if (!session) redirect("/login");

  const userId = session.user.id;
  const royalId = session.user.royalId;

  // Fetch user
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${userId}`,
    { cache: "no-store" }
  );
  const userData = await userRes.json();

  // Fetch royalty report (your backend returns: { initialProducts, transactionAmount })
  const productsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/royality?designerId=${royalId}`,
    { cache: "no-store" }
  );
  const { initialProducts, transactionAmount } = await productsRes.json();

  return (
    <div className="max-w-[97%] mx-auto">
      <WithdrawClient
        initialUser={userData.user}
        initialProducts={initialProducts ?? []}   // 👈 ensures map never crashes
        transactionAmount={transactionAmount ?? 0}
      />
    </div>
  );
}
