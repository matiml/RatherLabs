/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()
const nextConfig = {
  experimental: {
    appDir: true,
  },
  
}

module.exports = nextConfig
