"use client";

import { useSearchParams } from "next/navigation";

function HowItWorksHireing() {
  return (
    <main className="flex-grow px-6 sm:px-12 lg:px-24 py-12 space-y-10">
      <h1 className="text-lg sm:text-xl font-normal mb-6">
        How does Royal work?
      </h1>

      {/* Step 1 */}
      <div className="border-t border-white pt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-transparent border border-white rounded-full  mr-3 flex-shrink-0"></div>

          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-3">
            Step 1
          </h2>
        </div>
        <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold mb-2">
          Offer Royal as a payment option to your designer.
        </h3>
        <p className="text-sm sm:text-base lg:text-2xl font-normal leading-relaxed max-w-3xl">
          When working with a designer, give them the choice to earn a royalty
          instead of charging a full upfront fee. With Royal, you can save on
          upfront costs and build a fair, long-term partnership ó paying your
          designer a share of each sale their design helps generate.
        </p>
      </div>

      {/* Step 2 */}
      <div className="border-t border-white pt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-transparent border border-white rounded-full  mr-3 flex-shrink-0 "></div>

          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-3">
            Step 2
          </h2>
        </div>
        <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold mb-2">
          Install the Royal Shopify plugin on your store.
        </h3>
        <p className="text-sm sm:text-base lg:text-2xl font-normal leading-relaxed max-w-3xl">
          Once youíve agreed on the royalty percentage, install the Royal
          Shopify plugin. In your Shopify admin, you can set each designerís
          royalty rate and link their unique Royal ID to the products theyíve
          created. Royal automatically tracks sales and calculates payouts, so
          you never have to handle spreadsheets or manual reporting again.
        </p>
      </div>

      {/* Step 3 */}
      <div className="border-t border-white pt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-transparent border border-white rounded-full  mr-3 flex-shrink-0 "></div>

          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-3">
            Step 3
          </h2>
        </div>
        <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold mb-2">
          Launch your merch and let Royal handle the rest.
        </h3>
        <p className="text-sm sm:text-base lg:text-2xl font-normal leading-relaxed max-w-3xl">
          After your products go live, Royal keeps your sales and royalty data
          in sync. Designers can see what theyíve earned, and you never have to
          handle payouts. Sell merch, grow your brand, and keep every partner
          paid fairly ó automatically.
        </p>
      </div>
    </main>
  );
}

function HowItWorksDesigner() {
  return (
    <main className="flex-grow px-6 sm:px-12 lg:px-24 py-12 space-y-10">
      <h1 className="text-lg sm:text-xl font-normal mb-6">
        How does Royal work?
      </h1>

      {/* Step 1 */}
      <div className="border-t border-white pt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-transparent border border-white rounded-full  mr-3 flex-shrink-0"></div>

          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-3">
            Step 1
          </h2>
        </div>
        <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold mb-2">
          Include Royal as a payment option when pricing your projects.
        </h3>
        <p className="text-sm sm:text-base lg:text-2xl font-normal leading-relaxed max-w-3xl">
          When pricing out projects for your clients, give them the option to
          pay a discounted rate or zero up-front in exchange for a percent of
          revenue.
        </p>
      </div>

      {/* Step 2 */}
      <div className="border-t border-white pt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-transparent border border-white rounded-full  mr-3 flex-shrink-0 "></div>

          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-3">
            Step 2
          </h2>
        </div>
        <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold mb-2">
          Have your client install the Royal Shopify plugin on their Shopify
          store.
        </h3>
        <p className="text-sm sm:text-base lg:text-2xl font-normal leading-relaxed max-w-3xl">
          The Royal Shopify plugin allows them to set your royalty percentage in
          the back end of their Shopify. Once installed, the client can add your
          unique ID number to each product that you designed. This will
          automatically sync sales information from their Shopify into your
          Royal App account. Using Royal, they can also track and pay out
          different royalty percentages to different designers or producers on
          different products all in one place.
        </p>
      </div>

      {/* Step 3 */}
      <div className="border-t border-white pt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-transparent border border-white rounded-full  mr-3 flex-shrink-0 "></div>

          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-3">
            Step 3
          </h2>
        </div>
        <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold mb-2">
          Begin tracking your royalties and collecting your payouts!
        </h3>
        <p className="text-sm sm:text-base lg:text-2xl font-normal leading-relaxed max-w-3xl">
          Once the product is launched in your client’s Shopify, you will begin
          receiving sales information to your Royal app account. Check back here
          to keep track of your royalties, view reports and info, and cash out
          on royalty payments whenever you like.
        </p>
      </div>
    </main>
  );
}

export default function HowItWorksPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // designer / hiring

  return (
    <div className="min-h-screen bg-primary text-secondary flex flex-col">
      {role === "hiring" ? <HowItWorksHireing /> : <HowItWorksDesigner />}
    </div>
  );
}
