import React from "react";
import { CustomToastProps, ToastStylesMap } from "@/lib/type";

const toastStyles: ToastStylesMap = {
  success: {
    bg: "var(--success, var(--secondary))",
    text: "#000000",
  },
  error: {
    bg: "var(--error, #FF2E2E)",
    text: "#fff",
  },
  info: {
    bg: "var(--info, var(--primary))",
    text: "#fff",
  },
};

const baseStyles = {
  padding: "16px 24px",
  borderRadius: "12px",
  fontWeight: 500,
  fontSize: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  minWidth: "285px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

export default function CustomToast({ message, type = "info" }: CustomToastProps) {
  const { bg, text } = toastStyles[type];

  return (
    <div
      style={{
        ...baseStyles,
        background: bg,
        color: text,
      }}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
