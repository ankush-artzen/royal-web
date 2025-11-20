// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import ResetPasswordClient from "@/Components/Auth/ResetPassword";

// export default async function LoginPage() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("auth_token")?.value;

//   // If already logged in, redirect to dashboard
//   if (token) {
//     redirect("/");
//   }

//   // Otherwise render client login form
//   return <ResetPasswordClient />;
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ResetPasswordClient from "@/Components/Auth/ResetPassword";

export default async function ResetPasswordPage() {
  const session = await getServerSession(authOptions);

  // If user is logged in → don't allow reset password page → go home
  if (session) redirect("/");

  return <ResetPasswordClient />;
}
