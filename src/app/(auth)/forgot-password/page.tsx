import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ForgotPasswordClient from "@/Components/Auth/ForgotPasswordClient";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // If already logged in, 
  if (token) {
    redirect("/");
  }

  // Otherwise render client login form
  return <ForgotPasswordClient />;
}
