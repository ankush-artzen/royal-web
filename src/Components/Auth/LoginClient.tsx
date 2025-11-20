// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import Input from "../Common/Input";
// import RoundButton from "../Common/RoundButton";
// import Image from "next/image";
// import PhoneMockup from "../../../public/royal-iphone-mockup-v2.png";

// export default function LoginClient() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const isHiring = searchParams.get("role") === "hiring";


//   const handleLogin = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       console.log(data.token);
//       localStorage.setItem("auth_token", data.token);
//       if (!res.ok) {
//         setError(data.error || "Login failed");
//         return;
//       }

//       document.cookie = `auth_token=${data.token}; path=/; max-age=86400; Secure; SameSite=Strict`;
//       router.push("/");
//       window.location.reload();
//     } catch {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Enter key press to submit form
//   const handleKeyPress = (e: { key: string }) => {
//     if (e.key === "Enter") {
//       handleLogin();
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-primary  text-secondary flex flex-col">
//       <main className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-10 flex-grow relative">
//         {/* Left text section */}
//      {/* Left text section */}
// <div className="w-full text-left ">
//   {isHiring ? (
//     <>
//       <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
//         Royal 
//         <br /> is an app that helps you get top tier work with no up front cost
//       </p>

//       <p className="text-4xl lg:text-[55px] lg:leading-[55px] font-semibold mb-8 max-w-4xl mx-auto lg:mx-0 leading-[40px]">
//         A platform to collect, track and payout royalties to designers for their work.
//       </p>
//     </>
//   ) : (
//     <>
//       <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
//         Royal
//         <br /> is an app designed to help creatives see the upside of their work
//       </p>

//       <p className="text-4xl lg:text-[55px] lg:leading-[55px] font-semibold mb-8 max-w-4xl mx-auto lg:mx-0 leading-[40px]">
//         A platform to collect, track and get paid royalties for the products you concept and design.
//       </p>
//     </>
//   )}


//           <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl">
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               isValid={!!email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />

//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               isValid={!!password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />

//             <RoundButton loading={loading} onClick={handleLogin} />
//           </div>

//           {error && <p className="text-red-400 mb-4">{error}</p>}
//   <Link
//     href="/forgot-password"
//     className="text-lg text-blue-400 underline cursor-pointer mb-6 hover:text-blue-300"
//     onClick={() => setError("")}
//   >
//     Forgot password?
//   </Link>


//           <div className="text-base lg:text-2xl mt-3">
//   <p>
//     By logging in, you agree to the{" "}
//     <Link
//       href={"/terms-and-conditions"}
//       className="underline hover:text-gray-300"
//     >
//       Terms & Conditions
//     </Link>{" "}
//     and{" "}
//     <Link
//       href={"/privacy-policy"}
//       className="underline hover:text-gray-300"
//     >
//       Privacy Policy
//     </Link>
//     .
//   </p>
// </div>


//           <div className="text-xl lg:text-[38px] space-y-2 mt-6">
//             <Link href={"/signup"}>
//               Don&apos;t have a Royal account?{" "}
//               <span className="cursor-pointer underline">Sign up</span>
//             </Link>
//           </div>

//           <Link
//             href={"/howitwork"}
//             className="text-xl lg:text-[38px] hover:underline cursor-pointer mt-2 block"
//           >
//             How does Royal work?
//           </Link>
//         </div>

//         {/* Right phone image */}
//         <div className="hidden lg:flex relative right-15 ">
//           <div className="">
//             <Image
//               src={PhoneMockup}
//               alt="Phone Mockup"
//               width={650}
//               className="rounded-xl "
//               priority
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Input from "../Common/Input";
import RoundButton from "../Common/RoundButton";
import PhoneMockup from "../../../public/royal-iphone-mockup-v2.png";
import { signIn, useSession } from "next-auth/react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHiring = searchParams.get("role") === "hiring";
  const { update } = useSession(); 

  // const handleLogin = async () => {
  //   setLoading(true);
  //   setError("");

  //   const result = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false, // we redirect manually
  //   });

  //   if (result?.error) {
  //     setError("Invalid email or password");
  //     setLoading(false);
  //     return;
  //   }

  //   // Login success → Navigate to homepage
  //   router.push("/");
  // };
  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",  // <-- server handles redirect
    });
  
    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-10 flex-grow relative">
        {/* Left text section */}
        <div className="w-full text-left">
          {isHiring ? (
            <>
              <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
                Royal
                <br /> is an app that helps you get top tier work with no up front cost
              </p>

              <p className="text-4xl lg:text-[55px] lg:leading-[55px] font-semibold mb-8 max-w-4xl mx-auto lg:mx-0 leading-[40px]">
                A platform to collect, track and payout royalties to designers for their work.
              </p>
            </>
          ) : (
            <>
              <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
                Royal
                <br /> is an app designed to help creatives see the upside of their work
              </p>

              <p className="text-4xl lg:text-[55px] lg:leading-[55px] font-semibold mb-8 max-w-4xl mx-auto lg:mx-0 leading-[40px]">
                A platform to collect, track and get paid royalties for the products you concept and design.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              isValid={!!email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              isValid={!!password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <RoundButton loading={loading} onClick={handleLogin} />
          </div>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          <Link
            href="/forgot-password"
            className="text-lg text-blue-400 underline cursor-pointer mb-6 hover:text-blue-300"
            onClick={() => setError("")}
          >
            Forgot password?
          </Link>

          <div className="text-base lg:text-2xl mt-3">
            <p>
              By logging in, you agree to the{" "}
              <Link href="/terms-and-conditions" className="underline hover:text-gray-300">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline hover:text-gray-300">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="text-xl lg:text-[38px] space-y-2 mt-6">
            <Link href="/signup">
              Don&apos;t have a Royal account?{" "}
              <span className="cursor-pointer underline">Sign up</span>
            </Link>
          </div>

          <Link
            href="/howitwork"
            className="text-xl lg:text-[38px] hover:underline cursor-pointer mt-2 block"
          >
            How does Royal work?
          </Link>
        </div>

        {/* Right phone image */}
        <div className="hidden lg:flex relative right-15">
          <Image
            src={PhoneMockup}
            alt="Phone Mockup"
            width={650}
            className="rounded-xl"
            priority
          />
        </div>
      </main>
    </div>
  );
}
