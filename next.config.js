// next.config.js (ou next.config.mjs)
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Sécurité de base
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

          // Isolation contre attaques cross-origin
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },

          // Permissions navigateur (lockdown)
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },

          // CSP conservatrice qui ne casse pas Next (ajuste si nécessaire pour polices/analytics)
          { key: "Content-Security-Policy", value:
            [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join("; ")
          }
        ],
      },
    ];
  },

  async redirects() {
    return [
      // www -> apex (au cas où tu utilises www)
      { source: "/:path*", has: [{ type: "host", value: "www.timeproofs.io" }], destination: "https://timeproofs.io/:path*", permanent: true },
      // .com -> .io (activer quand tu achèteras le .com)
      { source: "/:path*", has: [{ type: "host", value: "timeproofs.com" }], destination: "https://timeproofs.io/:path*", permanent: true },
    ];
  },
};

module.exports = nextConfig;
