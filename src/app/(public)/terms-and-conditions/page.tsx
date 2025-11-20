export const metadata = {
  title: "Royal – Terms of Service",
  description:
    "Read the Terms of Service for Royal, a platform that automates royalty payments between designers and Shopify store owners.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-primary py-4 px-3">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl text-center font-extrabold text-gray-900 mb-2">
          Royal – Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-6">Last Updated: October 2025</p>

        <section className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>
            Welcome to <strong>Royal</strong>, a web-based platform that
            automates royalty payments between designers and business owners who
            sell their products through Shopify stores.
          </p>

          <p>
            <strong>Royal</strong> (“the Service”) is operated by{" "}
            <strong>Terminal Merchandise LLC</strong>, a New York Limited
            Liability Company (“Company,” “we,” “us,” or “our”).
          </p>

          <p>
            By accessing or using Royal, you agree to be bound by these Terms of
            Service (“Terms”). If you do not agree, you may not use the Service.
          </p>

          {/* 1. Overview of the Service */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              1. Overview of the Service
            </h2>
            <p>
              Royal enables Shopify store owners (“Merchants”) and designers
              (“Designers”) to manage percentage-based royalties for products
              sold through Shopify. The platform:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Connects to your Shopify store via the Royal Shopify App</li>
              <li>Calculates royalties automatically based on sales data</li>
              <li>Bills royalties monthly to the connected Shopify account</li>
              <li>
                Enables Designers to withdraw royalties through Stripe Connect
                (U.S.)
              </li>
              <li>
                Retains a <strong>3%</strong> platform fee on payouts to cover
                processing and platform maintenance
              </li>
            </ul>
            <p className="mt-2">
              All payments are processed by Stripe, Inc. and subject to Stripe’s
              Terms of Service.
            </p>
          </div>

          {/* 2. Eligibility */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              2. Eligibility
            </h2>
            <p>To use Royal, you must:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Be at least 18 years old</li>
              <li>Have a valid Shopify store or Royal account</li>
              <li>
                Maintain a U.S.-based Stripe account that supports payouts in
                USD
              </li>
            </ul>
            <p className="mt-2">
              By using Royal, you represent that you have the authority to enter
              into this agreement on behalf of yourself or your organization.
            </p>
          </div>

          {/* 3. Account Registration */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              3. Account Registration
            </h2>
            <p>
              You must create a Royal account and provide accurate information.
              Designers are assigned a Royal User ID, which Merchants enter in
              their Shopify product Royalty Settings to connect the proper
              Designer account. You are responsible for all activity under your
              login credentials.
            </p>
          </div>

          {/* 4. Connecting Shopify and Stripe */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              4. Connecting Shopify and Stripe
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Merchants install the Royal Shopify App.</li>
              <li>
                Both Merchants and Designers connect verified U.S. Stripe
                accounts.
              </li>
              <li>
                By connecting Stripe, you authorize Royal (via Terminal
                Merchandise LLC) to facilitate transactions on your behalf.
              </li>
            </ul>
            <p className="mt-2">
              Royal never stores credit-card or banking credentials.
            </p>
          </div>

          {/* 5. Royalties and Payments */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              5. Royalties and Payments
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Royalties are calculated as a percentage of each Shopify sale.
              </li>
              <li>
                Merchants are automatically billed monthly for total royalties
                owed.
              </li>
              <li>
                Designers may withdraw funds once billed royalties are available
                (after 3 business days).
              </li>
              <li>
                Withdrawals are processed through Stripe Connect within 48
                hours.
              </li>
              <li>
                Royal retains a <strong>3%</strong> platform fee, shown when
                payouts are processed.
              </li>
            </ul>
          </div>

          {/* 6. Platform Fees and Charges */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              6. Platform Fees and Charges
            </h2>
            <p>
              Royal does not charge subscription fees. All fees are deducted
              from payouts before transfer and are non-refundable unless
              required by law.
            </p>
          </div>

          {/* 7. Data and Privacy */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              7. Data and Privacy
            </h2>
            <p>
              Your use of Royal is governed by our Privacy Policy. We collect
              only data required to operate the Service (Shopify sales data,
              royalty configurations, Stripe IDs, etc.) and never sell personal
              information.
            </p>
          </div>

          {/* 8. User Responsibilities */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              8. User Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide accurate royalty percentages and Royal User IDs.</li>
              <li>
                Understand that royalty agreements between Merchants and
                Designers are independent of Royal.
              </li>
              <li>Comply with Shopify and Stripe rules.</li>
              <li>Not misuse, copy, or reverse-engineer the Service.</li>
            </ul>
          </div>

          {/* 9. Role of Royal */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              9. Role of Royal
            </h2>
            <p>
              Royal acts solely as a facilitator of royalty calculations,
              billing, and payout processing. We are not a financial institution
              or escrow agent. All financial transactions occur through Stripe
              Connect.
            </p>
          </div>

          {/* 10. Intellectual Property */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              10. Intellectual Property
            </h2>
            <p>
              All software, content, and technology on Royal are owned by
              Terminal Merchandise LLC or its licensors. You receive a limited
              license to use the Service as intended.
            </p>
          </div>

          {/* 11. Termination */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              11. Termination
            </h2>
            <p>
              We may suspend or terminate your account for violation of these
              Terms or platform misuse. You may close your account anytime by
              emailing{" "}
              <a
                href="mailto:support@royalpay.me"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                support@royalpay.me
              </a>
              . Pending royalties will be processed per Stripe’s standard rules.
            </p>
          </div>

          {/* 12. Limitation of Liability */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              12. Limitation of Liability
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Royal and Terminal Merchandise LLC are not liable for indirect
                or consequential damages.
              </li>
              <li>
                Total liability will not exceed the fees paid to Royal in the
                past 12 months.
              </li>
              <li>
                We are not responsible for Shopify, Stripe, or user
                configuration errors.
              </li>
            </ul>
          </div>

          {/* 13. Indemnification */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              13. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Terminal Merchandise LLC
              and its affiliates from any claims arising from your use of the
              Service or breach of these Terms.
            </p>
          </div>

          {/* 14. Dispute Resolution */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              14. Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of the State of New York,
              USA. Any dispute shall be resolved by binding arbitration in New
              York County under the rules of the American Arbitration
              Association. You waive any right to a jury trial or class action.
            </p>
          </div>

          {/* 15. Changes to These Terms */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              15. Changes to These Terms
            </h2>
            <p>
              We may update these Terms periodically. Continued use after
              notification constitutes acceptance.
            </p>
          </div>

          {/* 16. Contact */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              16. Contact
            </h2>
            <p>
              Terminal Merchandise LLC
              <br />
              Attn: Legal Department
              <br />
              New York, NY, USA
              <br />
              📧{" "}
              <a
                href="mailto:support@royalpay.me"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                support@royalpay.me
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
