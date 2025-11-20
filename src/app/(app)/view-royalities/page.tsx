// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";
// import ViewRoyaltyClient from "@/Components/ViewRoyaltyClient";
// import { TokenPayload } from "@/lib/type";

// async function getUserRoyaltyData() {
//   const cookieStore = await cookies();
//   const token =
//     cookieStore.get("auth_token")?.value ||
//     localStorage.getItem("auth_token") ||
//     null;
//   if (!token) return { user: null, myRoyalties: [] };

//   let decoded: TokenPayload | null = null;
//   try {
//     decoded = jwtDecode<TokenPayload>(token);
//   } catch {
//     return { user: null, myRoyalties: [] };
//   }

//   const userRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${decoded.id}`,
//     { cache: "no-store" }
//   );
//   const user = await userRes.json();

//   const productsRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/product?designerId=${user.user.royalId}`,
//     { cache: "no-store" }
//   );
//   const products = await productsRes.json();

//   return {
//     user: user.user,
//     myRoyalties: products,
//   };
// }

// export default async function RoyaltyPage() {
//   const { user, myRoyalties } = await getUserRoyaltyData();

//   return (
//     <div className="w-full lg:max-w-[90%]  mx-auto">
//       {" "}
//       <ViewRoyaltyClient initialUser={user} initialRoyalties={myRoyalties} />
//     </div>
//   );
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ViewRoyaltyClient from "@/Components/ViewRoyaltyClient";

export default async function RoyaltyPage() {
  const session = await getServerSession(authOptions);

  // No login → redirect
  if (!session) redirect("/login");

  const userId = session.user.id;
  const royalId = session.user.royalId;

  // fetch user details
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${userId}`,
    { cache: "no-store" }
  );
  const userData = await userRes.json();

  // fetch royalties/products
  const productsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product?designerId=${royalId}`,
    { cache: "no-store" }
  );
  const royaltyData = await productsRes.json();

  return (
    <div className="w-full lg:max-w-[90%] mx-auto">
      <ViewRoyaltyClient
        initialUser={userData.user}
        initialRoyalties={royaltyData}
      />
    </div>
  );
}
