"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "../Common/Input";
import RoundButton from "../Common/RoundButton";
import Image from "next/image";
import PhoneMockup from "../../../public/royal-iphone-mockup-v2.png";
import { Play } from "lucide-react";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your registered email address");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send reset link");
        return;
      }

      setSuccess("Password reset link sent! Please check your email.");
      setEmail("");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-10 flex-grow relative">
        {/* Left text section */}
        <div className="w-full text-left">
          <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
            Forgot
            <br /> your Royal password
          </p>

          <p className="text-4xl lg:text-[55px] lg:leading-[55px] font-semibold mb-8 max-w-4xl mx-auto lg:mx-0 leading-[40px]">
            Enter your registered email below, and we’ll send you a link to
            reset your password.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl">
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              isValid={!!email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <RoundButton loading={loading} onClick={handleReset} />
          </div>

          {error && <p className="text-red-400 mb-4">{error}</p>}
          {success && <p className="text-green-400 mb-4">{success}</p>}

          <div className="mb-3 mt-3 flex justify-between">
          <Link
            href="login"
            className="flex items-center text-secondary hover:text-gray-200 cursor-pointer transition-colors pb-1"
          >
            <Play
              fill="#FFFFFF"
              className="transition-transform duration-300 rotate-180 mr-2 w-4 h-4 sm:w-6 sm:h-6"
            />
            <span className="text-sm lg:text-[18px]">
              back to login
            </span>
            
          </Link>
          </div>

          <div className="text-base lg:text-2xl mt-3">
            <p>
              Need help? Read our{" "}
              <Link
                href={"/policies/privacy-policy"}
                className="underline hover:text-gray-300"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href={"/policies/conditions"}
                className="underline hover:text-gray-300"
              >
                Terms & Conditions
              </Link>
              .
            </p>
          </div>
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
