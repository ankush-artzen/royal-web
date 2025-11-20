// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { decodeToken } from "@/utils/decodeToken";

// export async function protectAPI() {
//   const cookiesStore = await cookies();
//   console.log(cookiesStore, "cokkkiees");
//   const token = cookiesStore.get("auth_token")?.value;

//   if (!token) {
//     return {
//       errorResponse: NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       ),
//     };
//   }

//   try {
//     // ✅ If you're using JWTs:
//     const decoded = decodeToken(token);
//     return { token, user: decoded };
//   } catch (err) {
//     console.error("Invalid token:", err);
//     return {
//       errorResponse: NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 401 }
//       ),
//     };
//   }
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function protectAPI() {
  const session = await getServerSession(authOptions);

  // ❌ no session → unauthorized
  if (!session) {
    return {
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  // session.user contains { id, email, royalId, phoneNumber }
  return {
    user: session.user
  };
}
