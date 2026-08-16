import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Render serves the exported site from /out. The existing Sites build keeps
  // using Vinext unless this explicit export flag is set.
  output: process.env.RENDER_STATIC_EXPORT === "1" ? "export" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
