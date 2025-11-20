import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function RoyalInfoPage() {
  return (
    <main className="min-h-screen bg-primary flex flex-col items-center justify-center text-white relative">
      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center mt-16 gap-20">
        {/* Dual columns: responsive layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-4xl gap-10 mb-10">
          {/* Left text */}
          <div className="text-center sm:text-right sm:mr-8 mb-4 sm:mb-0">
            <p className="text-2xl lg:text-[38px] font-normal whitespace-nowrap text-secondary">
              I’m a designer.
            </p>
            <Link
              href="howitwork?role=designer"
              className="block text-center font-light lg:text-[25px] text-lg hover:bg-blue-500 transition"
            >
              How does Royal work?
            </Link>
          </div>

          {/* Logo */}
          <Image
            src="/Royal logo icon_creme.png"
            alt="Royal logo"
            width={210}
            height={260}
            priority
          />
          {/* Right text */}
          <div className="text-center sm:text-left sm:ml-8 mt-4 sm:mt-0">
            <p className="text-2xl lg:text-[38px] font-normal whitespace-nowrap text-secondary">
              I hire designers.
            </p>
            <Link
              href="howitwork?role=hiring"
              className="block text-center font-light lg:text-[25px] text-lg hover:bg-blue-500 transition"
            >
              How does Royal work?
            </Link>
          </div>
        </div>

        {/* Enter button */}
        <button className="bg-secondary text-primary font-semibold px-8 py-3 rounded-full hover:opacity-90 transition">
          Enter
        </button>
      </div>
    </main>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function SelectRole() {
//   const [role, setRole] = useState<"designer" | "hiring" | null>(null);

//   return (
//     <main className="min-h-screen bg-primary flex flex-col items-center justify-center text-white relative">
//       <div className="flex flex-col items-center justify-center flex-grow text-center mt-16 gap-20">
//         {/* Dual options */}
//         <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-4xl gap-10 mb-10">
//           {/* Left side */}
//           {/* <div
//             onClick={() => setRole("designer")}
//             className={`text-center sm:text-right sm:mr-8 cursor-pointer p-4 rounded-xl transition 
//               ${role === "designer" ? "bg-secondary text-primary" : ""}`}
//           > */}
//           <div
//             onClick={() => setRole("designer")}
//             className={`text-center sm:text-right sm:mr-8 mb-4 sm:mb-0 ${
//               role === "designer"
//                 ? "bg-secondary text-primary rounded-xl transition p-2"
//                 : ""
//             }`}
//           >
//             <p className="text-2xl lg:text-[38px] font-normal whitespace-nowrap">
//               I’m a designer.
//             </p>
//             <span className="block font-light lg:text-[25px] text-lg underline">
//               How does Royal work?
//             </span>
//           </div>

//           {/* Logo */}
//           <Image
//             src="/Royal logo icon_creme.png"
//             alt="Royal logo"
//             width={210}
//             height={260}
//             priority
//           />

//           {/* Right side */}
//           <div
//             onClick={() => setRole("hiring")}
//             className={`text-center sm:text-left sm:ml-8 cursor-pointer p-2 rounded-xl transition 
//               ${role === "hiring" ? "bg-secondary text-primary" : ""}`}
//           >
//             <p className="text-2xl lg:text-[38px] font-normal whitespace-nowrap">
//               I hire designers.
//             </p>
//             <span className="block font-light lg:text-[25px] text-lg underline">
//               How does Royal work?
//             </span>
//           </div>
//         </div>

//         {/* Enter Button */}
//         <Link
//           href={role ? `?role=${role}` : "#"}
//           className={`px-8 py-3 rounded-full font-semibold transition
//             ${
//               role
//                 ? "bg-secondary text-primary hover:opacity-90"
//                 : "bg-gray-500 cursor-not-allowed"
//             }
//           `}
//         >
//           Enter
//         </Link>
//       </div>
//     </main>
//   );
// }
