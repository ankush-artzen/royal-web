import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
];

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: isDev
          ? securityHeaders
          : [
              ...securityHeaders,
              {
                key: "Content-Security-Policy",
                // value:
                //   "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; frame-ancestors 'none';",
                value:
                  "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://js.stripe.com; frame-ancestors 'none';",
              },
            ],
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    // serverComponentsExternalPackages: ["pino"],
  },
};

export default nextConfig;
