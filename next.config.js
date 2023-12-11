/** @type {import('next').NextConfig} */
const nextConfig = {};

// Support for Markdown style documentation using Nextra
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = { ...nextConfig, ...withNextra() };
