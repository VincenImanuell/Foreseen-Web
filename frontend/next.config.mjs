/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // wagmi/viem pull in optional deps used only for fancy logging; silence the
  // bundler warning so `next build` stays clean.
  webpack: (config) => {
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding",
      // wagmi v3's connectors barrel pulls in baseAccount/metaMask connectors
      // we don't use (only `injected` is configured) — their optional deps
      // aren't installed, silence the bundler warning the same way.
      "@base-org/account",
      "@metamask/connect-evm",
      "accounts",
    );
    return config;
  },
};

export default nextConfig;
