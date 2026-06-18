/* Gabriel Xavier — https://www.linkedin.com/in/gabrielxp/ */
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const config = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    output: "export",
    // Dev usa `.next` (ignorado pelo git) para não corromper a pasta de deploy.
    // Build/export gera em `dist` (versionada e publicada no servidor).
    distDir: isDev ? ".next" : "dist",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  };
};

export default config;
