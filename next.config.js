const { withSentryConfig } = require("@sentry/nextjs");
const nextPwa = require('next-pwa')

const SentryWebpackPluginOptions = {
  silent: true,
  org: "luis-martinez-suarez",
  project: "weather-wardrobe-wizard",
}

const SentryOptions = {
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
}

const withPWA = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  transpilePackages: ["@stripe/firestore-stripe-payments"],
};

if (process.env.NODE_ENV === 'production') {
  module.exports = withSentryConfig(
    withPWA(nextConfig),
    SentryWebpackPluginOptions,
    SentryOptions
  );
} else {
  module.exports = withPWA(nextConfig);
}