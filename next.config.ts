import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Pin the workspace root: a stray lockfile in the user folder
     otherwise makes Turbopack infer the wrong root. */
  turbopack: {
    root: process.cwd(),
  },
  images: {
    /* The placeholder covers/avatar are local SVGs served through
       next/image. The CSP sandbox below keeps SVG rendering safe.
       When you replace them with PNG/JPG screenshots, this config
       can stay as is. */
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
