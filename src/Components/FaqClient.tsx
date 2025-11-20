"use client";
import { faqs } from "@/utils/constant";
import { Play } from "lucide-react";
import { useState } from "react";

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-primary px-4 py-10 sm:px-6 lg:px-12 text-secondary">
      <div className="w-full">
        <h2 className="mb-6 text-xl lg:text-2xl text-center sm:text-start font-semibold uppercase tracking-wide text-[#DEDECF]">
          FAQ
        </h2>
        <div className="border-b border-[#DEDECF] mb-2"></div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#DEDECF] pb-9">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center gap-3 text-left text-2xl lg:text-4xl font-semibold text-[#DEDECF] focus:outline-none"
              >
                <span className="text-lg w-6 flex-shrink-0">
                  <Play
                    fill="#FFFFFF"
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </span>
                <span>{faq.question}</span>
              </button>

              {openIndex === index && (
                <p className="mt-3 pl-9 text-xl lg:text-2xl leading-relaxed text-[#DEDECF]">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
