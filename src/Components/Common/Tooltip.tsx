import React, { useState } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  content: string;
  children: React.ReactElement;
  size?: "sm" | "md" | "lg"; // size options
  color?: "black" | "white" | "primary" | "secondary"; // color options
};

export const Tooltip = ({
  content,
  children,
  size = "sm",
  color = "black",
}: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
    setShowTooltip(true);
  };

  // Map size to Tailwind classes
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  // Map color to Tailwind classes (using your Tailwind theme)
  const colorClasses = {
    black: "bg-black text-secondary border-black",
    white: "bg-white text-black border-white",
    primary: "bg-primary text-secondary border-primary",
    secondary: "bg-secondary text-black border-secondary",
  };

  const tooltip =
    showTooltip && coords
      ? createPortal(
          <div
            style={{ top: coords.top + 8, left: coords.left }}
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mb-2 rounded-md whitespace-nowrap z-100 ${sizeClasses[size]} ${colorClasses[color]}`}
          >
            {content}
            <div
              className={`absolute bottom-full left-1/2 transform -translate-x-1/2 
            border-4 border-transparent ${
              color === "black" ? "border-b-black" : ""
            }
            ${color === "white" ? "border-b-white" : ""}
            ${color === "primary" ? "border-b-primary" : ""}
            ${color === "secondary" ? "border-b-secondary" : ""}`}
            ></div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
      {tooltip}
    </>
  );
};
