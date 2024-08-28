/** @type {import('next').NextConfig} */

let nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "***",
        },
      ],
    }
  };
  
  if (process?.env?.NEXT_PUBLIC_ENVIRONMENT != "local") {
    nextConfig = {
      output: "export",
      trailingSlash: true,
      basePath: process?.env?.NEXT_PUBLIC_BASE_URL,
      images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "***",
          },
        ],
      },
    };
  }
  
  export default nextConfig;
  