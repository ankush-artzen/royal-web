// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Input from "../Common/Input";
// import RoundButton from "../Common/RoundButton";
// import Image from "next/image";
// import PhoneMockup from "../../../public/royal-iphone-mockup-v2.png";
// import { ChangeEvent } from "react";

// export default function SignUpClient() {
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const router = useRouter();

//   // ✅ Validation helpers
//   const validateEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validatePhone = (phone: string) => /^\d{10}$/.test(phone); // 10 digit phone

//   const validatePassword = (password: string) =>
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//       password
//     );

//   const isEmailValid = validateEmail(email);
//   const isPhoneValid = validatePhone(phoneNumber);
//   const isPasswordValid = validatePassword(password);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   const handleSignup = async () => {
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     if (!isEmailValid) {
//       setError("Please enter a valid email address");
//       setLoading(false);
//       return;
//     }

//     if (!isPhoneValid) {
//       setError("Please enter a valid 10-digit phone number");
//       setLoading(false);
//       return;
//     }

//     if (!isPasswordValid) {
//       setError(
//         "Password must be at least 8 chars, include uppercase, lowercase, number, and special char"
//       );
//       setLoading(false);
//       return;
//     }
//     if (!acceptedTerms) {
//       setError("You must accept the Terms and Privacy Policy to sign up");
//       setLoading(false);
//       return;
//     }
//     try {
//       const res = await fetch("/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, phoneNumber, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Signup failed");
//         return;
//       }

//       setSuccess("Account created successfully! You can now sign in.");
//       setEmail("");
//       setPhoneNumber("");
//       setPassword("");

//       // Redirect to login after successful signup
//       localStorage.setItem("auth_token", data.token);

//       document.cookie = `auth_token=${data.token}; path=/; max-age=86400; Secure; SameSite=Strict`;

//       setTimeout(() => {
//         router.push("/");
//         window.location.reload();
//       }, 2000);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error(err.message);
//       }
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Enter key press to submit form
//   const handleKeyPress = (e: { key: string }) => {
//     if (e.key === "Enter") {
//       handleSignup();
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
//       <main className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-10 flex-grow relative">
//         <div className="w-full text-left ">
//           <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
//             Royal
//             <br /> is an app designed to help creatives see the upside of their
//             work
//           </p>
//           <p className="text-4xl sm:text-lg lg:text-[55px] lg:leading-[55px] font-semibold mb-8 max-w-4xl mx-auto lg:mx-0 leading-[40px]">
//             A platform to collect, track and get paid royalties for the products
//             you concept and design.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-4xl">
//             {/* Email input */}
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               isValid={!!email || isEmailValid}
//               onKeyPress={handleKeyPress}
//             />

//             {/* Phone input */}
//             <Input
//               type="tel"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               isValid={!!phoneNumber || isPhoneValid}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />

//             {/* Password input */}
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//               isValid={!!password || isPasswordValid}
//             />

//             {/* Arrow button */}
//             <RoundButton loading={loading} onClick={handleSignup} />
//           </div>
//           <div className="flex items-center gap-3 text-base lg:text-2xl mt-3">
//             <input
//               type="checkbox"
//               id="terms"
//               checked={acceptedTerms}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setAcceptedTerms(e.target.checked)
//               }
//               className="w-5 h-5 accent-secondary"
//             />
//             <label htmlFor="terms">
//               I agree to the{" "}
//               <Link
//                 href={"/terms-and-conditions"}
//                 className="underline hover:text-gray-300"
//               >
//                 Terms & Conditions
//               </Link>{" "}
//               and{" "}
//               <Link
//                 href={"/privacy-policy"}
//                 className="underline hover:text-gray-300"
//               >
//                 Privacy Policy
//               </Link>
//             </label>
//           </div>

//           {/* Error / Success Messages */}
//           {error && <p className="text-red-400 mb-3">{error}</p>}
//           {success && <p className="text-green-400 mb-3">{success}</p>}

//           {/* Footer links */}
//           <div className="text-xl lg:text-[38px] space-y-2 mt-6">
//             <Link href={"/login"}>
//               Already have a Royal account?{" "}
//               <span className="cursor-pointer underline">Sign in</span>
//             </Link>
//           </div>

//           {/* Link */}
//           <Link
//             href={"/howitwork"}
//             className="text-xl lg:text-[38px] cursor-pointer hover:underline mt-2 block"
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

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../Common/Input";
import RoundButton from "../Common/RoundButton";
import Image from "next/image";
import PhoneMockup from "../../../public/royal-iphone-mockup-v2.png";

export default function SignUpClient() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateEmail(email)) return setError("Invalid email format");
    if (!validatePhone(phoneNumber)) return setError("Phone must be 10 digits");
    if (!validatePassword(password))
      return setError(
        "Weak password: must include uppercase, lowercase, number & symbol"
      );
    if (!acceptedTerms) return setError("Accept the Terms & Privacy Policy");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phoneNumber, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Signup failed");

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-10 flex-grow relative">
        <div className="w-full text-left">
          <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
            Royal <br /> is an app designed to help creatives see the upside of
            their work
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-4xl">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <RoundButton loading={loading} onClick={handleSignup} />
          </div>

          <div className="flex items-center gap-3 text-base lg:text-2xl mt-3">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAcceptedTerms(e.target.checked)
              }
              className="w-5 h-5 accent-secondary"
            />
            <label>
              I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                className="underline hover:text-gray-300"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-gray-300"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {error && <p className="text-red-400 mb-3">{error}</p>}
          {success && <p className="text-green-400 mb-3">{success}</p>}

          <div className="text-xl lg:text-[38px] space-y-2 mt-6">
            <Link href="/login">
              Already have an account?{" "}
              <span className="underline">Sign in</span>
            </Link>
          </div>

          <Link
            href="/howitwork"
            className="text-xl lg:text-[38px] hover:underline cursor-pointer mt-2 block"
          >
            How does Royal work?
          </Link>
        </div>

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
