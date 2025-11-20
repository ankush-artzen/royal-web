export default function ContactUs() {
  return (
    <div className="min-h-screen bg-primary text-secondary">
      <div className="w-full px-6 py-12 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-light mb-4">Contact Us</h1>
          <div className="w-full h-px bg-white"></div>
        </div>

        {/* Main Heading */}
        <div className="mb-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-4">
            Need help with using the Royal App or with your account? Reach out! We&apos;re here to help.
          </h2>
          <div className="w-full h-px bg-white"></div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Questions about the App */}
          <div className="border-b border-white pb-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Questions about the App
            </h3>
            <a
              href="mailto:Info@RoyalApp.com"
              className="text-lg md:text-xl text-secondary hover:text-blue-200 transition-colors duration-200"
            >
              Info@RoyalApp.com
            </a>
          </div>

          {/* Help with your Account */}
          <div className="border-b border-white pb-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Help with your Account
            </h3>
            <a
              href="mailto:Help@RoyalApp.com"
              className="text-lg md:text-xl text-secondary hover:text-blue-200 transition-colors duration-200"
            >
              Help@RoyalApp.com
            </a>
          </div>

          {/* Press and PR */}
          <div className="pb-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Press and PR
            </h3>
            <a
              href="mailto:Press@RoyalApp.com"
              className="text-lg md:text-xl text-secondary hover:text-blue-200 transition-colors duration-200"
            >
              Press@RoyalApp.com
            </a>
          </div>
          <div className="w-full h-px bg-white"></div>

        </div>
      </div>
    </div>
  );
}