import { ArrowRight, LoaderCircle } from "lucide-react";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

function RoundButton({
  onClick,
  loading = false,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      aria-label="Submit"
      className={`bg-secondary text-primary rounded-full w-14 h-14 flex items-center justify-center 
        hover:bg-white transition self-center sm:self-auto flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
       <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      ) : (
        <ArrowRight className="h-8 w-8" />
      )}
    </button>
  );
}

export default RoundButton;
