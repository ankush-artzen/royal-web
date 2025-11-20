// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import SignUpClient from "@/Components/Auth/SignUpClient";

// export default async function SignupPage() {
//    const cookieStore = await cookies();
//     const token = cookieStore.get("auth_token")?.value;
  
//     // If already logged in, redirect to dashboard
//     if (token) {
//       redirect("/");
//     }
  
//     // Otherwise render client login form
//     return <SignUpClient />;
// }

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpClient from "@/Components/Auth/SignUpClient";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/"); // already logged in

  return <SignUpClient />;
}
