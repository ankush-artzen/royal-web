// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import LoginClient from "@/Components/Auth/LoginClient";

// export default async function LoginPage() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("auth_token")?.value;

//   // If already logged in, redirect to dashboard
//   if (token) {
//     redirect("/");
//   }

//   // Otherwise render client login form
//   return <LoginClient />;
// }
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginClient from "@/Components/Auth/LoginClient";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/"); // already logged in

  return <LoginClient />;
}
