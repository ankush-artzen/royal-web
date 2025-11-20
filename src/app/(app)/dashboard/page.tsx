// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import { TokenPayload } from "@/lib/type";
// import DashboardClient from "@/Components/DashboardClient";

// export default async function RoyalDashboard() {
//   const cookieStore = await cookies();
//   const token =
//     cookieStore.get("auth_token")?.value ||
//     localStorage.getItem("auth_token") ||
//     null;
//   if (!token) redirect("/login");

//   let decoded: TokenPayload;
//   try {
//     decoded = jwtDecode<TokenPayload>(token);
//   } catch {
//     redirect("/login");
//   }

//   // Fetch user data from API
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${decoded.id}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) redirect("/login");

//   const { user } = await res.json();

//   // Pass user data to client
//    return <div className="max-w-[97%] mx-auto"> <DashboardClient user={user} /></div>;
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardClient from "@/Components/DashboardClient";

export default async function RoyalDashboard() {
  // Get session from NextAuth (SSR-safe)
  const session = await getServerSession(authOptions);

  // If not logged in → middleware should already catch, but double protection here is ok
  if (!session) redirect("/login");

  const user = session.user; // Comes from session callback

  return (
    <div className="max-w-[97%] mx-auto">
      <DashboardClient user={user} />
    </div>
  );
}
