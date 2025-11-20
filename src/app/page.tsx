// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import { TokenPayload } from "@/lib/type";
// import DashboardClient from "@/Components/DashboardClient";
// import HomeClient from "../Components/HomeClient";

// export default async function HomePage() {
//   const cookieStore = await cookies();
//   const token =
//     cookieStore.get("auth_token")?.value || null;

//   if (!token) return  <div className="max-w-[97%] mx-auto">  <HomeClient /></div>;

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
//   return <div className="max-w-[97%] mx-auto"> <DashboardClient user={user} /></div>;
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardClient from "@/Components/DashboardClient";
import HomeClient from "@/Components/HomeClient";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Not logged in → show public home
  if (!session) {
    return (
      <div className="max-w-[97%] mx-auto">
        <HomeClient />
      </div>
    );
  }

  const userId = session.user.id;

  // Fetch current user info
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/me?id=${userId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    // Means session exists but user lookup failed → sign-out
    return (
      <div className="max-w-[97%] mx-auto">
        <HomeClient />
      </div>
    );
  }

  const { user } = await res.json();

  return (
    <div className="max-w-[97%] mx-auto">
      <DashboardClient user={user} />
    </div>
  );
}
