import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Empty turbopack config silences the "webpack config present but no
    // turbopack config" error in Next.js 16. PWA is disabled in dev anyway.
    turbopack: {},
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "**.giphy.com",
            },
        ],
    },
};

export default withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
})(nextConfig);
