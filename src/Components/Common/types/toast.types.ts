export type ToastType = "success" | "error" | "info";

export interface CustomToastProps {
  message: string;
  type?: ToastType;
}
