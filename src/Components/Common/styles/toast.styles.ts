import { ToastType } from "../types/toast.types";

export const toastStyles: Record<ToastType, { bg: string; text: string }> = {
  success: {
    bg: "var(--success, var(--primary))",
    text: "#fff",
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

export const baseStyles = {
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
