import { InfoRowProps } from "@/lib/type";

export const InfoRow = ({ label, value }: InfoRowProps) => (
    <div className="border-b border-white pb-2 lg:text-[31px] flex gap-2 pl-3">
      <span>{label}</span>
      <span className="font-bold pb-2">{value}</span>
    </div>
  );