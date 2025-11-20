// "use client";

// import { deleteCookie } from "cookies-next";
// import { useRouter } from "next/navigation";

// export const useAuth = () => {
//   const router = useRouter();

//   const logout = () => {
//     deleteCookie("auth_token");
//     // If you also store token in localStorage
//     localStorage.removeItem("auth_token");
//     router.push("/"); // redirect after logout
//   };

//   return { logout };
// };
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut({
      redirect: false, 
    });

    router.push("/login"); 
  };

  return { logout };
};
