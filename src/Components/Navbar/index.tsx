"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger + close icons
import Image from "next/image";
import Logo from "../../../public/Royal logo wordmark_black.png";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    // { label: "Royal Dashboard", href: "/royal-dashboard" },
    { label: "View Royalties", href: "/view-royalities" },
    { label: "Withdraw funds", href: "/withdraw-funds" },
    { label: "Help", href: "/help" },
  ];

  const navMobileItems = [
    { label: "Home", href: "/" },
    { label: "Royal Dashboard", href: "/royal-dashboard" },
    { label: "View Royalties", href: "/view-royalities" },
    { label: "Withdraw funds", href: "/withdraw-funds" },
    { label: "Help", href: "/help" },
  ];

  return (
    <nav className="w-full sticky top-0 z-10 bg-secondary">
      {/* Desktop Navbar */}
      <div className="mx-auto sm:max-w-[90%] flex items-center justify-between px-4  py-2 md:py-1">
        {/* Left side links (desktop) */}
        <div className="hidden md:flex items-center gap-8 text-[20px] text-black">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 transition-colors ${
                  isActive ? "font-bold" : "font-semibold"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive
                      ? "bg-[#0000D0]" // active = blue dot
                      : "border border-black bg-transparent" // inactive = hollow dot
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Brand (always visible) */}
        <div className="font-bold text-black">
          <Link href={"/royal-dashboard"}>
            <Image src={Logo} alt="Logo" width={60} priority />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 px-4 pb-4 text-sm">
          {navMobileItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // close menu on click
                className={`flex items-center gap-2 transition-colors ${
                  isActive ? "text-black font-bold" : "text-black font-semibold"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive
                      ? "bg-[#0000D0]"
                      : "border border-black bg-transparent"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
