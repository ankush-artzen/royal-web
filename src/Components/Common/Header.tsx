import React from "react";

interface HeaderProps {
  title: string;
  className?: string;
}

function Header({ title, className = "" }: HeaderProps) {
  return (
    <div
      className={`bg-secondary rounded-3xl p-6 text-start ${className}`}
    >
      <h1 className="text-6xl overflow-auto md:overflow-visible sm:text-[114px] sm:text-5xl font-bold text-gray-900">
        {title}
      </h1>
    </div>
  );
}

export default Header;
