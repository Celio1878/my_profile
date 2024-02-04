const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
  },
};

module.exports = nextConfig;
