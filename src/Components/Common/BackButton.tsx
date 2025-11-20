import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";

export function BackButton({ url, title }: { url: string; title: string }) {
  return (
    <div className="h-full px-4 sm:px-6 lg:px-8 pt-2 pb-0 mx-auto ">
      <div className="mb-3 mt-3 hidden sm:block ">
        <Link
          href={url}
          className="flex items-center text-secondary hover:text-gray-200 cursor-pointer transition-colors  pb-1"
        >
          <Play
            fill="#FFFFFF"
            className={`transition-transform duration-300 rotate-180 mr-2  w-4 h-4
              sm:w-6 sm:h-6
              md:w-6 md:h-6 `}
          />
          <span className="text-sm lg:text-[18px]">{title}</span>
        </Link>
      </div>
    </div>
  );
}

export function ForWordButton({ url, title }: { url: string; title: string }) {
  return (
    <div className="h-full px-4 sm:px-6 lg:px-8 pt-2 pb-0 ">
      <div className="mb-3 mt-3 ">
        <Link
          href={url}
          className="flex flex-row-reverse items-center text-secondary hover:text-gray-200 cursor-pointer transition-colors  pb-1"
        >
          <Play
            fill="#FFFFFF"
            className={`transition-transform duration-300 rotate-0 ml-2  w-4 h-4
              sm:w-6 sm:h-6
              md:w-6 md:h-6 `}
          />
          <span className="text-sm lg:text-[18px] ">{title}</span>
        </Link>
      </div>
    </div>
  );
}
