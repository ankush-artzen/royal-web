import FAQClient from "@/Components/FaqClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal App",
  description: "Royal App Frequently Asked Questions",
};


export default function FAQPage() {
  return <FAQClient />;
}
