import React from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "critical";
  fullWidth?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "h-8 text-sm px-3",
  md: "h-12 text-lg px-4",
  lg: "h-16 text-xl px-6",
  xl: "h-20 text-2xl px-8",
};

const variantClasses = {
  primary: "bg-primary text-secondary hover:bg-blue-700",
  secondary: "bg-secondary text-black hover:bg-gray-400",
  critical: "bg-red-600 text-secondary hover:bg-red-700",
};

function Button({
  title,
  onClick,
  size = "md",
  variant = "primary",
  fullWidth = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-3 rounded-[20px]
        font-bold transition hover:brightness-95 active:translate-y-[1px]
        ${sizeClasses[size]} ${variantClasses[variant]} ${
        fullWidth ? "w-full" : "max-w-fit"
      } ${className}
      `}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          variant === "critical"
            ? "bg-red-200"
            : variant === "secondary"
            ? "bg-primary"
            : "bg-white"
        }`}
      />
      {title}
    </button>
  );
}

export default Button;

