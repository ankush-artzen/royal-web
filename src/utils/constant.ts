interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "How do I connect my Royal App account to a webstore product",
    answer:
      "Use the Royal Shopify Plugin and install it to the back end of the webstore. Once the plugin is installed, it will create a field in the back end of every product page where you can enter your Royal ID. Add your Royal ID to any product you want to collect royalties on and it will automatically begin syncing the product information into your Royal App account.",
  },
  {
    question: "How do I connect my Royal App account to a webstore product",
    answer:
      "Use the Royal Shopify Plugin and install it to the back end of the webstore. Once the plugin is installed, it will create a field in the back end of every product page where you can enter your Royal ID. Add your Royal ID to any product you want to collect royalties on and it will automatically begin syncing the product information into your Royal App account.",
  },
  {
    question: "How do I connect my Royal App account to a webstore product",
    answer:
      "Use the Royal Shopify Plugin and install it to the back end of the webstore. Once the plugin is installed, it will create a field in the back end of every product page where you can enter your Royal ID. Add your Royal ID to any product you want to collect royalties on and it will automatically begin syncing the product information into your Royal App account.",
  },
  {
    question: "How do I connect my Royal App account to a webstore product",
    answer:
      "Use the Royal Shopify Plugin and install it to the back end of the webstore. Once the plugin is installed, it will create a field in the back end of every product page where you can enter your Royal ID. Add your Royal ID to any product you want to collect royalties on and it will automatically begin syncing the product information into your Royal App account.",
  },
  {
    question: "How do I connect my Royal App account to a webstore product",
    answer:
      "Use the Royal Shopify Plugin and install it to the back end of the webstore. Once the plugin is installed, it will create a field in the back end of every product page where you can enter your Royal ID. Add your Royal ID to any product you want to collect royalties on and it will automatically begin syncing the product information into your Royal App account.",
  },
];

  export const MIN_WITHDRAWAL = 50;
  export const calculatePlatformFee = (value: string) => {
    const num = parseFloat(value || "0");
    return isNaN(num) ? 0 : parseFloat((num * 0.03).toFixed(2));
  };