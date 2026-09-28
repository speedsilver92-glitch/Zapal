import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 only serves optimized images for explicitly allowed quality
    // values. The site uses quality={85} and quality={90} on hero/background
    // images, so they must be declared here or the optimizer returns HTTP 400
    // and the images fail to render.
    qualities: [75, 80, 85, 90],
  },
};

export default nextConfig;
