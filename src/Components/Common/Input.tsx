import React from "react";
import { InputProps } from "@/lib/type";

function Input({
  type = "email",
  value,
  onChange,
  isValid = false,
  onKeyPress,
  placeholder = "Email",
  customClass = ""
}: InputProps) {
  return (
    <div className={`flex items-center bg-secondary text-black rounded-3xl px-6 py-3 w-full sm:w-1/2 ${customClass} `}>
      <div
        className={`w-4 h-4  rounded-full mr-3 flex-shrink-0 ${
          isValid ? "bg-primary" : "border-[2px] border-black bg-transparent"
        }`}
      ></div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className="bg-transparent outline-none w-full lg:text-lg placeholder-black font-bold"
      />
    </div>
  );
}

export default Input;

