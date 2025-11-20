import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    royalId: string;
    phoneNumber: string;

  }
  interface Session {
    user: {
      id: string;
      email: string;
      royalId: string;
      phoneNumber: string;

    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    royalId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    royalId: string;
    phoneNumber: string;
  }
}
