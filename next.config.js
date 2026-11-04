/** @type {import('next').NextConfig} */
// Empty in local dev and on Vercel, so those stay at /. The VPS deploy script
// sets NEXT_PUBLIC_BASE_PATH=/Bharat before `next build`.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  basePath,
  async headers() {
    return [
      {
        // Videos and poster images never change once deployed (filenames are
        // stable), so let browsers/CDN cache them for a full year and skip
        // re-validation on repeat visits.
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
