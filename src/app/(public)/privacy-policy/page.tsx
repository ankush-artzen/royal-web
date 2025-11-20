export default async function PrivacyPolicyPage() {
  const COMPANY_NAME =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Terminal Merchandise LLC";
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Royal";
  const SUPPORT_EMAIL =
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@royalpay.me";
  const COMPANY_ADDRESS =
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "New York, NY, USA";
  const LAST_UPDATED =
    process.env.NEXT_PUBLIC_LAST_UPDATED_DATE || "October 2025";

  return (
    <main className="min-h-screen bg-primary py-4 px-3">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl text-center font-extrabold text-gray-900 mb-2">
          Royal – Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 mb-4">
          Effective Date: {LAST_UPDATED}
        </p>

        <section className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            This Privacy Policy explains how <strong>{COMPANY_NAME}</strong>{" "}
            (“Company,” “we,” “our,” or “us”) collects and protects information
            through <strong>{APP_NAME}</strong> (“the Service”).
          </p>
          <p>
            By using <strong>{APP_NAME}</strong>, you consent to this Policy.
          </p>

          {/* --- 1. Who We Are --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              1. Who We Are
            </h2>
            <p>
              <strong>{APP_NAME}</strong> is operated by{" "}
              <strong>{COMPANY_NAME}</strong>, New York, USA.
            </p>
            <p>
              📧{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
            <p>
              We are the data controller for information collected through{" "}
              <strong>{APP_NAME}</strong>.
            </p>
          </div>

          {/* --- 2. Information We Collect --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Account Info:</strong> name, email, business name,
                Shopify store details, Royal User ID, and Stripe account
                identifier.
              </li>
              <li>
                <strong>Transaction Data:</strong> sales info from Shopify,
                royalty percentages, billing, and payout data from Stripe.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser, device, and
                access logs.
              </li>
              <li>
                <strong>Cookies:</strong> for sessions, analytics, and service
                improvement.
              </li>
            </ul>
          </div>

          {/* --- 3. Eligibility and Stripe Accounts --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              3. Eligibility and Stripe Accounts
            </h2>
            <p>Royal is available only to users with:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>A valid Shopify store, and</li>
              <li>A U.S.-based Stripe account that supports payouts in USD.</li>
            </ul>
            <p className="mt-2">
              Without a U.S. Stripe account, users cannot send or receive
              payments via <strong>{APP_NAME}</strong>.
            </p>
          </div>

          {/* --- 4. How We Use Data --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              4. How We Use Data
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Operate and maintain the Service</li>
              <li>Calculate and distribute royalties</li>
              <li>Facilitate billing and payouts via Stripe Connect (U.S.)</li>
              <li>Provide support and communications</li>
              <li>Prevent fraud and ensure legal compliance</li>
            </ul>
            <p className="mt-2">
              We do <strong>not sell</strong> personal data.
            </p>
          </div>

          {/* --- 5. How We Share Data --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              5. How We Share Data
            </h2>
            <p>We may share data with the following recipients:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Shopify, Inc.:</strong> Sync sales and product data.
              </li>
              <li>
                <strong>Stripe, Inc.:</strong> Process payments and payouts.
              </li>
              <li>
                <strong>Service Providers:</strong> Hosting, analytics, and
                email support.
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law.
              </li>
            </ul>
            <p className="mt-2">
              Payment data is handled exclusively by Stripe;{" "}
              <strong>{APP_NAME}</strong> never stores banking credentials.
            </p>
          </div>

          {/* --- 6. Legal Basis (EEA/UK) --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              6. Legal Basis (EEA/UK)
            </h2>
            <p>
              Processing bases include: performance of contract, legitimate
              interest, legal obligation, and consent (where applicable).
            </p>
            <p className="mt-2">
              Note: Royal supports only U.S. Stripe accounts; EEA/UK users may
              access limited functionality but cannot receive payouts.
            </p>
          </div>

          {/* --- 7. Retention & Security --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              7. Retention & Security
            </h2>
            <p>
              Data is retained only as long as necessary for service and
              compliance purposes. Security measures include HTTPS/TLS
              encryption and restricted access.
            </p>
          </div>

          {/* --- 8. Your Rights --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              8. Your Rights
            </h2>
            <p>
              You may request access, correction, deletion, restriction, or
              portability of your data, or withdraw consent, by contacting{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>

          {/* --- 9. Data Transfers --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              9. Data Transfers
            </h2>
            <p>
              All processing occurs in the United States through U.S. Stripe
              accounts. By using <strong>{APP_NAME}</strong>, you consent to
              these transfers.
            </p>
          </div>

          {/* --- 10. Children’s Privacy --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              10. Children’s Privacy
            </h2>
            <p>
              <strong>{APP_NAME}</strong> is not for individuals under 18. We do
              not knowingly collect children’s data.
            </p>
          </div>

          {/* --- 11. Changes to This Policy --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              11. Changes to This Policy
            </h2>
            <p>
              We may modify this Policy and will notify users of material
              changes. Continued use constitutes acceptance.
            </p>
          </div>

          {/* --- 12. Contact Us --- */}
          <div className="border-t border-gray-200 pt-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              12. Contact Us
            </h2>
            <p>
              <strong>{COMPANY_NAME}</strong>
              <br />
              Attn: Privacy Officer
              <br />
              {COMPANY_ADDRESS}
              <br />
              📧{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
