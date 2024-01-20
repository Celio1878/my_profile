const nextConfig = {
  images: {
    domains: ["https://avatars.githubusercontent.com/u/40040827?&v=4"],
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
