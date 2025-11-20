"use client";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
    //   <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
    //   <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
    //     Page Not Found
    //   </h2>
    //   <p className="text-gray-500 mb-6">
    //     Oops! The page you’re looking for doesn’t exist or has been moved.
    //   </p>
    //   <Link
    //     href="/"
    //     className="px-6 py-3 bg-primary text-secondary rounded-lg shadow hover:bg-primary/90 transition"
    //   >
    //     Go Back Home
    //   </Link>
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-center px-4">
      <h1 className="text-7xl font-extrabold  text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-secondary  mb-2">
        Page Not Found
      </h2>
      <p className=" text-secondary  mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-primary font-bold bg-secondary rounded-lg shadow hover:bg-secondary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
