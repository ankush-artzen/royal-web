"use client";
import React, { ReactNode } from "react";

export default function Card({
  isOpen,
  title,
  onClose,
  children,
}: {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div className="w-full max-w-2xl bg-gray-200 rounded-4xl shadow-lg overflow-hidden mb-5">
        <div className="bg-secondary rounded-[2rem] shadow-lg p-8 relative">
          {/* Header Section */}
          <div className="absolute top-10 left-8 right-8 border-t-2 border-black"></div>
          <div className="flex justify-between items-start mt-8 mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-black ml-4">{title}</h2>
            <button
              onClick={onClose}
              className="text-black cursor-pointer text-4xl font-semibold leading-none hover:text-gray-700 transition-colors mr-3"
            >
              x
            </button>
          </div>

          <div className="border-t-2 border-black mb-8"></div>
          <div className="border-t-2 border-black mb-8"></div>
          {children}
          {/* Bottom border line */}
          <div className="border-t-2 border-black mt-8"></div>
        </div>
      </div>
    </div>
  );
}
