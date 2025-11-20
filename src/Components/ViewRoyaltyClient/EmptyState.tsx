import { EmptyStateProps } from "@/lib/type";

export const EmptyState = ({
    title = "No data found",
    message = "Your information will appear here",
  }: EmptyStateProps) => (
    <div className="text-center py-12 text-gray-400">
      <div className="text-lg mb-2">{title}</div>
      <div className="text-sm">{message}</div>
    </div>
  );