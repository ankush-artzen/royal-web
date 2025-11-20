"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Input from "../Common/Input";
import RoundButton from "../Common/RoundButton";
import Image from "next/image";
import PhoneMockup from "../../../public/royal-iphone-mockup-v2.png";
import { Play } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function ResetPasswordClient() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [checking, setChecking] = useState(true);

  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  // ✅ Validate token when page loads
  useEffect(() => {
    if (!token) {
      redirect("/forgot-password");
    }
    if (!token) {
      setError("Missing reset token");
      setChecking(true);
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch("/api/validate-reset-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();

        if (!res.ok || !data.valid) {
          setError(data.error || "Invalid or expired token");
          setIsValidToken(false);
        } else {
          setIsValidToken(true);
        }
      } catch {
        setError("Failed to verify token");
      } finally {
        setChecking(false);
      }
    };

    validateToken();
  }, [token]);

  const handleReset = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to reset password");
        return;
      }

      setSuccess("Password has been reset successfully!");
      setNewPassword("");
      setConfirmPassword("");

      // Optional: Redirect to login after success
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking token
  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-secondary">
        <p>Validating reset link...</p>
      </div>
    );
  }

  // If token invalid
  if (!isValidToken) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-secondary text-center px-6">
        <p className="text-2xl font-semibold mb-4 text-red-400">
          {error || "Invalid or expired link"}
        </p>
        <Link
          href="/forgot-password"
          className="text-lg underline hover:text-gray-300"
        >
          Go back to Forgot Password
        </Link>
      </div>
    );
  }

  // ✅ Only render the form if token is valid
  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-10 flex-grow relative">
        <div className="w-full text-left">
          <p className="text-5xl sm:text-8xl lg:text-[114px] font-bold mb-6">
            Reset
            <br /> your Royal password
          </p>

          <p className="text-4xl lg:text-[55px] lg:leading-[55px] font-semibold mb-8 max-w-4xl mx-auto lg:mx-0 leading-[40px]">
            Enter your new password below to reset your Royal account.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl">
            <Input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              isValid={!!newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              isValid={!!confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <RoundButton loading={loading} onClick={handleReset} />
          </div>

          {error && <p className="text-red-400 mb-4">{error}</p>}
          {success && <p className="text-green-400 mb-4">{success}</p>}

          <div className="mb-3 mt-3 flex justify-between">
            <Link
              href="/forgot-password"
              className="flex items-center text-secondary hover:text-gray-200 cursor-pointer transition-colors pb-1"
            >
              <Play
                fill="#FFFFFF"
                className="transition-transform duration-300 rotate-180 mr-2 w-4 h-4 sm:w-6 sm:h-6"
              />
              <span className="text-sm lg:text-[18px]">
                back to Forgot Password
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
