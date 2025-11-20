"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import PhoneMockup from "../../public/royal-logo-preview.png";
import Link from "next/link";
import React, { useState } from "react";

function HomeClientDesigner() {
  return (
    <div className=" w-full min-h-screen bg-primary text-secondary flex flex-col">
      {/* Main content */}
      <main className=" w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-2 flex-grow relative">
        {/* Left text section */}
        <div className="w-full text-left ">
          {/* <p className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 "> */}
          <p className="text-6xl sm:text-[114px] font-bold  mb-6 ">
            Royal
            <br />
            is an app designed to help creatives see the upside of their work
          </p>
          <p className="text-4xl lg:text-[55px]  lg:leading-[55px] font-semibold mb-8 mx-auto max-w-4xl lg:mx-0 leading-[40px]">
            A platform to collect, track and get paid royalties for the products
            you concept and design.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-6 mb-10">
            <>
              <Link
                href={"/signup"}
                className="w-full flex h-16 lg:max-w-[203px] items-center justify-start gap-3 rounded-[20px] bg-[#DEDECF] px-6 font-bold text-3xl  text-[#111111] transition hover:brightness-95 active:translate-y-[1px]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#0000D0]" />
                Sign Up
              </Link>

              <Link
                href={"/login"}
                className="w-full flex h-16 lg:max-w-[203px] items-center justify-start gap-3 rounded-[20px] bg-[#DEDECF] px-6 font-bold text-3xl text-[#111111] transition hover:brightness-95 active:translate-y-[1px]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#0000D0]" />
                Sign In
              </Link>
            </>
            {/* )} */}
          </div>

          {/* Link */}
          <Link
            href={"/howitwork?role=designer"}
            className="text-xl lg:text-[38px] hover:underline cursor-pointer"
          >
            How does Royal work?
          </Link>
        </div>

        {/* Right phone image */}
        <div className="hidden lg:flex relative right-15 ">
          <div className="">
            <Image
              src={PhoneMockup}
              alt="Phone Mockup"
              width={650}
              className="rounded-xl "
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function HomeClientHireing() {
  return (
    <div className=" w-full min-h-screen bg-primary text-secondary flex flex-col">
      {/* Main content */}
      <main className=" w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-2 flex-grow relative">
        {/* Left text section */}
        <div className="w-full text-left ">
          {/* <p className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 "> */}
          <p className="text-6xl sm:text-[114px] font-bold  mb-6 ">
            Royal
            <br />
            is an app that helps you get top tier work with no up front cost
          </p>
          <p className="text-4xl lg:text-[55px]  lg:leading-[55px] font-semibold mb-8 mx-auto max-w-4xl lg:mx-0 leading-[40px]">
            A platform to collect, track and pay out royalties to designers for
            their work.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-6 mb-10">
            <>
              <Link
                href={"/signup"}
                className="w-full flex h-16 lg:max-w-[203px] items-center justify-start gap-3 rounded-[20px] bg-[#DEDECF] px-6 font-bold text-3xl  text-[#111111] transition hover:brightness-95 active:translate-y-[1px]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#0000D0]" />
                Sign Up
              </Link>

              <Link
                href={"/login?role=hiring"}
                className="w-full flex h-16 lg:max-w-[203px] items-center justify-start gap-3 rounded-[20px] bg-[#DEDECF] px-6 font-bold text-3xl text-[#111111] transition hover:brightness-95 active:translate-y-[1px]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#0000D0]" />
                Sign In
              </Link>
            </>
            {/* )} */}
          </div>

          {/* Link */}
          <Link
            href={"/howitwork?role=hiring"}
            className="text-xl lg:text-[38px] hover:underline cursor-pointer"
          >
            How does Royal work?
          </Link>
        </div>

        {/* Right phone image */}
        <div className="hidden lg:flex relative right-15 ">
          <div className="">
            <Image
              src={PhoneMockup}
              alt="Phone Mockup"
              width={650}
              className="rounded-xl "
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function HomeClient() {
  const params = useSearchParams();
  const role = params.get("role");
  const [roleType, setRoleType] = useState<"designer" | "hiring" | null>(null);
  const [roleSet, setRoleSet] = useState<boolean>(false);

  if (roleSet && role === "hiring") return <HomeClientHireing />;
  if (roleSet && role === "designer") return <HomeClientDesigner />;

  return (
    <main className="min-h-screen bg-primary flex flex-col items-center justify-center text-white relative">
      <div className="flex flex-col items-center justify-center flex-grow text-center mt-16 gap-20">
        {/* Dual options */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-4xl gap-10 mb-10">
          {/* Left side */}
          {/* <div
            onClick={() => setRoleType("designer")}
            className={`text-center sm:text-right sm:mr-8 mb-4 sm:mb-0 ${
              roleType === "designer"
                ? "bg-secondary text-primary rounded-xl transition p-2"
                : ""
            }`}
          > */}
          <div>
            <p className="text-2xl lg:text-[38px] font-normal whitespace-nowrap">
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

          {/* Right side */}
          <div>
            {/* <div
            onClick={() => {
              setRoleType("hiring");
            }}
            className={`text-center sm:text-left sm:ml-8 cursor-pointer p-2 rounded-xl transition 
              ${roleType === "hiring" ? "bg-secondary text-primary" : ""}`}
          >*/}
            <p className="text-2xl lg:text-[38px] font-normal whitespace-nowrap">
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

        {/* Enter Button */}
        <div className="flex flex-col items-center justify-center ">
          {/* <Link
          href={roleType ? `?role=${roleType}` : "#"}
          onClick={() => setRoleSet(true)}
          className={`px-8 py-3 rounded-full  font-semibold transition
            ${
              roleType
                ? "bg-secondary text-primary hover:opacity-90"
                : "bg-gray-500 cursor-not-allowed"
            }
          `}
        >
          Enter
        </Link> */}
          <Link
            href="?role=designer"
            onClick={() => setRoleSet(true)}
            className="px-8 py-3 rounded-full bg-secondary text-primary font-semibold hover:opacity-90 transition  pl-[30px] -ml-[8px]    
    lg:pl-8 lg:mr-6"
          >
            Enter
          </Link>
        </div>
      </div>
    </main>
  );
}
