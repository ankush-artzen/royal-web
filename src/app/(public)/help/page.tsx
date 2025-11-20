"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../../../../public/Royal logo wordmark_white.png";
import Image from "next/image";

export default function HelpClient() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary text-secondary flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-center sm:justify-start">
        <Link href={"/royal-dashboard"}>
          <Image src={Logo} alt="Logo" width={180} priority />
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="w-full ">
          <button
            onClick={() => setOpen(!open)}
            className={`w-full block text-center border-t lg:text-[31px] border-white text-lg hover:bg-blue-500 transition ${
              open ? "py-0" : "py-4"
            }`}
          >
            How does Royal work?
          </button>

          {open && (
            <div className="bg-primary mb-8 p-0">
              <div className="flex justify-center gap-14">
                <Link
                  href="/howitwork?role=designer"
                  className="text-center lg:text-[28px] text-white hover:underline"
                  onClick={() => setOpen(false)}
                >
                  I&apos;m a designer
                </Link>

                <Link
                  href="/howitwork?role=hiring"
                  className="text-center lg:text-[28px] text-white hover:underline"
                  onClick={() => setOpen(false)}
                >
                  I hire designers
                </Link>
              </div>
            </div>
          )}

          <Link
            href="faq"
            className="block text-center py-4 border-t lg:text-[31px] border-white text-lg hover:bg-blue-500 transition"
          >
            FAQ
          </Link>
          <Link
            href="contact-us"
            className="block text-center py-4 border-t border-b lg:text-[31px] border-white text-lg hover:bg-blue-500 transition"
          >
            Contact Us
          </Link>
        </div>
      </main>
    </div>
  );
}
