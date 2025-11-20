"use client";

import { setUser } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "@/lib/type";
import Link from "next/link";
import ConfirmBox from "./Popup/ConfirmBox";
import Button from "./Common/Button";
import { useIsMobile } from "@/hooks/useIsMobile";

function DashboardClient({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
   const isMobile = useIsMobile();

  useEffect(() => {
    // Save user data into Redux
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-primary ">
      {/* Main Content */}
      <div className="max-w-6xl mx-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-[114px] font-bold text-secondary mb-10 sm:mb-8">
            Royal
          </h1>
          <p className="text-secondary text-2xl sm:text-xl lg:text-[55px]  lg:leading-[55px] leading-tight mb-8 sm:mb-12">
            Here is your Royal ID number. This unique code can be added to any
            product page with the Royal Shopify plugin. Once added, product
            information will automatically begin syncing to your Royal App
            account.
          </p>
        </div>

        {/* Royal User ID Card */}
        <div className=" flex flex-col sm:flex-row gap-2  mb-8 sm:mb-12">
          <div className="bg-secondary bg-opacity-90 backdrop-blur-sm rounded-4xl sm:rounded-2xl px-6 py-4 inline-block shadow-lg">
            <p className="text-gray-800 font-medium text-lg sm:text-xl">
              {user?.royalId ? `Royal User ID ${user?.royalId}` : "Loading..."}
            </p>
          </div>
          <Button title="Logout" variant="secondary" size="lg" fullWidth={isMobile} onClick={() => setOpen(true)}/>
        </div>

        {/* Instructions */}
        <div className="mb-8 sm:mb-12">
          <p className="text-secondary text-2xl sm:text-xl lg:text-[55px]  lg:leading-[55px] leading-tight mb-4">
            Check back once you&apos;ve uploaded the code to Shopify to start
            tracking your royalties.
            <br />
            You can always find your User ID on the home page under the &quot;My
            Account&quot; section
          </p>
        </div>
        <ConfirmBox isOpen={open} onClose={() => setOpen(false)} />
        {/* Footer Link */}
        <Link
          href="howitwork"
          className="block text-secondary  py-4 text-xl lg:text-[38px] text-center sm:text-left hover:underline transition"
        >
          How does Royal work?
        </Link>
      </div>
    </div>
  );
}

export default DashboardClient;
